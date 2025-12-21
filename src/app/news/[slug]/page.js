// src/app/news/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./article.module.css"; // <--- Імпортуємо стилі!

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// 1. Отримання даних
async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    _createdAt,
    category,
    mainImage,
    content,
    "related": *[_type == "post" && category == ^.category && slug.current != $slug][0...3] {
      title,
      "slug": slug.current
    },
    "recent": *[_type == "post" && slug.current != $slug] | order(_createdAt desc)[0...5] {
      title,
      "slug": slug.current
    }
  }`;
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

// 2. Час читання
const calculateReadingTime = (blocks) => {
  if (!blocks) return 1;
  const text = blocks
    .map(block => block.children?.map(child => child.text).join("") || "")
    .join(" ");
  return Math.ceil(text.split(" ").length / 200) || 1;
};

// 3. Компоненти тексту (зображення всередині статті)
// 3. Компоненти тексту (зображення, відео, цитати)
const ptComponents = {
  types: {
    // Рендеринг зображень у тексті
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure style={{ margin: "30px 0" }}>
          <div style={{ position: "relative", height: "400px", width: "100%" }}>
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Article image"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          {value.caption && (
            <figcaption style={{ 
              textAlign: "center", 
              color: "#888", 
              fontSize: "14px", 
              marginTop: "10px",
              fontStyle: "italic" 
            }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    // Рендеринг YouTube відео
    youtube: ({ value }) => {
      if (!value?.url) return null;
      // Витягуємо ID відео
      const id = value.url.split('v=')[1] || value.url.split('/').pop();
      return (
        <div style={{ 
          position: "relative", 
          paddingBottom: "56.25%", 
          height: 0, 
          margin: "30px 0",
          borderRadius: "12px",
          overflow: "hidden" 
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              border: 0 
            }}
            allowFullScreen
          />
        </div>
      );
    },
  },
  block: {
    // Стилізація заголовків та цитат через ваш CSS Module
    h2: ({ children }) => <h2 className={styles.articleH2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.articleH3}>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className={styles.articleQuote}>
        {children}
      </blockquote>
    ),
  },
};

// 4. ГОЛОВНИЙ КОМПОНЕНТ
export default async function PostPage(props) {
  const params = await props.params;
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) return notFound();

  const readingTime = calculateReadingTime(post.content);
  const date = new Date(post._createdAt).toLocaleDateString("uk-UA"); // Українська дата

  return (
    <div className={styles.container}>
      
      {/* ГЕРОЙ (Велике фото) */}
      {post.mainImage && (
        <div className={styles.heroSection}>
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}>
             {post.category && (
               <span className={styles.categoryTag}>{post.category}</span>
             )}
             <h1 className={styles.title}>{post.title}</h1>
          </div>
        </div>
      )}

      {/* СІТКА (Контент + Сайдбар) */}
      <div className={styles.grid}>
        
        {/* ЛІВА КОЛОНКА */}
        <article>
          <div className={styles.meta}>
            <span>📅 {date}</span> &nbsp; • &nbsp; 
            <span>⏱ {readingTime} min reading</span>
          </div>

          <div className={styles.content}>
            {post.content ? (
              <PortableText value={post.content} components={ptComponents} />
            ) : (
              <p>Text is missing...</p>
            )}
          </div>

          {/* Схожі статті (під текстом) */}
          <div style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid #333" }}>
            <h3 style={{ marginBottom: "20px" }}>Related articles</h3>
            <div className={styles.relatedGrid}>
                {post.related?.map((item) => (
                  <Link key={item.slug} href={`/news/${item.slug}`} className={styles.relatedCard}>
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        </article>

        {/* ПРАВА КОЛОНКА (Сайдбар) */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBox}>
            <h3 className={styles.sidebarTitle}>Latest news</h3>
            <div>
              {post.recent?.map((recent) => (
                <Link key={recent.slug} href={`/news/${recent.slug}`} className={styles.recentLink}>
                  {recent.title}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.sidebarBox}>
             <h3 className={styles.sidebarTitle}>Share</h3>
             <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ background: "#3b5998", border: "none", color: "white", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Facebook</button>
                <button style={{ background: "#00acee", border: "none", color: "white", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Twitter</button>
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}