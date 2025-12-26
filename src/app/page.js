import { getPosts } from "@/lib/getPosts";
import FeedLayout from "@/components/FeedLayout";

export default async function HomePage() {
  const posts = await getPosts({ limit: 20 }); // Call without parameters = take everything
  return <FeedLayout posts={posts} />;
}