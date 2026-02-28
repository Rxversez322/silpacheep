"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) { setError("กรุณากรอกข้อมูลให้ครบ"); return }
    if (password.length < 6) { setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"); return }
    if (password !== confirm) { setError("รหัสผ่านไม่ตรงกัน"); return }
    setError("")
    setLoading(true)
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    setSuccess(true)
  }

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const pwColors = ["", "#e53e3e", "#d97706", "#2D6A4F"]
  const pwLabels = ["", "อ่อนมาก", "พอใช้", "แข็งแรง"]

  if (success) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Noto+Sans+Thai:wght@300;400;500&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #F7F9F8; font-family: 'Noto Sans Thai', sans-serif; }
          .success-page {
            min-height: 100vh; background: #F7F9F8;
            display: flex; align-items: center; justify-content: center;
          }
          .success-box {
            text-align: center; padding: 60px 40px; max-width: 400px;
            animation: popIn 0.65s cubic-bezier(0.23,1,0.32,1) both;
          }
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.88) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          .success-ring {
            width: 92px; height: 92px; border-radius: 50%;
            border: 2px solid #52B788;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 28px; font-size: 2.2rem;
            background: rgba(82,183,136,0.08);
            animation: ringPulse 1.8s ease infinite;
          }
          @keyframes ringPulse {
            0%,100% { box-shadow: 0 0 0 0 rgba(82,183,136,0.3); }
            50%      { box-shadow: 0 0 0 14px rgba(82,183,136,0); }
          }
          .success-title {
            font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700;
            color: #1B3A2D; margin-bottom: 12px;
          }
          .success-sub {
            font-size: 0.85rem; color: #40614F; opacity: 0.7;
            line-height: 1.8; margin-bottom: 32px;
          }
          .success-link {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 13px 32px;
            background: #1B3A2D; color: #74A98A;
            text-decoration: none; font-size: 0.78rem;
            letter-spacing: 0.25em; text-transform: uppercase;
            border-radius: 8px; transition: background 0.3s, color 0.3s;
            box-shadow: 0 4px 16px rgba(27,58,45,0.2);
          }
          .success-link:hover { background: #2D6A4F; color: #fff; }
        `}</style>
        <div className="success-page">
          <div className="success-box">
            <div className="success-ring">✉️</div>
            <h1 className="success-title">สมัครสมาชิกสำเร็จ!</h1>
            <p className="success-sub">กรุณาตรวจสอบอีเมลของคุณ<br />เพื่อยืนยันการสมัครสมาชิก</p>
            <Link href="/login" className="success-link">เข้าสู่ระบบ →</Link>
          </div>
        </div>
      </>
    )
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

        .left::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.1);
          top: -120px; left: -160px;
          pointer-events: none;
        }
        .left::after {
          content: '';
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.07);
          bottom: 80px; right: -100px;
          pointer-events: none;
        }

        /* extra inner circle */
        .left-inner-circle {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.08);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .left-logo { position: relative; z-index: 1; }
        .left-logo-name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600;
          color: var(--green-pale);
          letter-spacing: 0.04em;
          text-decoration: none;
          margin-bottom: 3px;
        }
        .left-logo-sub {
          display: block; font-size: 0.6rem; font-weight: 400;
          letter-spacing: 0.45em; text-transform: uppercase;
          color: rgba(82,183,136,0.4);
        }

        .left-hero {
          position: relative; z-index: 1;
          flex: 1;
          display: flex; flex-direction: column; justify-content: center;
          padding: 60px 0 40px;
        }

        .left-eyebrow {
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.4em; text-transform: uppercase;
          color: var(--green-soft); margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .left-eyebrow::before {
          content: ''; width: 28px; height: 1px;
          background: var(--green-soft); display: block;
        }

        .left-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 3.5vw, 3.6rem);
          font-weight: 600; color: #fff;
          line-height: 1.2; letter-spacing: -0.01em;
          margin-bottom: 20px;
        }
        .left-title em { font-style: italic; color: var(--green-soft); }

        .left-desc {
          font-size: 0.85rem; font-weight: 300;
          color: rgba(255,255,255,0.4);
          line-height: 1.8; max-width: 300px;
        }

        /* steps on left */
        .left-steps {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 14px;
        }
        .step-item {
          display: flex; align-items: center; gap: 14px;
        }
        .step-num {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(82,183,136,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 600;
          color: var(--green-soft); flex-shrink: 0;
        }
        .step-text {
          font-size: 0.78rem; font-weight: 300;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
        }

        /* ── RIGHT PANEL ── */
        .right {
          background: var(--white);
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          position: relative;
          overflow-y: auto;
        }

        .right::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D6A4F' fill-opacity='0.025'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .form-wrap {
          width: 100%; max-width: 400px;
          position: relative; z-index: 1;
          animation: fadeUp 0.65s cubic-bezier(0.23,1,0.32,1) both;
          padding: 20px 0;
        }

        .form-header { margin-bottom: 32px; }
        .form-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--green-mist); border: 1px solid var(--green-pale);
          color: var(--green-mid); font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 20px; margin-bottom: 16px;
        }
        .form-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green-soft); }
        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: var(--green-deep); line-height: 1.2; margin-bottom: 6px;
        }
        .form-subtitle {
          font-size: 0.82rem; color: var(--ink-mid);
          font-weight: 300; opacity: 0.65;
        }

        /* Fields */
        .fields { display: flex; flex-direction: column; gap: 16px; margin-bottom: 8px; }

        .field { display: flex; flex-direction: column; gap: 6px; }

        .field-label {
          font-size: 0.67rem; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--ink-mid);
        }

        .field-wrap { position: relative; }

        .field-input {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid var(--green-pale);
          border-radius: 8px;
          font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.9rem; color: var(--ink);
          background: var(--off-white); outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .field-input::placeholder { color: rgba(64,97,79,0.3); }
        .field-input:focus {
          border-color: var(--green-mid);
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(45,106,79,0.1);
        }
        .field-input.pw { padding-right: 70px; }
        .field-input.match-ok  { border-color: var(--green-soft); }
        .field-input.match-err { border-color: #ef4444; }

        .pw-toggle {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          font-size: 0.68rem; font-weight: 600;
          font-family: 'Noto Sans Thai', sans-serif;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink-light); padding: 4px 6px; border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .pw-toggle:hover { color: var(--green-mid); background: var(--green-mist); }

        /* strength bar */
        .strength-bar { display: flex; gap: 4px; margin-top: 7px; }
        .strength-seg {
          flex: 1; height: 3px; border-radius: 2px;
          background: var(--green-pale); transition: background 0.35s;
        }
        .strength-label {
          font-size: 0.67rem; margin-top: 4px; font-weight: 500;
        }

        /* match hint */
        .match-hint { font-size: 0.7rem; margin-top: 3px; font-weight: 500; }

        /* Error */
        .error-box {
          display: flex; align-items: center; gap: 9px;
          background: #FEF2F2; border: 1px solid #FECACA;
          border-left: 3px solid var(--danger); border-radius: 8px;
          padding: 11px 14px; font-size: 0.8rem; color: var(--danger);
          animation: shake 0.35s ease; margin-bottom: 4px;
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          60%      { transform: translateX(5px); }
        }

        /* Submit */
        .btn-submit {
          width: 100%; padding: 15px 20px;
          background: var(--green-deep); color: #fff; border: none;
          border-radius: 8px;
          font-family: 'Noto Sans Thai', sans-serif;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em;
          cursor: pointer; position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 20px rgba(27,58,45,0.25);
          margin-top: 10px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .btn-submit::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--green-mid), var(--green-soft));
          opacity: 0; transition: opacity 0.35s;
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
          border-top-color: white; border-radius: 50%;
          animation: spin 0.65s linear infinite;
          position: relative; z-index: 1;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 20px 0; font-size: 0.68rem;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(64,97,79,0.3);
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: var(--green-pale);
        }

        .login-row {
          text-align: center; font-size: 0.82rem;
          color: var(--ink-mid); opacity: 0.65;
        }
        .login-link {
          color: var(--green-mid); font-weight: 600;
          text-decoration: none; margin-left: 5px; transition: color 0.2s;
        }
        .login-link:hover { color: var(--green-deep); }

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
          <div className="left-inner-circle" />

          <div className="left-logo">
            <Link href="/" className="left-logo-name">ศูนย์ศิลปาชีพ</Link>
            <span className="left-logo-sub">Royal Handicraft Centre</span>
          </div>

          <div className="left-hero">
            <div className="left-eyebrow">เข้าร่วมกับเรา</div>
            <h2 className="left-title">
              เริ่มต้น<br />
              การเป็น<br />
              <em>สมาชิก</em>
            </h2>
            <p className="left-desc">
              สมัครสมาชิกเพื่อติดตามคำสั่งซื้อ
              รับสิทธิพิเศษ และบันทึกรายการโปรดของคุณ
            </p>
          </div>

          <div className="left-steps">
            <div className="step-item">
              <div className="step-num">1</div>
              <span className="step-text">กรอกข้อมูลส่วนตัว</span>
            </div>
            <div className="step-item">
              <div className="step-num">2</div>
              <span className="step-text">ยืนยันอีเมลของคุณ</span>
            </div>
            <div className="step-item">
              <div className="step-num">3</div>
              <span className="step-text">เริ่มช้อปปิ้งได้เลย</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="right">
          <div className="form-wrap">

            <div className="form-header">
              <div className="form-tag">
                <div className="form-tag-dot" />
                สร้างบัญชีใหม่
              </div>
              <h1 className="form-title">สมัครสมาชิก</h1>
              <p className="form-subtitle">กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีใหม่</p>
            </div>

            {error && (
              <div className="error-box">
                <span>⚠</span> {error}
              </div>
            )}

            <div className="fields">
              <div className="field">
                <label className="field-label">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="เช่น สมชาย ใจดี"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="field-label">อีเมล</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="field-label">รหัสผ่าน</label>
                <div className="field-wrap">
                  <input
                    type={showPw ? "text" : "password"}
                    className="field-input pw"
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                    {showPw ? "ซ่อน" : "แสดง"}
                  </button>
                </div>
                {password.length > 0 && (
                  <>
                    <div className="strength-bar">
                      {[1,2,3].map((i) => (
                        <div key={i} className="strength-seg"
                          style={{ background: i <= pwStrength ? pwColors[pwStrength] : undefined }} />
                      ))}
                    </div>
                    <span className="strength-label" style={{ color: pwColors[pwStrength] }}>
                      รหัสผ่าน: {pwLabels[pwStrength]}
                    </span>
                  </>
                )}
              </div>

              <div className="field">
                <label className="field-label">ยืนยันรหัสผ่าน</label>
                <div className="field-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className={`field-input pw ${confirm.length > 0 ? (confirm === password ? "match-ok" : "match-err") : ""}`}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  />
                  <button className="pw-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? "ซ่อน" : "แสดง"}
                  </button>
                </div>
                {confirm.length > 0 && (
                  <span className="match-hint" style={{ color: confirm === password ? "#2D6A4F" : "#ef4444" }}>
                    {confirm === password ? "✓ รหัสผ่านตรงกัน" : "✗ รหัสผ่านไม่ตรงกัน"}
                  </span>
                )}
              </div>
            </div>

            <button onClick={handleRegister} disabled={loading} className="btn-submit">
              {loading
                ? <><div className="spinner" /><span>กำลังสมัครสมาชิก...</span></>
                : <span>สมัครสมาชิก →</span>
              }
            </button>

            <div className="divider">หรือ</div>

            <p className="login-row">
              มีบัญชีอยู่แล้ว?
              <Link href="/login" className="login-link">เข้าสู่ระบบ</Link>
            </p>

          </div>
        </div>

      </div>
    </>
  )
}