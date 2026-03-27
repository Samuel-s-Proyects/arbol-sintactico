import type { ASTNode } from '../types';
import type { ParseResult } from '../utils/parser';
import TreeNode from './TreeNode';
import ErrorViewer from './ErrorViewer';
import TreeLegend from './TreeLegend';
import type { SyntaxExample } from '../types';

interface TreeViewerProps {
  parseResult: ParseResult | null;
  isParsing: boolean;
  /** Ejemplo activo: provee partialAST y errorExplanation para inválidos */
  activeExample: SyntaxExample | null;
  /** Si el código actual coincide exactamente con el del ejemplo */
  isExactMatch: boolean;
}

export default function TreeViewer({
  parseResult,
  isParsing,
  activeExample,
  isExactMatch,
}: TreeViewerProps) {
  const showPartialTree =
    isExactMatch &&
    activeExample !== null &&
    !activeExample.isValid &&
    Boolean(activeExample.partialAST);

  const tree: ASTNode | null = showPartialTree
    ? (activeExample!.partialAST ?? null)
    : (parseResult?.ast ?? null);

  const parseError = showPartialTree ? null : (parseResult?.error ?? null);

  return (
    <div className="space-y-3">
      {/* Estado: analizando */}
      {isParsing && !showPartialTree && (
        <div className="flex min-h-40 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
          <p className="text-xs text-zinc-400">Analizando código…</p>
        </div>
      )}

      {/* Árbol válido */}
      {!isParsing && tree && !showPartialTree && (
        <div className="overflow-auto rounded-lg border border-zinc-200 bg-white p-4">
          <TreeNode node={tree} isRoot />
        </div>
      )}

      {/* Árbol parcial de error de ejemplo */}
      {showPartialTree && (
        <ErrorViewer
          partialAST={activeExample!.partialAST}
          errorExplanation={activeExample!.errorExplanation}
        />
      )}

      {/* Error de código de usuario */}
      {!isParsing && !showPartialTree && parseError && (
        <ErrorViewer parseError={parseError} />
      )}

      {/* Estado vacío */}
      {!isParsing && !tree && !parseError && !showPartialTree && (
        <div className="flex min-h-40 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
          <p className="text-xs text-zinc-400">Escribe código para ver el árbol.</p>
        </div>
      )}

      {/* Guía de interpretación (solo cuando hay árbol ) */}
      {(tree || showPartialTree) && <TreeLegend />}
    </div>
  );
}
