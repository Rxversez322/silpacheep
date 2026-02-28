"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
  }, [])

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const saveCart = (updated: any[]) => {
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("storage"))
  }

  const removeItem = (id: number) => {
    saveCart(cart.filter((item) => item.id !== id))
  }

  const changeQty = (id: number, delta: number) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter((item) => item.quantity > 0)
    saveCart(updated)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:      #f9f7f4;
          --white:   #ffffff;
          --ink:     #1c1c1c;
          --gray:    #888;
          --border:  #e5e5e5;
          --green:   #2d5a27;
          --green-h: #3d7a35;
          --red:     #c0392b;
          --red-bg:  #fdf0ef;
        }

        body {
          background: var(--bg);
          font-family: 'Noto Sans Thai', sans-serif;
          color: var(--ink);
        }

        /* ── BREADCRUMB ── */
        .breadcrumb {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 32px 0;
          font-size: 0.78rem;
          color: var(--gray);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumb a { color: var(--gray); text-decoration: none; }
        .breadcrumb a:hover { color: var(--green); }
        .bc-sep { color: #ccc; }
        .bc-cur { color: var(--ink); font-weight: 500; }

        /* ── PAGE HEADER ── */
        .page-header {
          max-width: 1100px;
          margin: 0 auto;
          padding: 24px 32px 24px;
          border-bottom: 1px solid var(--border);
        }
        .page-title { font-size: 1.3rem; font-weight: 600; }

        /* ── LAYOUT ── */
        .layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 32px 80px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .layout { grid-template-columns: 1fr; }
          .layout { padding: 20px 16px 60px; }
          .breadcrumb, .page-header { padding-left: 16px; padding-right: 16px; }
        }

        /* ── ITEM LIST ── */
        .item-list { display: flex; flex-direction: column; gap: 12px; }

        .cart-item {
          background: var(--white);
          border: 1px solid var(--border);
          display: flex;
          align-items: stretch;
          transition: box-shadow 0.2s, transform 0.2s;
          animation: fadeUp 0.5s ease both;
        }
        .cart-item:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }

        .cart-item:nth-child(1) { animation-delay: 0.04s; }
        .cart-item:nth-child(2) { animation-delay: 0.1s; }
        .cart-item:nth-child(3) { animation-delay: 0.16s; }
        .cart-item:nth-child(4) { animation-delay: 0.22s; }

        /* Green left accent */
        .cart-item::before {
          content: '';
          width: 3px;
          background: var(--green);
          flex-shrink: 0;
        }

        .item-img {
          width: 100px;
          flex-shrink: 0;
          object-fit: cover;
          display: block;
        }

        .item-body {
          flex: 1;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
        }

        .item-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.4;
        }

        .item-unit-price {
          font-size: 0.78rem;
          color: var(--gray);
        }

        .qty-control {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border);
          overflow: hidden;
          width: fit-content;
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: var(--bg);
          cursor: pointer;
          font-size: 1rem;
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s, color 0.18s;
          flex-shrink: 0;
        }
        .qty-btn.plus:hover  { background: var(--green); color: white; }
        .qty-btn.minus:hover { background: var(--red);   color: white; }

        .qty-num {
          min-width: 36px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
          border-left: 1px solid var(--border);
          border-right: 1px solid var(--border);
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .item-subtotal {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--green);
        }

        .btn-remove {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 18px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray);
          font-size: 0.9rem;
          transition: color 0.2s, background 0.2s;
        }
        .btn-remove:hover { color: var(--red); background: var(--red-bg); }

        /* ── SUMMARY ── */
        .summary {
          background: var(--white);
          border: 1px solid var(--border);
          position: sticky;
          top: 24px;
          animation: fadeUp 0.5s ease 0.15s both;
        }

        .summary-head {
          background: var(--green);
          padding: 16px 22px;
          font-size: 0.88rem;
          font-weight: 600;
          color: white;
          letter-spacing: 0.05em;
        }

        .summary-body { padding: 20px 22px; }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.83rem;
          color: var(--gray);
          gap: 10px;
        }
        .summary-row:last-of-type { border-bottom: none; }
        .summary-row-val { font-weight: 500; color: var(--ink); white-space: nowrap; }

        .summary-total {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 2px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 20px;
        }
        .summary-total-label { font-size: 0.95rem; font-weight: 600; color: var(--ink); }
        .summary-total-price { font-size: 1.5rem; font-weight: 600; color: var(--green); }
        .summary-total-unit  { font-size: 0.78rem; color: var(--gray); margin-left: 3px; }

        .btn-checkout {
          display: block;
          width: 100%;
          padding: 14px;
          background: var(--green);
          color: white;
          text-align: center;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Noto Sans Thai', sans-serif;
          letter-spacing: 0.08em;
          transition: background 0.2s;
        }
        .btn-checkout:hover { background: var(--green-h); }

        .secure-note {
          margin-top: 12px;
          text-align: center;
          font-size: 0.68rem;
          color: var(--gray);
          letter-spacing: 0.05em;
        }

        /* ── EMPTY ── */
        .empty {
          text-align: center;
          padding: 80px 20px;
          animation: fadeUp 0.6s ease both;
          max-width: 400px;
          margin: 0 auto;
        }
        .empty-icon  { font-size: 3rem; margin-bottom: 16px; opacity: 0.35; }
        .empty-title { font-size: 1.2rem; font-weight: 600; color: var(--ink); margin-bottom: 8px; }
        .empty-sub   { font-size: 0.88rem; color: var(--gray); margin-bottom: 28px; line-height: 1.7; }

        .btn-shop {
          display: inline-block;
          padding: 12px 28px;
          background: var(--green);
          color: white;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background 0.2s;
        }
        .btn-shop:hover { background: var(--green-h); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span className="bc-sep">/</span>
        <span className="bc-cur">ตะกร้าสินค้า</span>
      </nav>

      <div className="page-header">
        <h1 className="page-title">ตะกร้าสินค้า {cart.length > 0 && `(${cart.length} รายการ)`}</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🧺</div>
          <h2 className="empty-title">ตะกร้ายังว่างอยู่</h2>
          <p className="empty-sub">เลือกสินค้าหัตถกรรมที่คุณชื่นชอบแล้วใส่ตะกร้าได้เลยครับ</p>
          <Link href="/category/all" className="btn-shop">เลือกซื้อสินค้า →</Link>
        </div>
      ) : (
        <div className="layout">

          {/* Items */}
          <div className="item-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.image && (
                  <img src={item.image} alt={item.name} className="item-img" />
                )}
                <div className="item-body">
                  <h2 className="item-name">{item.name}</h2>
                  <span className="item-unit-price">
                    ฿{Number(item.price).toLocaleString("th-TH")} / ชิ้น
                  </span>
                  <div className="qty-control">
                    <button className="qty-btn minus" onClick={() => changeQty(item.id, -1)}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn plus"  onClick={() => changeQty(item.id, +1)}>+</button>
                  </div>
                  <span className="item-subtotal">
                    รวม ฿{Number(item.price * item.quantity).toLocaleString("th-TH")}
                  </span>
                </div>
                <button onClick={() => removeItem(item.id)} className="btn-remove" aria-label="ลบ">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="summary">
            <div className="summary-head">สรุปคำสั่งซื้อ</div>
            <div className="summary-body">
              {cart.map((item) => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="summary-row-val">
                    ฿{Number(item.price * item.quantity).toLocaleString("th-TH")}
                  </span>
                </div>
              ))}

              <div className="summary-total">
                <span className="summary-total-label">ยอดรวม</span>
                <span>
                  <span className="summary-total-price">
                    ฿{Number(totalPrice).toLocaleString("th-TH")}
                  </span>
                  <span className="summary-total-unit">บาท</span>
                </span>
              </div>

              <Link href="/checkout" className="btn-checkout">ชำระเงิน →</Link>
              <p className="secure-note">🔒 ชำระเงินปลอดภัย · ศูนย์ศิลปาชีพ</p>
            </div>
          </aside>

        </div>
      )}
    </>
  )
}