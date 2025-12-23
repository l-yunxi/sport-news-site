// src/app/[category]/page.js
export const dynamic = "force-dynamic";

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

      {/* If no news show the message */}
      {posts.length === 0 ? (
         <div style={{color: '#888', padding: '20px'}}>
            <h2>No news found in "{titleText}"</h2>
            <Link href="/" style={{color: '#ff0055'}}>Back home</Link>
         </div>
      ) : (
         /* If news exists - use our cool component! */
         <HeroSection posts={posts} />
      )}
    </div>
  );
}