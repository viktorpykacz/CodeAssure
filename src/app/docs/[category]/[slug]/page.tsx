import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Calendar, Tag } from "lucide-react";
import {
  getDocBySlug,
  getAllDocPaths,
  getAdjacentDocs,
} from "@/lib/markdown";
import Breadcrumbs from "@/components/Breadcrumbs";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import DocPagination from "@/components/DocPagination";

interface DocPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return await getAllDocPaths();
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const doc = await getDocBySlug(category, slug);

  if (!doc) {
    return {
      title: "Dokument nie znaleziony | CodeAssure",
    };
  }

  return {
    title: `${doc.title} | CodeAssure Docs`,
    description: doc.description || `Artykuł ${doc.title} w kategorii ${doc.categoryTitle}`,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { category, slug } = await params;
  const doc = await getDocBySlug(category, slug);

  if (!doc) {
    notFound();
  }

  const { prev, next } = await getAdjacentDocs(category, slug);

  return (
    <div className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 lg:py-10 max-w-7xl mx-auto flex gap-12">
      {/* Main article content column */}
      <main className="flex-1 min-w-0 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          categorySlug={doc.category}
          categoryTitle={doc.categoryTitle}
          docTitle={doc.title}
        />

        {/* Article Header */}
        <header className="mb-8 pb-6 border-b border-slate-800/80">
          {/* Category Badge & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800/60">
              {doc.categoryTitle}
            </span>

            {doc.tags &&
              doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/50"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {doc.title}
          </h1>

          {/* Description */}
          {doc.description && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {doc.description}
            </p>
          )}

          {/* Metadata info: Date, Reading time */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-400 font-mono">
            {doc.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{doc.date}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{doc.readingTimeMinutes} min czytania</span>
            </div>
          </div>
        </header>

        {/* Rendered Markdown Body */}
        <MarkdownRenderer content={doc.content} />

        {/* Previous & Next Articles */}
        <DocPagination prev={prev} next={next} />
      </main>

      {/* Right Column: Table of Contents (Desktop only) */}
      <aside className="hidden xl:block w-64 shrink-0">
        <TableOfContents headings={doc.headings} />
      </aside>
    </div>
  );
}
