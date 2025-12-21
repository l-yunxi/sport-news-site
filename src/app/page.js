// src/app/page.js
import Link from 'next/link';
import { client } from '../sanity/client'; // Імпортуємо підключення до Sanity
import styles from './page.module.css';     // Імпортуємо стилі

// Функція для отримання новин
async function getData() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "category": category,
    "imageUrl": mainImage.asset->url
  }`;
  
  // revalidate: 0 означає, що кеш оновлюється миттєво
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return data;
}

export default async function Home() {
  const posts = await getData();

  // Якщо новин немає або сталася помилка
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.container}>
        <h1 style={{color: 'white'}}>No news yet</h1>
      </div>
    );
  }

  const mainPost = posts[0];           // Перша новина (велика)
  const sidePosts = posts.slice(1, 4); // Наступні 3 новини (збоку)

  return (
      <main className={styles.container}>
      {/* Секція в стилі ZoxPress */}
      <section className={styles.heroGrid}>
        
        {/* ВЕЛИКИЙ ПОСТ (Зліва) */}
        <Link href={`/news/${mainPost.slug}`} className={styles.mainPost}>
          {mainPost.imageUrl ? (
            <img src={mainPost.imageUrl} alt={mainPost.title} className={styles.bgImage} />
          ) : (
            <div className={styles.placeholder}>No photo</div>
          )}
          <div className={styles.postContent}>
            <span className={styles.categoryTag}>{mainPost.category || 'Sport'}</span>
            <h2 className={styles.titleMain}>{mainPost.title}</h2>
          </div>
        </Link>

        {/* БОКОВІ ПОСТИ (Справа) */}
        <div className={styles.sidePostsColumn}>
          {sidePosts.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className={styles.sidePost}>
              {post.imageUrl ? (
                <img src={post.imageUrl} alt={post.title} className={styles.bgImage} />
              ) : (
                <div className={styles.placeholder}></div>
              )}
              <div className={styles.postContent}>
                <span className={styles.categoryTag}>{post.category || 'News'}</span>
                <h3 className={styles.titleSide}>{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </main>
  );
}