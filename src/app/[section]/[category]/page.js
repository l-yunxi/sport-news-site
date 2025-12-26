// src/app/[section]/[category]/page.js
export const dynamic = "force-dynamic";
import { client } from "@/sanity/client";
import HeroSection from "@/components/HeroSection";
import { notFound } from "next/navigation";

// What sections do we allow (so that we don't write nonsense in the URL)
const VALID_SECTIONS = ['news', 'encyclopedia', 'interviews'];

async function getSectionPosts(section, category) {
  const cleanCategory = decodeURIComponent(category).replace(/-/g, " ");

  // Find posts where both Section and Category match
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
  // get parameters with URL (for ex: news / football)
  const { section, category } = await params;

  // if the section is incorrect - return 404
  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const posts = await getSectionPosts(section, category);
  const titleText = decodeURIComponent(category).replace(/-/g, " ");

  const sectionColors = {
    news: '#ff0055',        
    encyclopedia: '#00ccff', 
    interviews: '#ffcc00'   
  };
  const activeColor = sectionColors[section] || 'white';

  return (
    <div style={{ padding: '20px' }}>
      {/* breadcrumbs */}
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
          <h2>In section {section} no articles {titleText} 😔</h2>
        </div>
      ) : (
        <HeroSection posts={posts} />
      )}
    </div>
  );
}