// src/lib/getPosts.js
import { client } from "@/sanity/client";

export async function getPosts({ section, category, subcategory } = {}) {
  // Basic filter - always looking for posts
  let filters = ['_type == "post"'];
  const params = {};

  // If the section is transferred -> add a filter
  if (section) {
    filters.push('section == $section');
    params.section = section;
  }

  // If the category is transferred -> decode and add a filter
  if (category) {
    // In the query, we use lower() to be case-insensitive
    filters.push('lower(category) == lower($category)'); 
    // Here you can add logic like .replace(/-/g, " ") if the database stores names with spaces
    params.category = decodeURIComponent(category); 
  }

  // If the subcategory is transferred -> add a filter (exact match for slug)
  if (subcategory) {
    filters.push('subcategory == $subcategory');
    params.subcategory = decodeURIComponent(subcategory);
  }

  // Assemble the query
  const query = `*[${filters.join(' && ')}] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    subcategory,
    section,
    "imageUrl": mainImage.asset->url
  }`;

  // Execute
  return await client.fetch(query, params, { next: { revalidate: 0 } });
}