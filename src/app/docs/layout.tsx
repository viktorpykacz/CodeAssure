import React from "react";
import Sidebar from "@/components/Sidebar";
import { getAllCategories } from "@/lib/markdown";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();

  return (
    <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden md:block w-64 lg:w-72 xl:w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        <Sidebar categories={categories} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {children}
      </div>
    </div>
  );
}
