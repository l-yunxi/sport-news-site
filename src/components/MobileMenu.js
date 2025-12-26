// src/components/MobileMenu.js
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MobileMenu.module.css";
import { categories } from "../data/categories";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  // What section is open ('news', 'encyclopedia', 'interviews')
  const [openSection, setOpenSection] = useState(null);

  const closeMenu = () => setIsOpen(false);

  const toggleSection = (sectionName) => {
    // If click on opened - close, otherwise - open
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  // Function to draw the list of categories
  const renderCategories = (basePath) => (
    <div className={styles.treeContainer}>
      {categories.map((cat) => (
        <div key={cat.value} className={styles.categoryItem}>
          {/* Link to the category */}
          <Link 
            href={`/${basePath}/${cat.value}`} 
            onClick={closeMenu}
            className={styles.catLink}
          >
            {cat.title}
          </Link>

          {/* Subcategory under category */}
          {cat.subcategories && cat.subcategories.length > 0 && (
            <div className={styles.subList}>
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.value}
                  href={`/${basePath}/${cat.value}/${sub.value}`}
                  onClick={closeMenu}
                  className={styles.subLink}
                >
                  — {sub.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.mobileWrapper}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.burgerBtn}>
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <nav className={styles.navContainer}>
            <Link href="/" onClick={closeMenu} className={styles.homeLink}>HOME</Link>

            {/* --- NEWS --- */}
            <div className={styles.sectionWrapper}>
              {/*  Now this entire line is a button that opens a list */}
              <div 
                className={styles.sectionHeader} 
                onClick={() => toggleSection('news')}
              >
                <span className={styles.sectionTitle}>NEWS</span>
                <span className={styles.arrowIcon}>
                  {openSection === 'news' ? "▲" : "▼"}
                </span>
              </div>
              {openSection === 'news' && renderCategories('news')}
            </div>

            {/* --- ENCYCLOPEDIA --- */}
            <div className={styles.sectionWrapper}>
              <div 
                className={styles.sectionHeader} 
                onClick={() => toggleSection('encyclopedia')}
              >
                <span className={styles.sectionTitle}>ENCYCLOPEDIA</span>
                <span className={styles.arrowIcon}>
                  {openSection === 'encyclopedia' ? "▲" : "▼"}
                </span>
              </div>
              {openSection === 'encyclopedia' && renderCategories('encyclopedia')}
            </div>

            {/* --- INTERVIEWS --- */}
            <div className={styles.sectionWrapper}>
              <div 
                className={styles.sectionHeader} 
                onClick={() => toggleSection('interviews')}
              >
                <span className={styles.sectionTitle}>INTERVIEWS</span>
                <span className={styles.arrowIcon}>
                  {openSection === 'interviews' ? "▲" : "▼"}
                </span>
              </div>
              {openSection === 'interviews' && renderCategories('interviews')}
            </div>
            
            <div className={styles.sectionWrapper}>
                <div className={styles.sectionHeader}>
                    <Link
                    href="/post"
                    onClick={closeMenu}
                    className={styles.allArticlesLink}
                    >
                    <span className={styles.sectionTitle}>All articles</span>
                    </Link>
                </div>
            </div>

          </nav>
        </div>
      )}
    </div>
  );
}