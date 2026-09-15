import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { getAllCategories, getAllDocs } from "@/lib/markdown";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeAssure | Portal Bazy Wiedzy i Dokumentacji",
  description: "Nowoczesna, lokalna baza wiedzy dla inżynierów QA, deweloperów .NET/C# oraz kandydatów na rozmowy rekrutacyjne.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getAllCategories();
  const allDocs = await getAllDocs();

  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 font-sans">
        <Navbar categories={categories} allDocs={allDocs} />
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Global footer */}
        <footer className="border-t border-slate-800/80 bg-[#080b12] py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">CodeAssure</span>
              <span>— Lokalny Portal Dokumentacji i Bazy Wiedzy</span>
            </div>
            <p>© {new Date().getFullYear()} CodeAssure. Built with Next.js, Tailwind CSS & React-Markdown.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
