// src/app/layout.js
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: "ThalionSport",
  description: "Stay updated with the latest and greatest in sports news, featuring in-depth articles, expert analysis, and exclusive interviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* This container keeps the entire site centered */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* header */}
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 0', 
            borderBottom: '1px solid #333',
            marginBottom: '30px'
          }}>
            {/* logo */}
            <Link href="/" style={{ fontSize: '2rem', fontWeight: '900', textDecoration: 'none' }}>
              <span style={{ color: '#00ccff' }}>Thalion</span>Sport
            </Link>

            {/* menu */}
            <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
             {/* Кнопка НОВИНИ */}
  <div className="dropdown">
    <button className="dropbtn">News ▼</button>
    <div className="dropdown-content">
      <Link href="/news/water polo">Water polo</Link>
      <Link href="/news/boxing">Boxing</Link>
    </div>
  </div>

  {/* Кнопка ЕНЦИКЛОПЕДІЯ */}
  <div className="dropdown">
    <button className="dropbtn">Encyclopedia ▼</button>
    <div className="dropdown-content">
      <Link href="/encyclopedia/boxing">Boxing</Link>
      <Link href="/encyclopedia/water polo">Water polo</Link>
    </div>
  </div>

  {/* Кнопка ІНТЕРВ'Ю (Нова!) */}
  <div className="dropdown">
    <button className="dropbtn">Interviews ▼</button>
    <div className="dropdown-content">
      <Link href="/interviews/boxing">boxing</Link>
      <Link href="/interviews/water polo">water polo</Link>
    </div>
  </div>
  <Link href="/post" style={{ color: '#ccc' }}>All articles</Link>
             
            </nav>
          </header>

          {/* (page.js) */}
          <main>
            {children}
          </main>

          {/* FOOTER */}
          <footer style={{ marginTop: '50px', padding: '20px 0', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
            © 2025 Thalion All rights reserved.
          </footer>

        </div>
      </body>
    </html>
  );
}