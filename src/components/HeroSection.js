// src/components/HeroSection.js
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/page.module.css"; 

export default function HeroSection({ posts }) {
  // If there is no news, we don't draw anything to avoid errors
  if (!posts || posts.length === 0) return null;

  // Separation logic: 1st post - main, next 3 - side
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  const mainPostCategory = mainPost.category 
    ? decodeURIComponent(mainPost.category).replace(/-/g, " ") 
    : 'Sport';

  return (
    <section className={styles.heroGrid}>
      
      {/* GREAT POST (Left) */}
      <Link href={`/post/${mainPost.slug}`} className={styles.mainPost}>
        {mainPost.imageUrl ? (
          <Image src={mainPost.imageUrl} alt={mainPost.title} fill className={styles.bgImage} />
        ) : (
          <div className={styles.placeholder}>No photo</div>
        )}
        <div className={styles.postContent}>
          <span className={styles.categoryTag}>{mainPostCategory}</span>
          <h2 className={styles.titleMain}>{mainPost.title}</h2>
        </div>
      </Link>

      {/* SIDE POSTS (Right) */}
      <div className={styles.sidePostsColumn}>
        {sidePosts.map((post) => {
          const sideCategory = post.category 
            ? decodeURIComponent(post.category).replace(/-/g, " ") 
            : 'Sport';

          return (
            <Link key={post.slug} href={`/post/${post.slug}`} className={styles.sidePost}>
              {post.imageUrl ? (
                <Image src={post.imageUrl} alt={post.title} fill className={styles.bgImage} />
              ) : (
                <div className={styles.placeholder}></div>
              )}
              <div className={styles.postContent}>
                <span className={styles.categoryTag}>{sideCategory}</span>
                <h3 className={styles.titleSide}>{post.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}