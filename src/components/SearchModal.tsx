"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import type { DocMeta } from "@/lib/markdown";

interface SearchModalProps {
  docs: DocMeta[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ docs, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery("");
    }
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const results = normalizedQuery
    ? docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(normalizedQuery) ||
          doc.description?.toLowerCase().includes(normalizedQuery) ||
          doc.categoryTitle.toLowerCase().includes(normalizedQuery) ||
          doc.tags?.some((t) => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj artykułów, pojęć, tagów... (np. ISTQB, async, SOLID)"
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 divide-y divide-slate-800/60 flex-1">
          {query.trim() === "" ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              Wpisz zapytanie, aby przeszukać bazę wiedzy...
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              Brak artykułów pasujących do <span className="text-slate-300 font-semibold">&quot;{query}&quot;</span>
            </div>
          ) : (
            results.map((doc) => (
              <Link
                key={`${doc.category}/${doc.slug}`}
                href={`/docs/${doc.category}/${doc.slug}`}
                onClick={onClose}
                className="group flex items-start justify-between p-3 rounded-lg hover:bg-slate-800/70 transition-colors"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/40">
                      {doc.categoryTitle}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                      {doc.title}
                    </h4>
                  </div>
                  {doc.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {doc.description}
                    </p>
                  )}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      <Tag className="w-3 h-3 text-slate-500" />
                      <span className="text-[11px] text-slate-500">
                        {doc.tags.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </Link>
            ))
          )}
        </div>

        {/* Modal footer */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between items-center">
          <span>{results.length} wyników</span>
          <span>Naciśnij ESC lub kliknij poza oknem, aby zamknąć</span>
        </div>
      </div>
    </div>
  );
}
