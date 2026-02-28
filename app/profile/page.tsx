"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
        return
      }
      setUser(session.user)

      // ดึงประวัติออเดอร์
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)
      if (data) setOrders(data)

      setLoading(false)
    }
    getProfile()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#F7F9F8", fontFamily: "sans-serif", color: "#40614F", fontSize: "0.9rem",
        gap: "10px"
      }}>
        <div style={{
          width: 18, height: 18, border: "2px solid #D8EDE4",
          borderTopColor: "#2D6A4F", borderRadius: "50%",
          animation: "spin 0.7s linear infinite"
        }} />
        กำลังโหลด...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const initial = user?.email?.charAt(0).toUpperCase()
  const fullName = user?.user_metadata?.full_name || "ไม่ได้ระบุชื่อ"
  const joinDate = new Date(user?.created_at).toLocaleDateString("th-TH", {
    year: "numeric", month: "long", day: "numeric"
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Sans+Thai:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --white:      #ffffff;
          --off-white:  #F7F9F8;
          --green-deep: #1B3A2D;
          --green-mid:  #2D6A4F;
          --green-soft: #52B788;
          --green-pale: #D8EDE4;
          --green-mist: #EEF5F1;
          --ink:        #1a1a1a;
          --ink-mid:    #40614F;
          --ink-light:  #74A98A;
          --border-c:   #E8F0EB;
        }

        body { background: var(--off-white); font-family: 'Noto Sans Thai', sans-serif; }

        .page {
          min-height: 100vh;
          background: var(--off-white);
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D6A4F' fill-opacity='0.025'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E");
          padding: 48px 20px 80px;
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
          animation: fadeUp 0.6s cubic-bezier(0.23,1,0.32,1) both;
        }

        @media (max-width: 720px) {
          .container { grid-template-columns: 1fr; }
        }

        /* ── SIDEBAR CARD ── */
        .sidebar {
          background: var(--white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(27,58,45,0.08);
          position: sticky;
          top: 24px;
        }

        .sidebar-top {
          background: var(--green-deep);
          padding: 40px 24px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* deco circles */
        .sidebar-top::before {
          content: '';
          position: absolute;
          width: 220px; height: 220px; border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.12);
          top: -80px; left: -60px; pointer-events: none;
        }
        .sidebar-top::after {
          content: '';
          position: absolute;
          width: 160px; height: 160px; border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.08);
          bottom: -40px; right: -40px; pointer-events: none;
        }

        .avatar {
          width: 88px; height: 88px; border-radius: 50%;
          background: rgba(82,183,136,0.15);
          border: 2.5px solid rgba(82,183,136,0.4);
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 700;
          color: var(--green-soft);
          position: relative; z-index: 1;
          overflow: hidden;
        }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }

        .sidebar-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 700;
          color: #fff; margin-bottom: 4px;
          position: relative; z-index: 1;
        }
        .sidebar-email {
          font-size: 0.72rem; color: rgba(255,255,255,0.4);
          font-weight: 300; letter-spacing: 0.04em;
          position: relative; z-index: 1;
          word-break: break-all;
        }

        .sidebar-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(82,183,136,0.15);
          border: 1px solid rgba(82,183,136,0.25);
          color: var(--green-soft);
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 20px;
          margin-top: 12px;
          position: relative; z-index: 1;
        }
        .badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--green-soft);
          animation: blink 2s ease infinite;
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .sidebar-body { padding: 24px; }

        .sidebar-stat-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-bottom: 24px;
        }
        .stat-box {
          background: var(--green-mist);
          border: 1px solid var(--green-pale);
          border-radius: 10px; padding: 14px 12px;
          text-align: center;
        }
