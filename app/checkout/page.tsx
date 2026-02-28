"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()

  const [cart, setCart] = useState<any[]>([])
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const init = async () => {
      // ✅ เช็ค session ก่อน ถ้าไม่ login ให้ redirect ไปหน้า login
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login?redirect=/checkout")
        return
      }

      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      if (storedCart.length === 0) {
        router.push("/cart")
        return
      }

      setCart(storedCart)
      setAuthChecked(true)
    }
    init()
  }, [router])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (!name || !address || !phone) return
    try {
      setLoading(true)

const { data: { session } } = await supabase.auth.getSession()

if (!session) {
  router.push("/login?redirect=/checkout")
  return
}

const user = session.user

      const { data: order, error } = await supabase
        .from("orders")
        .insert([{ user_id: user.id,customer_name: name, address, phone, total_price: totalPrice }])
        .select().single()

      if (error || !order) { setLoading(false); return }

      const items = cart.map((item) => ({
        order_id: order.id, product_id: item.id,
        quantity: item.quantity, price: item.price,
      }))
      const { error: itemError } = await supabase.from("order_items").insert(items)
      if (itemError) { setLoading(false); return }

      localStorage.removeItem("cart")
      window.dispatchEvent(new Event("storage"))
      setSuccess(true)
      setTimeout(() => router.push("/"), 3000)
    } catch { setLoading(false) }
  }

  const filled = name && address && phone

  /* ── กำลังเช็ค auth ── */
  if (!authChecked && !success) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#f9f7f4", fontFamily: "sans-serif",
        color: "#888", fontSize: "0.9rem"
      }}>
        กำลังตรวจสอบ...
      </div>
    )
  }

  /* ── Success ── */
  if (success) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #f9f7f4; font-family: 'Noto Sans Thai', sans-serif; }
          .success-wrap {
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            background: #f9f7f4;
          }
          .success-box { text-align: center; animation: popIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
          .success-circle {
            width: 88px; height: 88px; border-radius: 50%;
            background: #2d5a27;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 28px; font-size: 2.2rem;
            animation: pulse 2s ease infinite;
          }
          .success-title { font-size: 1.5rem; font-weight: 600; color: #1c1c1c; margin-bottom: 8px; }
          .success-sub   { font-size: 0.85rem; color: #888; }
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.85) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes pulse {
            0%,100% { box-shadow: 0 0 0 0 rgba(45,90,39,0.3); }
            50%      { box-shadow: 0 0 0 16px rgba(45,90,39,0); }
          }
        `}</style>
        <div className="success-wrap">
          <div className="success-box">
            <div className="success-circle">✓</div>
            <h1 className="success-title">สั่งซื้อสำเร็จแล้ว!</h1>
            <p className="success-sub">กำลังพากลับหน้าหลัก...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #f9f7f4; --white: #ffffff; --ink: #1c1c1c; --gray: #888;
          --border: #e5e5e5; --green: #2d5a27; --green-h: #3d7a35; --muted: #f4f2ef;
        }
        body { background: var(--bg); font-family: 'Noto Sans Thai', sans-serif; color: var(--ink); }
        .steps { max-width: 1060px; margin: 0 auto; padding: 28px 32px 0; display: flex; align-items: center; }
        .step { display: flex; align-items: center; gap: 10px; font-size: 0.78rem; color: var(--gray); }
        .step.done   { color: var(--green); }
        .step.active { color: var(--ink); font-weight: 600; }
        .step-num {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; flex-shrink: 0; background: var(--white);
        }
        .step.done   .step-num { background: var(--green); border-color: var(--green); color: white; }
        .step.active .step-num { border-color: var(--ink); background: var(--ink); color: white; }
        .step-line { flex: 1; height: 1px; background: var(--border); margin: 0 12px; }
        .step-line.done { background: var(--green); }
        .page-header { max-width: 1060px; margin: 0 auto; padding: 24px 32px; border-bottom: 1px solid var(--border); }
        .page-title   { font-size: 1.3rem; font-weight: 600; }
        .page-subtitle { font-size: 0.8rem; color: var(--gray); margin-top: 4px; }
        .layout {
          max-width: 1060px; margin: 0 auto; padding: 28px 32px 80px;
          display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start;
        }
        @media (max-width: 860px) {
          .layout { grid-template-columns: 1fr; }
          .layout, .page-header, .steps { padding-left: 16px; padding-right: 16px; }
        }
        .form-card { background: var(--white); border: 1px solid var(--border); animation: fadeUp 0.5s ease both; }
        .form-card-head { padding: 18px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
        .form-card-icon { width: 32px; height: 32px; background: var(--green); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }
        .form-card-title { font-size: 0.92rem; font-weight: 600; }
        .form-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 0.72rem; font-weight: 600; color: var(--ink); text-transform: uppercase; letter-spacing: 0.08em; }
        .field-input, .field-textarea {
          width: 100%; padding: 12px 14px; border: 1px solid var(--border);
          background: var(--muted); font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.92rem; color: var(--ink); outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s; resize: none;
        }
        .field-input::placeholder, .field-textarea::placeholder { color: #bbb; }
        .field-input:focus, .field-textarea:focus { border-color: var(--green); background: var(--white); box-shadow: 0 0 0 3px rgba(45,90,39,0.08); }
        .field-textarea { min-height: 100px; line-height: 1.7; }
        .form-hint { font-size: 0.72rem; color: var(--gray); display: flex; align-items: center; gap: 6px; }
        .summary { background: var(--white); border: 1px solid var(--border); position: sticky; top: 24px; animation: fadeUp 0.5s ease 0.1s both; }
        .summary-head { background: var(--green); padding: 16px 22px; color: white; font-size: 0.88rem; font-weight: 600; display: flex; align-items: center; justify-content: space-between; }
        .summary-count { font-size: 0.7rem; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 20px; }
        .summary-body { padding: 0 22px 22px; }
        .order-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); gap: 12px; font-size: 0.85rem; }
        .order-row:last-of-type { border-bottom: none; }
        .order-row-left { flex: 1; }
        .order-row-name { color: var(--ink); font-weight: 400; line-height: 1.4; }
        .order-row-qty  { font-size: 0.72rem; color: var(--gray); margin-top: 3px; }
        .order-row-price { font-weight: 600; color: var(--ink); white-space: nowrap; }
        .order-total { margin: 4px 0 20px; padding: 16px 0 0; border-top: 2px solid var(--ink); display: flex; justify-content: space-between; align-items: baseline; }
        .order-total-label { font-size: 0.92rem; font-weight: 600; }
        .order-total-price { font-size: 1.5rem; font-weight: 600; color: var(--green); }
        .order-total-unit  { font-size: 0.75rem; color: var(--gray); margin-left: 3px; }
        .btn-confirm {
          width: 100%; padding: 15px; background: var(--green); color: white; border: none;
          font-family: 'Noto Sans Thai', sans-serif; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; letter-spacing: 0.05em;
          transition: background 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .btn-confirm:hover:not(:disabled) { background: var(--green-h); transform: translateY(-1px); }
        .btn-confirm:active:not(:disabled) { transform: translateY(0); }
        .btn-confirm:disabled { opacity: 0.45; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .secure-note { margin-top: 12px; text-align: center; font-size: 0.68rem; color: var(--gray); }
        .breadcrumb { max-width: 1060px; margin: 0 auto; padding: 20px 32px 0; font-size: 0.75rem; color: var(--gray); display: flex; align-items: center; gap: 8px; }
        .breadcrumb a { color: var(--gray); text-decoration: none; }
        .breadcrumb a:hover { color: var(--green); }
        .bc-sep { color: #ccc; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <nav className="breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span className="bc-sep">/</span>
        <Link href="/cart">ตะกร้าสินค้า</Link>
        <span className="bc-sep">/</span>
        <span style={{ color: "var(--ink)", fontWeight: 500 }}>ชำระเงิน</span>
      </nav>

      <div className="steps">
        <div className="step done">
          <span className="step-num">✓</span>
          <span>ตะกร้า</span>
        </div>
        <div className="step-line done" />
        <div className="step active">
          <span className="step-num">2</span>
          <span>ข้อมูลจัดส่ง</span>
        </div>
        <div className="step-line" />
        <div className="step">
          <span className="step-num">3</span>
          <span>ยืนยัน</span>
        </div>
      </div>

      <div className="page-header">
        <h1 className="page-title">ยืนยันการสั่งซื้อ</h1>
        <p className="page-subtitle">กรอกข้อมูลจัดส่งให้ครบถ้วนแล้วกดยืนยัน</p>
      </div>

      <div className="layout">
        <div className="form-card">
          <div className="form-card-head">
            <div className="form-card-icon">📦</div>
            <span className="form-card-title">ข้อมูลการจัดส่ง</span>
          </div>
          <div className="form-body">
            <div className="field">
              <label className="field-label">ชื่อ-นามสกุล</label>
              <input type="text" className="field-input" placeholder="เช่น สมชาย ใจดี"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">ที่อยู่จัดส่ง</label>
              <textarea className="field-textarea" placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">เบอร์โทรศัพท์</label>
              <input type="tel" className="field-input" placeholder="0xx-xxx-xxxx"
                value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            {!filled && (
              <p className="form-hint"><span>ℹ️</span> กรุณากรอกข้อมูลให้ครบทุกช่อง</p>
            )}
          </div>
        </div>

        <aside className="summary">
          <div className="summary-head">
            <span>สรุปรายการ</span>
            <span className="summary-count">{cart.length} รายการ</span>
          </div>
          <div className="summary-body">
            {cart.map((item) => (
              <div key={item.id} className="order-row">
                <div className="order-row-left">
                  <div className="order-row-name">{item.name}</div>
                  <div className="order-row-qty">จำนวน {item.quantity} ชิ้น</div>
                </div>
                <span className="order-row-price">
                  ฿{Number(item.price * item.quantity).toLocaleString("th-TH")}
                </span>
              </div>
            ))}
            <div className="order-total">
              <span className="order-total-label">ยอดรวมทั้งสิ้น</span>
              <span>
                <span className="order-total-price">฿{Number(totalPrice).toLocaleString("th-TH")}</span>
                <span className="order-total-unit">บาท</span>
              </span>
            </div>
            <button onClick={handleCheckout} disabled={loading || !filled} className="btn-confirm">
              {loading ? (<><div className="spinner" /> กำลังดำเนินการ...</>) : (<>✓ ยืนยันการสั่งซื้อ</>)}
            </button>
            <p className="secure-note">🔒 ข้อมูลของคุณปลอดภัย · ศูนย์ศิลปาชีพ</p>
          </div>
        </aside>
      </div>
    </>
  )
}