import { redirect, notFound } from "next/navigation";
import { getCategoryDocs, getAllCategories, formatCategoryTitle } from "@/lib/markdown";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const docs = await getCategoryDocs(category);

  if (!docs || docs.length === 0) {
    notFound();
  }

  // Redirect to first document in this category
  redirect(`/docs/${category}/${docs[0].slug}`);
}