.stat-num {
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--green-mid);
  line-height: 1;
  margin-bottom: 4px;
}
        .stat-label {
          font-size: 0.65rem; font-weight: 500;
          color: var(--ink-light); letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .sidebar-info { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .info-row { display: flex; align-items: flex-start; gap: 10px; }
        .info-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: var(--green-mist); border: 1px solid var(--green-pale);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; flex-shrink: 0; margin-top: 1px;
        }
        .info-col { display: flex; flex-direction: column; gap: 2px; }
        .info-label {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-light);
        }
        .info-val {
          font-size: 0.82rem; color: var(--ink-mid); font-weight: 400;
        }

        .btn-home {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px;
          background: var(--green-mist); border: 1.5px solid var(--green-pale);
          color: var(--green-mid); border-radius: 10px;
          font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          text-decoration: none; letter-spacing: 0.05em;
          transition: background 0.2s, border-color 0.2s;
          margin-bottom: 10px;
        }
        .btn-home:hover { background: var(--green-pale); border-color: var(--ink-light); }

        .btn-logout {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px;
          background: #FEF2F2; border: 1.5px solid #FECACA;
          color: #B91C1C; border-radius: 10px;
          font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.8rem; font-weight: 600; cursor: pointer;
          letter-spacing: 0.05em;
          transition: background 0.2s;
        }
        .btn-logout:hover { background: #FEE2E2; }

        /* ── MAIN CONTENT ── */
        .main { display: flex; flex-direction: column; gap: 20px; }

        .card {
          background: var(--white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(27,58,45,0.07);
        }

        .card-head {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-c);
          display: flex; align-items: center; justify-content: space-between;
        }
        .card-head-left { display: flex; align-items: center; gap: 10px; }
        .card-head-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: var(--green-mist); border: 1px solid var(--green-pale);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
        }
        .card-head-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--green-deep);
        }

        /* info grid */
        .info-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .info-cell {
          padding: 20px 24px;
          border-right: 1px solid var(--border-c);
          border-bottom: 1px solid var(--border-c);
        }
        .info-cell:nth-child(2n) { border-right: none; }
        .info-cell:nth-last-child(-n+2) { border-bottom: none; }
        .info-cell-label {
          font-size: 0.62rem; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--ink-light); margin-bottom: 5px;
        }
        .info-cell-val {
          font-size: 0.9rem; color: var(--green-deep); font-weight: 500;
        }
        .status-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: #ECFDF5; border: 1px solid #A7F3D0;
          color: #065F46; font-size: 0.72rem; font-weight: 600;
          padding: 3px 10px; border-radius: 20px;
        }

        /* order list */
        .order-list { padding: 0 24px 24px; }
        .order-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0; border-bottom: 1px solid var(--border-c);
          gap: 12px;
        }
        .order-item:last-child { border-bottom: none; }
        .order-left { display: flex; align-items: center; gap: 12px; }
        .order-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--green-mist); border: 1px solid var(--green-pale);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .order-id { font-size: 0.78rem; font-weight: 600; color: var(--green-deep); }
        .order-date { font-size: 0.68rem; color: var(--ink-light); margin-top: 2px; }
        .order-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--green-mid);
          white-space: nowrap;
        }

        .empty-orders {
          padding: 36px 24px; text-align: center;
          color: var(--ink-light); font-size: 0.82rem;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .empty-icon { font-size: 2rem; opacity: 0.4; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="page">
        <div className="container">

          {/* ── SIDEBAR ── */}
          <aside className="sidebar">
            <div className="sidebar-top">
              <div className="avatar">
                {user?.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="" />
                  : initial
                }
              </div>
              <div className="sidebar-name">{fullName}</div>
              <div className="sidebar-email">{user?.email}</div>
              <div className="sidebar-badge">
                <div className="badge-dot" /> สมาชิกยืนยันแล้ว
              </div>
            </div>

            <div className="sidebar-body">
              <div className="sidebar-stat-row">
                <div className="stat-box">
                  <div className="stat-num">{orders.length}</div>
                  <div className="stat-label">คำสั่งซื้อ</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num">
                    {orders.length > 0
                      ? "฿" + Math.round(orders.reduce((s, o) => s + Number(o.total_price || 0), 0) / 1000) + "K"
                      : "—"}
                  </div>
                  <div className="stat-label">ยอดรวม</div>
                </div>
              </div>

              <div className="sidebar-info">
                <div className="info-row">
                  <div className="info-icon">📅</div>
                  <div className="info-col">
                    <span className="info-label">สมัครเมื่อ</span>
                    <span className="info-val">{joinDate}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon">🛡️</div>
                  <div className="info-col">
                    <span className="info-label">ระดับสมาชิก</span>
                    <span className="info-val">สมาชิกทั่วไป</span>
                  </div>
                </div>
              </div>

              <Link href="/" className="btn-home">← กลับหน้าหลัก</Link>
              <button onClick={handleLogout} className="btn-logout">ออกจากระบบ</button>
            </div>
          </aside>

          {/* ── MAIN ── */}
          <div className="main">

            {/* ข้อมูลส่วนตัว */}
            <div className="card">
              <div className="card-head">
                <div className="card-head-left">
                  <div className="card-head-icon">👤</div>
                  <span className="card-head-title">ข้อมูลส่วนตัว</span>
                </div>
              </div>
              <div className="info-grid">
                <div className="info-cell">
                  <div className="info-cell-label">ชื่อ-นามสกุล</div>
                  <div className="info-cell-val">{fullName}</div>
                </div>
                <div className="info-cell">
                  <div className="info-cell-label">อีเมล</div>
                  <div className="info-cell-val" style={{ fontSize: "0.82rem", wordBreak: "break-all" }}>{user?.email}</div>
                </div>
                <div className="info-cell">
                  <div className="info-cell-label">สถานะบัญชี</div>
                  <div className="info-cell-val">
                    <span className="status-badge">✓ ยืนยันแล้ว</span>
                  </div>
                </div>
                <div className="info-cell">
                  <div className="info-cell-label">วันที่สมัคร</div>
                  <div className="info-cell-val">{joinDate}</div>
                </div>
              </div>
            </div>

            {/* ประวัติคำสั่งซื้อ */}
            <div className="card">
              <div className="card-head">
                <div className="card-head-left">
                  <div className="card-head-icon">📦</div>
                  <span className="card-head-title">คำสั่งซื้อล่าสุด</span>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="empty-orders">
                  <div className="empty-icon">🛒</div>
                  <span>ยังไม่มีคำสั่งซื้อ</span>
                  <Link href="/" style={{ color: "var(--green-mid)", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}>
                    เริ่มช้อปปิ้ง →
                  </Link>
                </div>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-left">
                        <div className="order-icon">🧾</div>
                        <div>
                          <div className="order-id">คำสั่งซื้อ #{String(order.id).padStart(4, "0")}</div>
                          <div className="order-date">
                            {new Date(order.created_at).toLocaleDateString("th-TH", {
                              year: "numeric", month: "short", day: "numeric"
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="order-price">
                        ฿{Number(order.total_price).toLocaleString("th-TH")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}