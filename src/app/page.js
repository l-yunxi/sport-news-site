// src/app/page.js
import Link from 'next/link';
import { client } from '../sanity/client'; 
import styles from './page.module.css';    
import HeroSection from "@/components/HeroSection"; 


// Function to fetch news from Sanity
async function getData() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "category": category,
    "imageUrl": mainImage.asset->url
  }`;
  
  // revalidate: 0 means that cash updates instantly
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return data;
}

export default async function Home() {
  const posts = await getData();

  // If no posts or error
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.container}>
        <h1 style={{color: 'white'}}>No news yet</h1>
      </div>
    );
  }

  const mainPost = posts[0];           // First news (big one)
  const sidePosts = posts.slice(1, 4); // Next 3 news (sides)

  return (
      <main className={styles.container}>
      {/* Just call the component and pass it the posts */}
      <HeroSection posts={posts} />
    </main>
  );
}