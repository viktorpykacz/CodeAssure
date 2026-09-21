"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import dynamic from "next/dynamic";
import CodeBlock from "./CodeBlock";

const MermaidDiagram = dynamic(() => import("./MermaidDiagram"), {
  ssr: false,
  loading: () => (
    <div className="my-8 rounded-xl border border-slate-800 bg-[#0c101a] p-8 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs">
      <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      <span>Ładowanie diagramu...</span>
    </div>
  ),
});

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText(
      (node as { props: { children?: React.ReactNode } }).props.children
    );
  }
  return "";
}

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-blue max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-slate-100 prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:tracking-tight prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-800/80 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-strong:text-slate-100 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-950/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300 prose-blockquote:not-italic">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Code & pre customization
          pre({ children }) {
            // Let the pre just pass children so our custom code component handles the wrapping
            return <>{children}</>;
          },
          code({ className, children, ...props }) {
            const isInline = !className && typeof children === "string" && !children.includes("\n");
            
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 font-mono text-xs border border-slate-700/60 font-medium"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            if (language === "mermaid") {
              const chartText = extractText(children);
              return <MermaidDiagram chart={chartText} />;
            }

            return (
              <CodeBlock className={className}>
                <pre className="!bg-transparent !p-0 !m-0">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </CodeBlock>
            );
          },

          // Table customization for responsive display
          table({ children }) {
            return (
              <div className="my-6 w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
                <table className="w-full text-left border-collapse text-sm">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-slate-800/70 border-b border-slate-700 text-slate-200 font-semibold">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-200">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-3 border-b border-slate-800/80 text-slate-300">
                {children}
              </td>
            );
          },

          // Heading anchor IDs
          h2({ children }) {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h2 id={id} className="group relative flex items-center">
                <a
                  href={`#${id}`}
                  className="no-underline text-slate-100 hover:text-blue-400 transition-colors"
                >
                  {children}
                </a>
                <span className="ml-2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity text-base">
                  #
                </span>
              </h2>
            );
          },
          h3({ children }) {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h3 id={id} className="group relative flex items-center">
                <a
                  href={`#${id}`}
                  className="no-underline text-slate-100 hover:text-blue-400 transition-colors"
                >
                  {children}
                </a>
                <span className="ml-2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity text-base">
                  #
                </span>
              </h3>
            );
          },

          // Links
          a({ href, children }) {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-blue-400 font-medium hover:text-blue-300 underline decoration-blue-500/40 hover:decoration-blue-400 transition-colors"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
