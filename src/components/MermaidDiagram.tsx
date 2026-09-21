"use client";

import React, { useEffect, useState, useId, useRef } from "react";
import { Workflow, Code2, Eye, Copy, Check, AlertCircle } from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const rawId = useId();
  const safeId = "mermaid-" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const renderIndexRef = useRef(0);

  useEffect(() => {
    let isCancelled = false;
    renderIndexRef.current += 1;
    const currentRender = renderIndexRef.current;

    async function renderMermaid() {
      try {
        setIsLoading(true);
        setError(null);

        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            darkMode: true,
            background: "transparent",
            mainBkg: "#1e293b",
            nodeBorder: "#3b82f6",
            lineColor: "#60a5fa",
            primaryColor: "#1e293b",
            primaryTextColor: "#f1f5f9",
            primaryBorderColor: "#3b82f6",
            secondaryColor: "#0f172a",
            secondaryTextColor: "#f1f5f9",
            secondaryBorderColor: "#6366f1",
            tertiaryColor: "#1e1b4b",
            tertiaryTextColor: "#f1f5f9",
            tertiaryBorderColor: "#818cf8",
            edgeLabelBackground: "#0f172a",
            clusterBkg: "#0f172a",
            clusterBorder: "#334155",
            titleColor: "#93c5fd",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          },
        });

        const elementId = `${safeId}-${currentRender}`;
        const cleanChart = chart.trim();

        // Render diagram
        const { svg: renderedSvg } = await mermaid.render(elementId, cleanChart);

        if (!isCancelled) {
          setSvg(renderedSvg);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          console.error("Błąd podczas renderowania diagramu Mermaid:", err);
          const message =
            err instanceof Error
              ? err.message
              : "Nie udało się sparsować składni diagramu Mermaid.";
          setError(message);
          setIsLoading(false);
        }
      }
    }

    renderMermaid();

    return () => {
      isCancelled = true;
      // Clean up any temporary DOM nodes mermaid might have appended if error occurred
      const tempElement = document.getElementById(`${safeId}-${currentRender}`);
      if (tempElement) {
        tempElement.remove();
      }
      const dElement = document.getElementById(`d${safeId}-${currentRender}`);
      if (dElement) {
        dElement.remove();
      }
    };
  }, [chart, safeId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <div className="relative group my-8 rounded-xl overflow-hidden border border-slate-800 bg-[#0c101a] shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="flex items-center gap-1.5 ml-2 text-blue-400 font-semibold tracking-wide uppercase text-[11px]">
            <Workflow className="w-3.5 h-3.5" />
            <span>Diagram / Flowchart</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle between preview and raw code */}
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
            title={showCode ? "Pokaż wyrenderowany diagram" : "Pokaż kod Mermaid"}
          >
            {showCode ? (
              <>
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Diagram</span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Kod Mermaid</span>
              </>
            )}
          </button>

          {/* Copy code button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Kopiuj kod diagramu"
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
      </div>

      {/* Main Content Area */}
      {showCode ? (
        <div className="p-4 bg-slate-950/80 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed border-t border-slate-900">
          <pre className="!bg-transparent !p-0 !m-0">
            <code>{chart.trim()}</code>
          </pre>
        </div>
      ) : error ? (
        <div className="p-6 text-center space-y-3 bg-red-950/20">
          <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Wystąpił problem z wyrenderowaniem diagramu</span>
          </div>
          <p className="text-xs text-slate-400 font-mono max-w-xl mx-auto line-clamp-2">
            {error}
          </p>
          <div className="pt-2 text-left">
            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
              <code>{chart.trim()}</code>
            </pre>
          </div>
        </div>
      ) : isLoading ? (
        <div className="py-14 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <span>Generowanie widoku diagramu...</span>
        </div>
      ) : (
        <div
          className="p-6 sm:p-8 overflow-x-auto flex justify-center items-center bg-[#070a12] min-h-[140px] [&_svg]:max-w-full [&_svg]:h-auto select-none"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
