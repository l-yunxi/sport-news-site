export const dynamic = "force-dynamic";
import { getPosts } from "@/lib/getPosts";
import FeedLayout from "@/components/FeedLayout";
import { notFound } from "next/navigation";

const VALID_SECTIONS = ['news', 'encyclopedia', 'interviews'];
const SECTION_COLORS = { news: '#ff0055', encyclopedia: '#00ccff', interviews: '#ffcc00' };

export default async function SubcategoryPage({ params }) {
  const { section, category, subcategory } = await params;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

 // Get posts (pass all 3 parameters)
  const posts = await getPosts({ section, category, subcategory });

  // We prepare beautiful display names
  const catTitle = decodeURIComponent(category).replace(/-/g, " ");
  const subTitle = decodeURIComponent(subcategory).replace(/-/g, " ");
  
  // Determine the color
  const activeColor = SECTION_COLORS[section] || 'white';

  // Breadcrumbs (3 levels)
  const breadcrumbs = [
    { label: section },
    { label: catTitle, href: `/${section}/${category}` }, // Clickable back link
    { label: subTitle, color: activeColor } // Last element - colored
  ];

  // Render using your template
  return <FeedLayout title={subTitle} posts={posts} breadcrumbs={breadcrumbs} />;
}