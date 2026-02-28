"use client"

export const dynamic = "force-dynamic";
import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPw, setShowPw] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError("กรุณากรอกข้อมูลให้ครบ"); return }
    setError("")
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง"); return }
    const redirect = searchParams.get("redirect") || "/"
    router.push(redirect)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Sans+Thai:wght@300;400;500;600&display=swap');

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
          --danger:     #B91C1C;
        }

        html, body { height: 100%; }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Noto Sans Thai', sans-serif;
        }

        /* ── LEFT PANEL ── */
        .left {
          background: var(--green-deep);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 56px;
          position: relative;
          overflow: hidden;
        }

        /* decorative circles */
        .left::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.12);
          top: -120px; left: -160px;
          pointer-events: none;
        }
        .left::after {
          content: '';
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.08);
          bottom: 80px; right: -100px;
          pointer-events: none;
        }

        .left-logo {
          position: relative; z-index: 1;
        }
        .left-logo-name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--green-pale);
          letter-spacing: 0.04em;
          text-decoration: none;
          margin-bottom: 3px;
        }
        .left-logo-sub {
          display: block;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(82,183,136,0.45);
        }

        .left-hero {
          position: relative; z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 0 40px;
        }

        .left-eyebrow {
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--green-soft);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .left-eyebrow::before {
          content: '';
          width: 28px; height: 1px;
          background: var(--green-soft);
          display: block;
        }

        .left-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 4vw, 4rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }
        .left-title em {
          font-style: italic;
          color: var(--green-soft);
        }

        .left-desc {
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          max-width: 320px;
        }

        .left-badges {
          position: relative; z-index: 1;
          display: flex;
          gap: 24px;
        }
        .badge {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--green-soft);
          line-height: 1;
        }
        .badge-label {
          font-size: 0.65rem;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.08em;
        }
        .badge-divider {
          width: 1px;
          background: rgba(82,183,136,0.15);
          align-self: stretch;
        }

        /* ── RIGHT PANEL ── */
        .right {
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
        }

        /* subtle pattern bg */
        .right::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D6A4F' fill-opacity='0.025'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .form-wrap {
          width: 100%;
          max-width: 400px;
          position: relative; z-index: 1;
          animation: fadeUp 0.65s cubic-bezier(0.23,1,0.32,1) both;
        }

        .form-header {
          margin-bottom: 40px;
        }
        .form-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: var(--green-mist);
          border: 1px solid var(--green-pale);
          color: var(--green-mid);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .form-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--green-soft);
        }
        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--green-deep);
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .form-subtitle {
          font-size: 0.82rem;
          color: var(--ink-mid);
          font-weight: 300;
          opacity: 0.7;
        }

        /* Fields */
        .fields { display: flex; flex-direction: column; gap: 18px; margin-bottom: 8px; }

        .field { display: flex; flex-direction: column; gap: 7px; }

        .field-label {
          font-size: 0.67rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink-mid);
        }

        .field-wrap { position: relative; }

        .field-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid var(--green-pale);
          border-radius: 8px;
          font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.9rem;
          color: var(--ink);
          background: var(--off-white);
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .field-input::placeholder { color: rgba(64,97,79,0.3); }
        .field-input:focus {
          border-color: var(--green-mid);
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(45,106,79,0.1);
        }
        .field-input.pw { padding-right: 70px; }

        .pw-toggle {
          position: absolute;
          right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          font-size: 0.68rem; font-weight: 600;
          font-family: 'Noto Sans Thai', sans-serif;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink-light);
          padding: 4px 6px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .pw-toggle:hover { color: var(--green-mid); background: var(--green-mist); }

        /* Error */
        .error-box {
          display: flex; align-items: center; gap: 9px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-left: 3px solid var(--danger);
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 0.8rem;
          color: var(--danger);
          animation: shake 0.35s ease;
          margin-bottom: 4px;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          60%      { transform: translateX(5px); }
        }

        .forgot-row {
          text-align: right;
          margin-top: -6px;
          margin-bottom: 6px;
        }
        .forgot-link {
          font-size: 0.73rem;
          color: var(--ink-light);
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: var(--green-mid); }

        /* Submit button */
        .btn-submit {
          width: 100%;
          padding: 15px 20px;
          background: var(--green-deep);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 20px rgba(27,58,45,0.25);
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-submit::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--green-mid), var(--green-soft));
          opacity: 0;
          transition: opacity 0.35s;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(27,58,45,0.3);
        }
        .btn-submit:hover:not(:disabled)::after { opacity: 1; }
        .btn-submit:active:not(:disabled) { transform: scale(0.985); }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-submit span { position: relative; z-index: 1; }

        .spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
          position: relative; z-index: 1;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Divider */
        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0;
          font-size: 0.68rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(64,97,79,0.3);
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: var(--green-pale);
        }

        /* Register row */
        .register-row {
          text-align: center;
          font-size: 0.82rem;
          color: var(--ink-mid);
          opacity: 0.65;
        }
        .register-link {
          color: var(--green-mid);
          font-weight: 600;
          text-decoration: none;
          margin-left: 5px;
          transition: color 0.2s;
        }
        .register-link:hover { color: var(--green-deep); }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .page { grid-template-columns: 1fr; }
          .left { display: none; }
          .right { padding: 32px 24px; align-items: flex-start; padding-top: 60px; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="page">

        {/* ── LEFT ── */}
        <div className="left">
          <div className="left-logo">
            <Link href="/" className="left-logo-name">ศูนย์ศิลปาชีพ</Link>
            <span className="left-logo-sub">Royal Handicraft Centre</span>
          </div>

          <div className="left-hero">
            <div className="left-eyebrow">งานหัตถกรรมไทย</div>
            <h2 className="left-title">
              ของแท้<br />
              จากฝีมือ<br />
              <em>ช่างไทย</em>
            </h2>
            <p className="left-desc">
              เลือกชมและสั่งซื้องานหัตถกรรมคุณภาพสูง
              ผลิตโดยช่างฝีมือทั่วประเทศ
              พร้อมจัดส่งถึงบ้านคุณ
            </p>
          </div>

          <div className="left-badges">
            <div className="badge">
              <span className="badge-num">500+</span>
              <span className="badge-label">รายการสินค้า</span>
            </div>
            <div className="badge-divider" />
            <div className="badge">
              <span className="badge-num">100%</span>
              <span className="badge-label">งานฝีมือแท้</span>
            </div>
            <div className="badge-divider" />
            <div className="badge">
              <span className="badge-num">7 วัน</span>
              <span className="badge-label">คืนสินค้าได้</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="right">
          <div className="form-wrap">

            <div className="form-header">
              <div className="form-tag">
                <div className="form-tag-dot" />
                สมาชิก
              </div>
              <h1 className="form-title">เข้าสู่ระบบ</h1>
              <p className="form-subtitle">ยินดีต้อนรับกลับมา กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
            </div>

            {error && (
              <div className="error-box">
                <span>⚠</span> {error}
              </div>
            )}

            <div className="fields">
              <div className="field">
                <label className="field-label">อีเมล</label>
                <div className="field-wrap">
                  <input
                    type="email"
                    className="field-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label">รหัสผ่าน</label>
                <div className="field-wrap">
                  <input
                    type={showPw ? "text" : "password"}
                    className="field-input pw"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                    {showPw ? "ซ่อน" : "แสดง"}
                  </button>
                </div>
              </div>
            </div>

            <div className="forgot-row">
              <Link href="/forgot-password" className="forgot-link">ลืมรหัสผ่าน?</Link>
            </div>

            <button onClick={handleLogin} disabled={loading} className="btn-submit">
              {loading
                ? <><div className="spinner" /><span>กำลังเข้าสู่ระบบ...</span></>
                : <span>เข้าสู่ระบบ →</span>
              }
            </button>

            <div className="divider">หรือ</div>

            <p className="register-row">
              ยังไม่มีบัญชี?
              <Link href="/register" className="register-link">สมัครสมาชิก</Link>
            </p>

          </div>
        </div>

      </div>
    </>
  )
}