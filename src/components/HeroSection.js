// src/components/HeroSection.js
import Link from "next/link";
import styles from "@/app/page.module.css"; 

export default function HeroSection({ posts }) {
  // If there is no news, we don't draw anything to avoid errors
  if (!posts || posts.length === 0) return null;

    // Логіка розділення: 1-й пост - головний, наступні 3 - бокові
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <section className={styles.heroGrid}>
      
      {/* GREAT POST (Left) */}
      <Link href={`/post/${mainPost.slug}`} className={styles.mainPost}>
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

      {/* SIDE POSTS (Right) */}
      <div className={styles.sidePostsColumn}>
        {sidePosts.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}`} className={styles.sidePost}>
            {post.imageUrl ? (
              <img src={post.imageUrl} alt={post.title} className={styles.bgImage} />
            ) : (
              <div className={styles.placeholder}></div>
            )}
            <div className={styles.postContent}>
              <span className={styles.categoryTag}>{post.category}</span>
              <h3 className={styles.titleSide}>{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}