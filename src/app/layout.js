// src/app/layout.js
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SportNews",
  description: "Stay updated with the latest and greatest in sports news, featuring in-depth articles, expert analysis, and exclusive interviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
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
            <Link href="/" style={{ fontSize: '2rem', fontWeight: '900' }}>
              SPORT<span style={{ color: '#ff0055' }}>NEWS</span>
            </Link>
            <nav style={{ display: 'flex', gap: '20px' }}>
              <Link href="/" style={{ fontWeight: 'bold' }}>Home</Link>
              <Link href="#" style={{ color: '#888' }}>About us</Link>
              <Link href="/news" style={{ color: '#ccc' }}>Archive</Link> {/* <-- Додайте це */}
            </nav>
          </header>

          {/* (page.js) */}
          <main>
            {children}
          </main>

          {/* ФУТЕР */}
          <footer style={{ marginTop: '50px', padding: '20px 0', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
            © 2025 SportNews
          </footer>

        </div>
      </body>
    </html>
  );
}