import React from "react";
import Link from "next/link";
import {
  CheckSquare,
  Terminal,
  HelpCircle,
  Folder,
  Cpu,
  Coffee,
  Layout,
  ArrowRight,
  FileText,
} from "lucide-react";
import type { CategoryInfo } from "@/lib/markdown";

const ICON_MAP: Record<string, React.ElementType> = {
  CheckSquare,
  Terminal,
  Coffee,
  Layout,
  HelpCircle,
  Cpu,
  Folder,
};

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = ICON_MAP[category.iconName] || Folder;
  const firstDocSlug = category.docs[0]?.slug;
  const destinationHref = firstDocSlug
    ? `/docs/${category.slug}/${firstDocSlug}`
    : `/docs/${category.slug}`;

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
      <div>
        {/* Top bar with icon and doc count */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:scale-105 group-hover:bg-blue-900/60 transition-all">
            <Icon className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60">
            {category.docCount} {category.docCount === 1 ? "artykuł" : "artykułów"}
          </span>
        </div>

        {/* Title and description */}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
          {category.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {category.description}
        </p>

        {/* Top docs preview */}
        <div className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            Dostępne tematy:
          </span>
          <ul className="space-y-1.5">
            {category.docs.slice(0, 3).map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/docs/${category.slug}/${doc.slug}`}
                  className="text-xs text-slate-300 hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Link to docs */}
      <Link
        href={destinationHref}
        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white text-xs font-semibold transition-all group/btn"
      >
        <span>Przejdź do dokumentacji</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
