"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Navbar() {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(total)
    }
    updateCart()
    window.addEventListener("storage", updateCart)

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("storage", updateCart)
      window.removeEventListener("scroll", onScroll)
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Noto+Sans+Thai:wght@300;400;500&display=swap');

        :root {
          --ink:    #1a1c18;
          --moss:   #4a5940;
          --sage:   #7a8f6e;
          --stone:  #b5aa96;
          --clay:   #d0c8b4;
          --mist:   #e8e3d8;
          --white:  #faf9f6;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          font-family: 'Noto Sans Thai', sans-serif;
          background: var(--white);
          border-bottom: 1px solid var(--mist);
          transition: box-shadow 0.4s ease, background 0.4s ease;
        }

        .navbar.scrolled {
          background: rgba(250, 249, 246, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 24px rgba(26, 28, 24, 0.07);
        }

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  padding: 0 16px;   /* 👈 เปลี่ยนเป็น 16px */
  max-width: 1440px;
  margin: 0 auto;
}

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          line-height: 1;
          gap: 3px;
        }

        .nav-logo-th {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.04em;
        }

        .nav-logo-en {
          font-size: 0.55rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--stone);
        }

        /* ── Right ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Auth buttons ── */
        .nav-auth-link {
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 2px;
          transition: all 0.25s ease;
          font-family: 'Noto Sans Thai', sans-serif;
        }

        .btn-login {
          color: var(--moss);
          border: 1px solid transparent;
        }
        .btn-login:hover {
          color: var(--ink);
          background: var(--mist);
        }

        .btn-register {
          color: var(--white);
          background: var(--moss);
          border: 1px solid var(--moss);
        }
        .btn-register:hover {
          background: var(--ink);
          border-color: var(--ink);
        }

        /* ── Profile ── */
        .profile-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--clay);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--mist);
          color: var(--moss);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .user-avatar:hover {
          border-color: var(--sage);
          background: var(--white);
        }

        .btn-logout {
          background: none;
          border: 1px solid var(--clay);
          color: var(--stone);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 2px;
          font-family: 'Noto Sans Thai', sans-serif;
          transition: border-color 0.25s, color 0.25s;
        }
        .btn-logout:hover {
          border-color: var(--ink);
          color: var(--ink);
        }

        /* ── Divider ── */
        .nav-divider {
          width: 1px;
          height: 20px;
          background: var(--mist);
          margin: 0 4px;
        }

        /* ── Cart ── */
        .nav-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          width: 38px;
          height: 38px;
          border-radius: 2px;
          color: var(--moss);
          position: relative;
          border: 1px solid var(--mist);
          transition: border-color 0.25s, background 0.25s;
        }
        .nav-cart:hover {
          border-color: var(--clay);
          background: var(--mist);
        }

        .nav-cart-icon {
          font-size: 1.1rem;
          line-height: 1;
        }

        .nav-cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--moss);
          color: var(--white);
          font-size: 0.55rem;
          font-weight: 600;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: 'Noto Sans Thai', sans-serif;
        }

@media (max-width:768px){

  .navbar-inner{
    height:56px;
    padding:0 16px;
  }

  .nav-logo-en{
    display:none;
  }

  /* ซ่อนแค่ logout กับ divider */
  .btn-logout,
  .nav-divider{
    display:none;
  }

  /* ปรับขนาดปุ่ม login ให้เล็กลง */
  .nav-auth-link{
    font-size:0.65rem;
    padding:6px 10px;
  }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">

          <Link href="/" className="nav-logo">
            <span className="nav-logo-th">ศูนย์ศิลปาชีพ</span>
            <span className="nav-logo-en">Royal Handicraft Centre</span>
          </Link>

          <div className="nav-right">
            {!user ? (
              <>
                <Link href="/login"    className="nav-auth-link btn-login">เข้าสู่ระบบ</Link>
                <Link href="/register" className="nav-auth-link btn-register">สมัครสมาชิก</Link>
              </>
            ) : (
              <div className="profile-container">
                <Link href="/profile" className="user-avatar" title={user.email}>
                  {user.email?.charAt(0).toUpperCase()}
                </Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            )}

            <div className="nav-divider" />

            <Link href="/cart" className="nav-cart">
              <span className="nav-cart-icon">🧺</span>
              {cartCount > 0 && (
                <span className="nav-cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>

        </div>
      </nav>
    </>
  )
}