import type { ParseResult } from '../utils/parser';
import TreeNode from './TreeNode';
import ErrorViewer from './ErrorViewer';
import TreeLegend from './TreeLegend';

interface TreeViewerProps {
  parseResult: ParseResult | null;
  isParsing: boolean;
}

export default function TreeViewer({ parseResult, isParsing }: TreeViewerProps) {
  const ast = parseResult?.ast ?? null;
  const error = parseResult?.error ?? null;

  // Analizando…
  if (isParsing) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
        <p className="text-xs text-zinc-400">Analizando código…</p>
      </div>
    );
  }

  // Editor vacío
  if (!parseResult) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
        <p className="text-xs text-zinc-400">Escribe código para ver el árbol.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Banner de error */}
      {error && <ErrorViewer parseError={error} />}

      {/* Árbol (completo o parcial) */}
      {ast && (
        <div className="overflow-auto rounded-lg border border-zinc-200 bg-white p-4">
          {error && (
            <p className="mb-3 text-xs italic text-zinc-400">
              Árbol parcial: lo que el analizador logró construir antes del error.
              Los nodos <span className="font-semibold text-red-400">⚠ Error</span> marcan dónde falló el parseo.
            </p>
          )}
          <TreeNode node={ast} isRoot />
        </div>
      )}

      {/* Guía de interpretación */}
      {ast && <TreeLegend />}
    </div>
  );
}
