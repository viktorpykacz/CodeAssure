"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Search, BookOpen } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import SearchModal from "./SearchModal";
import type { CategoryInfo, DocMeta } from "@/lib/markdown";

interface NavbarProps {
  categories: CategoryInfo[];
  allDocs: DocMeta[];
  showMobileSidebarToggle?: boolean;
}

export default function Navbar({
  categories,
  allDocs,
  showMobileSidebarToggle = true,
}: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left section: Mobile menu + Brand */}
          <div className="flex items-center gap-3">
            {showMobileSidebarToggle && (
              <MobileSidebar categories={categories} />
            )}

            <Link
              href="/"
              className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  CodeAssure
                  <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-400 border border-blue-700/50">
                    Docs
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  QA & .NET Knowledge Base
                </span>
              </div>
            </Link>
          </div>

          {/* Middle section: Search Bar trigger */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300 transition-all cursor-pointer shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-500" />
                <span>Przeszukaj bazę wiedzy...</span>
              </div>
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800/80 text-slate-400 rounded border border-slate-700/60">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right section: Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile search trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Szukaj"
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/docs"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Dokumentacja</span>
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="GitHub Repository"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Quick search modal */}
      <SearchModal
        docs={allDocs}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
