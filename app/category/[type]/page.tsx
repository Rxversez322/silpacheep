export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase"
import Link from "next/link"

const categoryList = [
  "งานจักสานและเฟอร์นิเจอร์",
  "งานปั้นและของตกแต่ง",
  "งานวาดและศิลปะ",
]

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const decodedType = decodeURIComponent(type)
  const isAll = decodedType === "all"

  // ถ้า all → ดึงทั้งหมด, ถ้าเป็น category → filter
  const { data: products } = isAll
    ? await supabase.from("products").select("*")
    : await supabase.from("products").select("*").eq("category", decodedType)

  const pageTitle = isAll ? "สินค้าทั้งหมด" : decodedType

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
          --green-h:#3d7a35;
        }

        body {
          background: var(--bg);
          font-family: 'Noto Sans Thai', sans-serif;
          color: var(--ink);
        }

        .breadcrumb {
          max-width: 1200px;
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

        .layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 32px 80px;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .layout { grid-template-columns: 1fr; }
          .sidebar { display: none; }
          .layout { padding: 20px 16px 60px; }
          .breadcrumb { padding: 16px 16px 0; }
        }

        /* Sidebar */
        .sidebar-title {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink);
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .cat-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }
        .cat-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          font-size: 0.85rem;
          color: var(--ink);
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .cat-link:hover  { background: var(--border); }
        .cat-link.active { background: var(--green); color: white; font-weight: 500; }
        .cat-count {
          font-size: 0.68rem;
          color: var(--gray);
          background: var(--bg);
          padding: 2px 7px;
          border-radius: 20px;
        }
        .cat-link.active .cat-count { background: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }

        /* Mobile pills */
        .mobile-cats {
          display: none;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 20px;
          scrollbar-width: none;
        }
        .mobile-cats::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) { .mobile-cats { display: flex; } }
        .mob-pill {
          white-space: nowrap;
          padding: 6px 14px;
          font-size: 0.78rem;
          border: 1px solid var(--border);
          background: var(--white);
          color: var(--ink);
          text-decoration: none;
          flex-shrink: 0;
        }
        .mob-pill.active { background: var(--green); border-color: var(--green); color: white; }

        /* Main header */
        .main-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .main-title { font-size: 1.15rem; font-weight: 600; }
        .main-count { font-size: 0.8rem; color: var(--gray); }

/* Grid */
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr);
}

/* Tablet */
@media (max-width: 1024px) {
  .grid { 
    grid-template-columns: repeat(2, 1fr); 
  }
}

/* Mobile */
@media (max-width: 640px) {
  .grid { 
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

        /* Card */
        .pcard {
          background: var(--white);
          border: 1px solid var(--border);
          text-decoration: none;
          color: var(--ink);
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.22s, transform 0.22s;
          animation: fadeUp 0.55s ease both;
        }
        .pcard:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); transform: translateY(-3px); }
        .pcard:nth-child(1) { animation-delay: 0.04s; }
        .pcard:nth-child(2) { animation-delay: 0.09s; }
        .pcard:nth-child(3) { animation-delay: 0.14s; }
        .pcard:nth-child(4) { animation-delay: 0.19s; }
        .pcard:nth-child(5) { animation-delay: 0.24s; }
        .pcard:nth-child(6) { animation-delay: 0.29s; }

        .pcard-img-wrap { overflow: hidden; }
        .pcard-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          display: block;
          background: #eee;
          transition: transform 0.5s ease;
        }
        .pcard:hover .pcard-img { transform: scale(1.06); }

.pcard-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 2px solid transparent;
  transition: border-color 0.25s;
}
        .pcard:hover .pcard-body { border-color: var(--green); }

        .pcard-cat { font-size: 0.62rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.08em; }
        .pcard-name { font-size: 0.9rem; font-weight: 500; line-height: 1.45; flex: 1; }

.pcard-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
        .pcard-price { font-size: 1rem; font-weight: 600; color: var(--green); }
        .btn-cart {
          padding: 7px 14px;
          background: var(--green);
          color: white;
          border: none;
          font-size: 0.72rem;
          font-family: 'Noto Sans Thai', sans-serif;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }
        .btn-cart:hover { background: var(--green-h); }

        /* Empty */
        .empty { text-align: center; padding: 80px 20px; color: var(--gray); grid-column: 1 / -1; }
        .empty-icon  { font-size: 2.5rem; margin-bottom: 14px; opacity: 0.4; }
        .empty-title { font-size: 1.1rem; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .empty-sub   { font-size: 0.85rem; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">หน้าแรก</Link>
        <span className="bc-sep">/</span>
        {isAll ? (
          <span className="bc-cur">สินค้าทั้งหมด</span>
        ) : (
          <>
            <Link href="/category/all">สินค้าทั้งหมด</Link>
            <span className="bc-sep">/</span>
            <span className="bc-cur">{decodedType}</span>
          </>
        )}
      </nav>

      <div className="layout">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-title">หมวดหมู่</div>
          <ul className="cat-list">
            <li>
              <Link href="/category/all" className={`cat-link${isAll ? " active" : ""}`}>
                ทั้งหมด
                <span className="cat-count">{products?.length ?? 0}</span>
              </Link>
            </li>
            {categoryList.map((cat) => {
              const count = isAll
                ? (products?.filter(p => p.category === cat).length ?? 0)
                : (decodedType === cat ? products?.length ?? 0 : "")
              return (
                <li key={cat}>
                  <Link
                    href={`/category/${encodeURIComponent(cat)}`}
                    className={`cat-link${decodedType === cat ? " active" : ""}`}
                  >
                    {cat}
                    <span className="cat-count">{count}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Main */}
        <main>
          {/* Mobile pills */}
          <div className="mobile-cats">
            <Link href="/category/all" className={`mob-pill${isAll ? " active" : ""}`}>ทั้งหมด</Link>
            {categoryList.map((cat) => (
              <Link key={cat} href={`/category/${encodeURIComponent(cat)}`} className={`mob-pill${decodedType === cat ? " active" : ""}`}>
                {cat}
              </Link>
            ))}
          </div>

          <div className="main-header">
            <h1 className="main-title">{pageTitle}</h1>
            <span className="main-count">พบ {products?.length ?? 0} รายการ</span>
          </div>

          <div className="grid">
            {products && products.length > 0 ? (
              products.map((item) => (
                <Link key={item.id} href={`/${item.id}`} className="pcard">
                  <div className="pcard-img-wrap">
                    <img src={item.image} alt={item.name} className="pcard-img" />
                  </div>
                  <div className="pcard-body">
                    {isAll && <span className="pcard-cat">{item.category}</span>}
                    <div className="pcard-name">{item.name}</div>
                    <div className="pcard-footer">
                      <span className="pcard-price">฿{Number(item.price).toLocaleString("th-TH")}</span>
                      <button className="btn-cart">+ ตะกร้า</button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty">
                <div className="empty-icon">🪴</div>
                <h2 className="empty-title">ยังไม่มีสินค้าในหมวดนี้</h2>
                <p className="empty-sub">โปรดกลับมาใหม่ในภายหลัง</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}