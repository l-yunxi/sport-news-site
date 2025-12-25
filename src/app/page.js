import { getPosts } from "@/lib/getPosts";
import FeedLayout from "@/components/FeedLayout";

export default async function HomePage() {
  const posts = await getPosts(); // Вызываем без параметров = берем все
  return <FeedLayout posts={posts} />;
}