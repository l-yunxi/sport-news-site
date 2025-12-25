export const dynamic = "force-dynamic";
import { getPosts } from "@/lib/getPosts";
import FeedLayout from "@/components/FeedLayout";
import { notFound } from "next/navigation";

const VALID_SECTIONS = ['news', 'encyclopedia', 'interviews'];
const SECTION_COLORS = { news: '#ff0055', encyclopedia: '#00ccff', interviews: '#ffcc00' };

export default async function SubcategoryPage({ params }) {
  const { section, category, subcategory } = await params;
  if (!VALID_SECTIONS.includes(section)) notFound();

  // receive data in one line
  const posts = await getPosts({ section, category, subcategory });

  // preparing "beautiful" names
  const catTitle = decodeURIComponent(category).replace(/-/g, " ");
  const subTitle = decodeURIComponent(subcategory).replace(/-/g, " ");
  const activeColor = SECTION_COLORS[section];

  // Form breadcrumbs
  const crumbs = [
    { label: section },
    { label: catTitle, href: `/${section}/${category}` },
    { label: subTitle, color: activeColor }
  ];

  // Render template
  return <FeedLayout title={subTitle} posts={posts} breadcrumbs={crumbs} />;
}