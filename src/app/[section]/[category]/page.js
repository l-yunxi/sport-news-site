// src/app/[category]/page.js
/* export const dynamic = "force-dynamic";

import { client } from "@/sanity/client";
import Link from "next/link";
import styles from "../page.module.css"; 
import HeroSection from "@/components/HeroSection";

async function getCategoryPosts(categoryFromUrl) {
  const cleanCategory = decodeURIComponent(categoryFromUrl).replace(/-/g, " ");
  
  // finding news for a particular category
  const query = `*[_type == "post" && lower(category) == lower($category)] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    "imageUrl": mainImage.asset->url
  }`;

  return await client.fetch(query, { category: cleanCategory }, { next: { revalidate: 0 } });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const posts = await getCategoryPosts(category);
  const titleText = decodeURIComponent(category).replace(/-/g, " ");

  return (
    <div className={styles.container}>
      <h1 style={{ 
        fontSize: '3rem', 
        textTransform: 'uppercase', 
        marginBottom: '30px', 
        color: 'white',
        borderBottom: '4px solid #ff0055',
        display: 'inline-block'
      }}>
        {titleText}
      </h1>

      {/* If no news show the message */
    /*  {posts.length === 0 ? (
         <div style={{color: '#888', padding: '20px'}}>
            <h2>No news found in "{titleText}"</h2>
            <Link href="/" style={{color: '#ff0055'}}>Back home</Link>
         </div>
      ) : (
         /* If news exists - use our cool component! */
   /*      <HeroSection posts={posts} />
      )}
    </div>
  );
} */

/// ---------------------------------------------------

// src/app/[section]/[category]/page.js
export const dynamic = "force-dynamic";
import { client } from "@/sanity/client";
import HeroSection from "@/components/HeroSection";
import { notFound } from "next/navigation";

// Які розділи ми дозволяємо (щоб не писали в URL дурниці)
const VALID_SECTIONS = ['news', 'encyclopedia', 'interviews'];

async function getSectionPosts(section, category) {
  const cleanCategory = decodeURIComponent(category).replace(/-/g, " ");
  
  // Шукаємо статті, де співпадає і Секція, і Категорія
  const query = `*[_type == "post" && section == $section && lower(category) == lower($category)] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    section,
    "imageUrl": mainImage.asset->url
  }`;

  return await client.fetch(query, { section, category: cleanCategory }, { next: { revalidate: 0 } });
}

export default async function SectionCategoryPage({ params }) {
  // Отримуємо параметри з URL (наприклад: news / football)
  const { section, category } = await params;

  // Якщо розділ неправильний - видаємо 404
  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const posts = await getSectionPosts(section, category);
  const titleText = decodeURIComponent(category).replace(/-/g, " ");

  // Різні кольори для різних розділів
  const sectionColors = {
    news: '#ff0055',        // Рожевий
    encyclopedia: '#00ccff', // Блакитний
    interviews: '#ffcc00'   // Жовтий
  };
  const activeColor = sectionColors[section] || 'white';

  return (
    <div style={{ padding: '20px' }}>
      {/* Хлібні крихти */}
      <div style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '10px' }}>
        {section} / <span style={{ color: activeColor }}>{titleText}</span>
      </div>

      <h1 style={{ 
        fontSize: '3rem', 
        textTransform: 'uppercase', 
        borderBottom: `4px solid ${activeColor}`,
        display: 'inline-block',
        marginBottom: '30px'
      }}>
        {titleText}
      </h1>

      {posts.length === 0 ? (
        <div style={{ padding: '50px 0', textAlign: 'center', color: '#888' }}>
          <h2>У розділі {section} немає статей про {titleText} 😔</h2>
        </div>
      ) : (
        <HeroSection posts={posts} />
      )}
    </div>
  );
}