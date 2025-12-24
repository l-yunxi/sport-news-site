// src/app/news/NewsList.js
"use client"; // Important! This makes the component client-side

import { useState } from "react";
import Link from "next/link";
import styles from "./news.module.css";

export default function NewsList({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Getting the list of unique categories from all posts
  const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))];

  // Filtering logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Archive</h1>
        
        <div className={styles.controls}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search article..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category buttons */}
          <div className={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeBtn : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List of cards */}
      <div className={styles.grid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className={styles.image} />
                ) : (
                  <div style={{width:'100%', height:'100%', background:'#333'}}></div>
                )}
              </div>
              <div className={styles.content}>
                <span className={styles.catTag}>{post.category || "General"}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <span className={styles.date}>
                  {new Date(post._createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noResults}>Nothing found 😔</div>
        )}
      </div>
    </div>
  );
}