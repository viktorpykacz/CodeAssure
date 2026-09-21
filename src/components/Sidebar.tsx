"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Search,
  CheckSquare,
  Terminal,
  HelpCircle,
  Folder,
  Cpu,
  Coffee,
  Layout,
  BookOpen,
} from "lucide-react";
import type { CategoryInfo } from "@/lib/markdown";

interface SidebarProps {
  categories: CategoryInfo[];
  onItemClick?: () => void;
}

// Icon mapper for categories
const ICON_MAP: Record<string, React.ElementType> = {
  CheckSquare,
  Terminal,
  Coffee,
  Layout,
  HelpCircle,
  Cpu,
  Folder,
};

export default function Sidebar({ categories, onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const [filterQuery, setFilterQuery] = useState("");

  // Store expanded state of categories: default all open
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (slug: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Filter docs if user types in search box
  const normalizedQuery = filterQuery.toLowerCase().trim();

  const filteredCategories = categories.map((category) => {
    if (!normalizedQuery) return category;
    const matchingDocs = category.docs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(normalizedQuery) ||
        doc.description?.toLowerCase().includes(normalizedQuery) ||
        doc.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
    return {
      ...category,
      docs: matchingDocs,
    };
  }).filter((cat) => !normalizedQuery || cat.docs.length > 0 || cat.title.toLowerCase().includes(normalizedQuery));

  return (
    <aside className="w-full h-full flex flex-col bg-[#0d121f]/95 border-r border-slate-800/80 select-none">
      {/* Sidebar Search Filter */}
      <div className="p-4 border-b border-slate-800/60">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filtruj tematy..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Categories & Docs Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            Brak wyników dla &quot;{filterQuery}&quot;
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isCollapsed = Boolean(collapsedCategories[category.slug]);
            const CategoryIcon = ICON_MAP[category.iconName] || Folder;
            const isCategoryActive = pathname.startsWith(`/docs/${category.slug}`);

            return (
              <div key={category.slug} className="space-y-1">
                {/* Category Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
                    isCategoryActive
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-4 h-4 text-blue-500" />
                    <span>{category.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/80 text-slate-400">
                      {category.docs.length}
                    </span>
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                </button>

                {/* Docs list in category */}
                {!isCollapsed && (
                  <ul className="mt-1 pl-3 space-y-1 border-l border-slate-800/60 ml-3.5">
                    {category.docs.map((doc) => {
                      const docHref = `/docs/${category.slug}/${doc.slug}`;
                      const normalizedPath = pathname?.replace(/\/$/, "") || "";
                      const isActive = normalizedPath === docHref;

                      return (
                        <li key={doc.slug}>
                          <Link
                            href={docHref}
                            onClick={onItemClick}
                            className={`group flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                              isActive
                                ? "bg-blue-600/20 text-blue-400 font-semibold border-l-2 border-blue-500 shadow-sm"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            <span className="text-[10px] text-slate-600 group-hover:text-slate-500 font-mono ml-2 shrink-0">
                              {doc.readingTimeMinutes} min
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </nav>

      {/* Footer info in sidebar */}
      <div className="p-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          <span>Lokalna Baza Wiedzy</span>
        </div>
        <span className="font-mono text-[10px] bg-blue-950/60 text-blue-400 border border-blue-900/50 px-1.5 py-0.5 rounded">
          v1.0
        </span>
      </div>
    </aside>
  );
}
