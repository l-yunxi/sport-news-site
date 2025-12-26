export const dynamic = "force-dynamic";
import { getPosts } from "@/lib/getPosts"; // universal function
import FeedLayout from "@/components/FeedLayout"; // design template
import { notFound } from "next/navigation";

const VALID_SECTIONS = ['news', 'encyclopedia', 'interviews'];
const SECTION_COLORS = { news: '#ff0055', encyclopedia: '#00ccff', interviews: '#ffcc00' };

export default async function CategoryPage({ params }) {
  const { section, category } = await params;

  // Checking the section for correctness
  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  // Get posts (getPosts will handle the decoding itself)
  const posts = await getPosts({ section, category });

  // Preparing a good title for the header (decoding for display)
  const titleText = decodeURIComponent(category).replace(/-/g, " ");
  
  // Determining the color
  const activeColor = SECTION_COLORS[section] || 'white';

  // Breadcrumbs (2 levels)
  const breadcrumbs = [
    { label: section }, 
    { label: titleText, color: activeColor } // Last element - colored
  ];

  // Render using your template
  return <FeedLayout title={titleText} posts={posts} breadcrumbs={breadcrumbs} />;
}