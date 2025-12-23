// src/app/layout.js
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: "SportNews",
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
              SPORT<span style={{ color: '#ff0055' }}>NEWS</span>
            </Link>

            {/* menu */}
            <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              
              {/* regular link */}
              <Link href="/" style={{ fontWeight: 'bold', color: 'white' }}>Home</Link>

              {/* --- DROPDOWN LIST "SPORT" --- */}
              <div className="dropdown">
                <button className="dropbtn">
                  Sport <span className="arrow">▼</span>
                </button>
                <div className="dropdown-content">
                  <Link href="/boxing">Boxing</Link>
                  <Link href="/tennis">Tennis</Link>
                  <Link href="/water polo">Water polo</Link>
                  <Link href="/swimming">Swimming</Link>
                </div>
              </div>
              {/* ---------------------------------- */}

              <Link href="/news" style={{ color: '#ccc' }}>All news</Link>
            </nav>
          </header>

          {/* (page.js) */}
          <main>
            {children}
          </main>

          {/* FOOTER */}
          <footer style={{ marginTop: '50px', padding: '20px 0', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
            © 2025 SportNews
          </footer>

        </div>
      </body>
    </html>
  );
}