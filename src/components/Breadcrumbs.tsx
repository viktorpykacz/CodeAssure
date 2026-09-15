import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  categorySlug: string;
  categoryTitle: string;
  docTitle?: string;
}

export default function Breadcrumbs({
  categorySlug,
  categoryTitle,
  docTitle,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center space-x-2 text-xs text-slate-400 mb-6 flex-wrap"
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-slate-200 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Strona główna</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

      <Link
        href="/docs"
        className="hover:text-slate-200 transition-colors"
      >
        Dokumentacja
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

      <Link
        href={`/docs/${categorySlug}`}
        className="hover:text-slate-200 transition-colors text-blue-400 font-medium"
      >
        {categoryTitle}
      </Link>

      {docTitle && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-slate-200 font-semibold truncate max-w-xs sm:max-w-md">
            {docTitle}
          </span>
        </>
      )}
    </nav>
  );
}
