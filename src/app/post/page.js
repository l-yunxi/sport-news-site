// src/app/news/page.js
import { client } from "@/sanity/client"; 
import NewsList from "./NewsList";

// Function to get ALL news
async function getAllPosts() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    _createdAt,
    "imageUrl": mainImage.asset->url
  }`;

  // revalidate: 60 - update cache every minute
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export const metadata = {
  title: "All news | SportNews",
  description: "Archive of all sports news",
};

export default async function NewsPage() {
  const posts = await getAllPosts();

  return (
    // We just pass the data to the client component
    <NewsList posts={posts} />
  );
}