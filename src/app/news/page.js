// src/app/news/page.js
import { client } from "@/sanity/client"; // Перевірте шлях до вашого клієнта
import NewsList from "./NewsList";

// Функція для отримання ВСІХ новин
async function getAllPosts() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    _createdAt,
    "imageUrl": mainImage.asset->url
  }`;

  // revalidate: 60 - оновлювати кеш кожну хвилину
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export const metadata = {
  title: "Всі новини | SportNews",
  description: "Архів усіх спортивних новин",
};

export default async function NewsPage() {
  const posts = await getAllPosts();

  return (
    // Ми просто передаємо дані у клієнтський компонент
    <NewsList posts={posts} />
  );
}