import { redirect } from "next/navigation";
import { getAllCategories } from "@/lib/markdown";

export default async function DocsIndexPage() {
  const categories = await getAllCategories();

  if (categories.length > 0 && categories[0].docs.length > 0) {
    const firstCategory = categories[0];
    const firstDoc = firstCategory.docs[0];
    redirect(`/docs/${firstCategory.slug}/${firstDoc.slug}`);
  }

  return (
    <div className="p-8 sm:p-12 text-center max-w-lg mx-auto my-auto">
      <h2 className="text-xl font-bold text-white mb-2">Brak dokumentów</h2>
      <p className="text-sm text-slate-400">
        Dodaj pliki markdown do katalogu <code className="text-blue-400 font-mono">/content/[kategoria]/[plik].md</code>, aby rozpocząć.
      </p>
    </div>
  );
}
