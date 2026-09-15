import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Code2,
  Sparkles,
  FileCode2,
} from "lucide-react";
import { getAllCategories, getAllDocs } from "@/lib/markdown";
import CategoryCard from "@/components/CategoryCard";

export default async function HomePage() {
  const categories = await getAllCategories();
  const allDocs = await getAllDocs();

  const totalDocs = allDocs.length;
  const totalCategories = categories.length;

  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800/80 bg-gradient-to-b from-blue-950/20 via-slate-900/30 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lokalna Baza Wiedzy & Dokumentacja</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight sm:leading-tight">
            Architektura wiedzy dla{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              QA & Inżynierów .NET
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Czytaj i eksploruj lokalne pliki Markdown z pełnym wsparciem dla Frontmatter,
            podświetlania składni kodu, dynamicznej nawigacji oraz pytań rekrutacyjnych.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Przeglądaj Dokumentację</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all"
            >
              <span>Zobacz Kategorie</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-8 border-t border-slate-800/60">
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl font-extrabold text-blue-400 font-mono">
                {totalCategories}
              </span>
              <span className="text-xs text-slate-400 mt-1">Kategorie</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl font-extrabold text-indigo-400 font-mono">
                {totalDocs}
              </span>
              <span className="text-xs text-slate-400 mt-1">Artykułów Markdown</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                100%
              </span>
              <span className="text-xs text-slate-400 mt-1">Lokalnie & Offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section id="categories" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Kategorie Tematyczne
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Wybierz kategorię, aby zgłębić uporządkowane materiały szkoleniowe i techniczne.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Katalog źródłowy: <code className="text-slate-400">/content</code>
          </span>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Standardy QA & ISTQB
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zasady inżynierii testów, piramida Mike&apos;a Cohna, poziomy i strategie weryfikacji oprogramowania.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-400 shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Architektura .NET & C#
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Głęboka analiza async/await, zarządzania pamięcią CLR, wzorców projektowych i nowoczesnego C#.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 shrink-0">
                <FileCode2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Dynamiczny Silnik Markdown
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bezpośredni odczyt plików z dysku za pomocą Next.js Server Components, bez zbędnych baz danych.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
