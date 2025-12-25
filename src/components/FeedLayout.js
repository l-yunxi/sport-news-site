// src/components/FeedLayout.js
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import styles from "@/app/[section]/[category]/[subcategory]/page.module.css"; 

export default function FeedLayout({ posts, title, breadcrumbs = [] }) {
  // If there are no posts
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.container}>
         <h1>{title}</h1>
         <div className={styles.emptyState}>
            <h2>There is no articles yet</h2>
         </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs (if given) */}
      {breadcrumbs.length > 0 && (
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && ' / '}
              {crumb.href ? (
                <Link href={crumb.href} className={styles.categoryLink}>
                  {crumb.label}
                </Link>
              ) : (
                <span style={{ color: crumb.color || '#fff' }}>{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className={styles.title} style={{ borderColor: breadcrumbs[breadcrumbs.length-1]?.color || 'white' }}>
        {title}
      </h1>

      {/* List of articles */}
      <HeroSection posts={posts} />
    </div>
  );
}