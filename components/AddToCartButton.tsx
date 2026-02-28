"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToCartButton({ product }: any) {
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const [ripple, setRipple] = useState(false)

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existing = cart.find((item: any) => item.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("storage"))

    // Ripple + success state
    setRipple(true)
    setTimeout(() => setRipple(false), 600)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)

    router.refresh()
  }

  return (
    <>
      <style>{`
        .cart-btn-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .cart-btn {
          position: relative;
          width: 100%;
          padding: 20px 32px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          overflow: hidden;
          font-family: 'Sarabun', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: transform 0.25s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.35s ease;

          /* default: dark brown */
          background: linear-gradient(135deg, #3E1C0A 0%, #5C2E10 100%);
          color: #D4A96A;
          box-shadow: 0 6px 24px rgba(62,28,10,0.28), 0 2px 6px rgba(62,28,10,0.15);
        }

        /* gold shimmer layer */
        .cart-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #C8860A 0%, #E8B84B 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        /* success green layer */
        .cart-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2D6A4F 0%, #40916C 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .cart-btn:hover:not(.is-added) {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(62,28,10,0.22), 0 4px 12px rgba(200,134,10,0.2);
        }
        .cart-btn:hover:not(.is-added)::before { opacity: 1; }
        .cart-btn:hover:not(.is-added) .btn-text { color: #3E1C0A; }
        .cart-btn:hover:not(.is-added) .btn-icon { filter: none; }

        .cart-btn:active { transform: translateY(0) scale(0.98); }

        /* success state */
        .cart-btn.is-added { cursor: default; transform: translateY(-2px); }
        .cart-btn.is-added::after { opacity: 1; }
        .cart-btn.is-added .btn-text { color: #fff; letter-spacing: 0.28em; }

        /* ripple */
        .cart-btn .ripple-ring {
          position: absolute;
          inset: 0;
          border-radius: 3px;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transform: scale(0.85);
          transition: none;
        }
        .cart-btn.is-ripple .ripple-ring {
          animation: rippleAnim 0.55s ease forwards;
        }

        @keyframes rippleAnim {
          0%   { opacity: 1; transform: scale(0.85); }
          100% { opacity: 0; transform: scale(1.05); }
        }

        /* inner content */
        .btn-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .btn-icon {
          font-size: 1.1rem;
          line-height: 1;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .cart-btn:hover:not(.is-added) .btn-icon {
          transform: rotate(-12deg) scale(1.2);
        }

        .btn-text {
          color: #D4A96A;
          transition: color 0.35s, letter-spacing 0.35s;
        }

        /* ── Hint text ── */
        .cart-hint {
          text-align: center;
          font-family: 'Sarabun', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: #6B3A1F;
          opacity: 0.45;
        }
      `}</style>

      <div className="cart-btn-wrap">
        <button
          onClick={addToCart}
          disabled={added}
          className={`cart-btn${added ? " is-added" : ""}${ripple ? " is-ripple" : ""}`}
        >
          <div className="ripple-ring" />
          <div className="btn-inner">
            <span className="btn-icon">
              {added ? "✓" : "🧺"}
            </span>
            <span className="btn-text">
              {added ? "เพิ่มลงตะกร้าแล้ว" : "เพิ่มลงตะกร้า"}
            </span>
          </div>
        </button>

        <p className="cart-hint">🔒 ชำระเงินปลอดภัย · จัดส่งทั่วประเทศ</p>
      </div>
    </>
  )
}
