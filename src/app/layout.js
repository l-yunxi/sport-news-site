// src/app/layout.js
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DropdownMenu from "@/components/DropdownMenu";
import MobileMenu from "@/components/MobileMenu";

export const metadata = {
  title: "ThalionSport",
  description: "Stay updated with the latest and greatest in sports news, featuring in-depth articles, expert analysis, and exclusive interviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 0', 
            borderBottom: '1px solid #333',
           // marginBottom: '30px'
          }}>
            <Link href="/" style={{ fontSize: '2rem', fontWeight: '900', textDecoration: 'none' }}>
              <span style={{ color: '#00ccff' }}>Thalion</span>Sport
            </Link>
            
            <MobileMenu />

            <nav className="desktop-only" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <DropdownMenu section="news" title="News" />
              <DropdownMenu section="encyclopedia" title="Encyclopedia" />
              <DropdownMenu section="interviews" title="Interviews" />
              <Link href="/post" style={{ color: '#ccc' }}>All articles</Link>
            </nav>
          </header>

          <main>{children}</main>

          <footer style={{ marginTop: '50px', padding: '20px 0', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
            © 2025 Thalion All rights reserved.
          </footer>

        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
