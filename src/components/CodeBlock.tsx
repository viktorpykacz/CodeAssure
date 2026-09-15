"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g. "language-csharp" -> "csharp")
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  // Extract string code from children
  const getCodeString = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getCodeString).join("");
    if (node && typeof node === "object" && "props" in node) {
      return getCodeString(
        (node as { props: { children?: React.ReactNode } }).props.children
      );
    }
    return "";
  };

  const handleCopy = async () => {
    const codeText = getCodeString(children);
    if (!codeText) return;

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed
    }
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500/80" />
          {language && (
            <span className="ml-2 uppercase tracking-wider text-[11px] font-semibold text-blue-400">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Kopiuj kod"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Skopiowano</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Kopiuj</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto p-4 text-sm font-mono text-slate-100 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
