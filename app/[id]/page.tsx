import { supabase } from "@/lib/supabase"
import AddToCartButton from "@/components/AddToCartButton"
import Link from "next/link"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const productId = Number(id)

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single()

  if (!product) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Sarabun:wght@300;400;500&display=swap');
          :root { --cream:#F7F9F8; --gold:#2D6A4F; --brown-dark:#1B3A2D; --brown-mid:#40614F; }
          * { box-sizing:border-box; margin:0; padding:0; }
          .not-found {
            min-height:100vh; background:var(--cream);
            display:flex; flex-direction:column;
            align-items:center; justify-content:center;
            font-family:'Sarabun',sans-serif; gap:16px;
            color:var(--brown-mid);
          }
          .not-found-icon { font-size:3.5rem; opacity:0.3; }
          .not-found-title { font-family:'Playfair Display',serif; font-size:1.8rem; color:var(--brown-dark); }
          .not-found-link {
            margin-top:8px; padding:10px 24px;
            border:1px solid var(--gold); color:var(--gold);
            text-decoration:none; font-size:0.8rem;
            letter-spacing:0.25em; text-transform:uppercase;
            border-radius:2px; transition:background 0.3s,color 0.3s;
          }
          .not-found-link:hover { background:var(--gold); color:#fff; }
        `}</style>
        <div className="not-found">
          <div className="not-found-icon">🪴</div>
          <h1 className="not-found-title">ไม่พบสินค้า</h1>
          <Link href="/" className="not-found-link">กลับหน้าหลัก</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Sarabun:wght@300;400;500;600&display=swap');

        :root {
          --cream: #F7F9F8;
          --gold: #2D6A4F;
          --gold-light: #52B788;
          --brown-dark: #1B3A2D;
          --brown-mid: #40614F;
          --parchment: #E8F0EB;
          --border: #74A98A;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          background-color: var(--cream);
          background-image:
            radial-gradient(ellipse at 10% 20%, rgba(45,106,79,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(27,58,45,0.07) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D6A4F' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          font-family: 'Sarabun', sans-serif;
          padding: 48px 40px 80px;
        }

        /* ── Back ── */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--brown-mid);
          text-decoration: none;
          margin-bottom: 44px;
          opacity: 0.7;
          transition: color 0.3s, gap 0.3s, opacity 0.3s;
        }
        .back-btn:hover { color: var(--gold); gap: 12px; opacity: 1; }
        .back-btn::before { content: '←'; font-size: 1rem; }

        /* ── Card ── */
        .card {
          max-width: 1100px;
          margin: 0 auto;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow: 0 4px 30px rgba(27,58,45,0.1), 0 1px 4px rgba(27,58,45,0.07);
          animation: fadeUp 0.75s cubic-bezier(0.23,1,0.32,1) both;
          position: relative;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1.5px solid transparent;
          border-radius: 4px;
          pointer-events: none;
          transition: border-color 0.5s;
          z-index: 5;
        }
        .card:hover::before { border-color: rgba(116,169,138,0.45); }

        @media (max-width: 768px) {
          .card { grid-template-columns: 1fr; }
        }

        /* ── Image side ── */
        .img-side {
          position: relative;
          overflow: hidden;
          min-height: 480px;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: sepia(5%) saturate(95%) brightness(0.97);
          transition: transform 0.9s cubic-bezier(0.23,1,0.32,1),
                      filter 0.6s ease;
        }

        .card:hover .product-img {
          transform: scale(1.04);
          filter: sepia(0%) saturate(100%) brightness(1);
        }

        /* category badge */
        .img-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(27,58,45,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(116,169,138,0.5);
          color: var(--border);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 2px;
          z-index: 2;
        }

        .img-side::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(27,58,45,0.35) 0%, transparent 40%);
          pointer-events: none;
        }

        /* ── Detail side ── */
        .detail-side {
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          border-left: 1px solid var(--parchment);
          position: relative;
        }

        .detail-side::before {
          content: '';
          position: absolute;
          top: 36px; left: 48px;
          width: 36px; height: 2px;
          background: var(--gold);
        }

        .detail-eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
          margin-top: 24px;
        }

        .product-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 900;
          color: var(--brown-dark);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }

        /* Price block */
        .price-block {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 28px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--parchment);
        }

        .price-num {
          font-family: 'Sarabun', sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--gold);
          line-height: 1;
        }

        .price-unit {
          font-size: 0.9rem;
          color: var(--brown-mid);
          font-weight: 400;
          opacity: 0.7;
        }

        /* Description */
        .description-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--border);
          margin-bottom: 10px;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.85;
          color: var(--brown-mid);
          font-weight: 300;
          margin-bottom: 36px;
          flex: 1;
        }

        /* Divider with diamond */
        .detail-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        .detail-divider::before,
        .detail-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--parchment);
        }
        .detail-divider-diamond {
          width: 6px; height: 6px;
          background: var(--border);
          transform: rotate(45deg);
          opacity: 0.6;
        }

        /* Trust badges */
        .trust-row {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--brown-mid);
          opacity: 0.6;
          letter-spacing: 0.05em;
        }

        .trust-icon { font-size: 0.9rem; }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="page">
        <Link href="/" className="back-btn">กลับหน้าหลัก</Link>

        <div className="card">
          {/* Image */}
          <div className="img-side">
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />
            {product.category && (
              <span className="img-badge">{product.category}</span>
            )}
          </div>

          {/* Detail */}
          <div className="detail-side">
            <span className="detail-eyebrow">งานหัตถกรรมไทย · Handcraft</span>

            <h1 className="product-name">{product.name}</h1>

            <div className="price-block">
              <span className="price-num">
                {Number(product.price).toLocaleString("th-TH")}
              </span>
              <span className="price-unit">บาท</span>
            </div>

            <p className="description-label">รายละเอียดสินค้า</p>
            <p className="description">{product.description}</p>

            <div className="detail-divider">
              <div className="detail-divider-diamond" />
            </div>

            <div className="trust-row">
              <span className="trust-item">
                <span className="trust-icon">🤝</span> งานฝีมือแท้
              </span>
              <span className="trust-item">
                <span className="trust-icon">📦</span> จัดส่งทั่วประเทศ
              </span>
              <span className="trust-item">
                <span className="trust-icon">✨</span> รับประกันคุณภาพ
              </span>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </>
  )
}