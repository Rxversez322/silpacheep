import Link from "next/link"

export default function Home() {
  const categories = [
    {
      name: "งานจักสานและเฟอร์นิเจอร์",
      image: "/images/san.png",
      subtitle: "Basketry & Furniture",
      num: "01",
    },
    {
      name: "งานปั้นและของตกแต่ง",
      image: "/images/pun.png",
      subtitle: "Pottery & Décor",
      num: "02",
    },
    {
      name: "งานวาดและศิลปะ",
      image: "/images/sin.png",
      subtitle: "Painting & Fine Arts",
      num: "03",
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:     #f9f7f4;
          --white:  #ffffff;
          --ink:    #1c1c1c;
          --gray:   #888;
          --border: #e5e5e5;
          --green:  #2d5a27;
          --green-light: #3d7a35;
        }

        body {
          background: var(--bg);
          font-family: 'Noto Sans Thai', sans-serif;
          color: var(--ink);
        }

        /* ── HERO BANNER ── */
        .hero {
          position: relative;
          background: var(--green);
          color: white;
          text-align: center;
          padding: 80px 24px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.3;
          z-index: 0;
        }

        .hero > *:not(.hero-bg) {
          position: relative;
          z-index: 1;
        }

        .hero-sub {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .hero-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          margin-bottom: 32px;
          line-height: 1.8;
        }

        .hero-btn {
          display: inline-block;
          background: white;
          color: var(--green);
          font-weight: 600;
          font-size: 0.85rem;
          padding: 14px 36px;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: background 0.2s, color 0.2s;
        }
        .hero-btn:hover {
          background: var(--bg);
        }

        /* ── SECTION ── */
        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 32px;
        }

        .section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink);
        }

        .section-link {
          font-size: 0.8rem;
          color: var(--green);
          text-decoration: none;
          font-weight: 400;
        }
        .section-link:hover { text-decoration: underline; }

        /* ── CATEGORY CARDS ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .cat-grid { grid-template-columns: 1fr; }
          .section   { padding: 40px 20px; }
        }

        .cat-card {
          display: block;
          text-decoration: none;
          background: var(--white);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .cat-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        .cat-img-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
          background: #eee;
        }

        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .cat-card:hover .cat-img { transform: scale(1.05); }

        .cat-info {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cat-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--ink);
        }

        .cat-sub {
          font-size: 0.72rem;
          color: var(--gray);
          margin-top: 3px;
          font-weight: 300;
        }

        .cat-arrow {
          width: 32px; height: 32px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: var(--green);
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .cat-card:hover .cat-arrow {
          background: var(--green);
          border-color: var(--green);
          color: white;
        }

        /* ── FEATURE STRIP ── */
        .features {
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .features-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        @media (max-width: 640px) {
          .features-inner { grid-template-columns: 1fr; }
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 24px;
          border-right: 1px solid var(--border);
        }
        .feature:first-child { padding-left: 0; }
        .feature:last-child  { border-right: none; }

        .feature-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .feature-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ink);
        }
        .feature-desc {
          font-size: 0.72rem;
          color: var(--gray);
          font-weight: 300;
          margin-top: 2px;
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <img src="/images/san.png" alt="" className="hero-bg" />
        <p className="hero-sub">Royal Handicraft Centre</p>
        <h1 className="hero-title">ศูนย์ศิลปาชีพ</h1>
        <p className="hero-desc">
          หัตถกรรมไทยคุณภาพสูง ผลิตโดยช่างฝีมือ<br />
          จัดส่งทั่วประเทศ
        </p>
        <Link href="/category/all" className="hero-btn">ดูสินค้าทั้งหมด</Link>
      </section>

      {/* Feature strip */}
      <div className="features">
        <div className="features-inner">
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <div>
              <div className="feature-title">จัดส่งฟรี</div>
              <div className="feature-desc">เมื่อซื้อครบ 500 บาท</div>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">✅</span>
            <div>
              <div className="feature-title">งานแท้ 100%</div>
              <div className="feature-desc">รับรองโดยศูนย์ศิลปาชีพ</div>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">↩️</span>
            <div>
              <div className="feature-title">คืนสินค้าได้</div>
              <div className="feature-desc">ภายใน 7 วันหลังรับของ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">เลือกหมวดหมู่สินค้า</h2>
          <Link href="/category/all" className="section-link">ดูทั้งหมด →</Link>
        </div>

        <div className="cat-grid">
          {categories.map((cat) => (
            <Link key={cat.num} href={`/category/${encodeURIComponent(cat.name)}`} className="cat-card">
              <div className="cat-img-wrap">
                <img src={cat.image} alt={cat.name} className="cat-img" />
              </div>
              <div className="cat-info">
                <div>
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-sub">{cat.subtitle}</div>
                </div>
                <span className="cat-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}