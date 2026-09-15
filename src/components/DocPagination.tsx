import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DocMeta } from "@/lib/markdown";

interface DocPaginationProps {
  prev: DocMeta | null;
  next: DocMeta | null;
}

export default function DocPagination({ prev, next }: DocPaginationProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/docs/${prev.category}/${prev.slug}`}
          className="group flex flex-col p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700 transition-all text-left"
        >
          <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-blue-400 transition-colors mb-1">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Poprzedni artykuł</span>
          </div>
          <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${next.category}/${next.slug}`}
          className="group flex flex-col p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700 transition-all text-right sm:col-start-2"
        >
          <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400 group-hover:text-blue-400 transition-colors mb-1">
            <span>Następny artykuł</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
            {next.title}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
