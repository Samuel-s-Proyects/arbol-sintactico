import type { ASTNode, ParseError } from '../types';
import TreeNode from './TreeNode';

interface ErrorViewerProps {
  /** Error de acorn (para código de usuario) */
  parseError?: ParseError | null;
  /** Árbol parcial del ejemplo (para ejemplos inválidos precargados) */
  partialAST?: ASTNode;
  /** Explicación didáctica paso a paso */
  errorExplanation?: string;
}

export default function ErrorViewer({ parseError, partialAST, errorExplanation }: ErrorViewerProps) {
  const hasPartialTree = Boolean(partialAST);
  const hasExplanation = Boolean(errorExplanation);

  return (
    <div className="space-y-4">

      {/* Banner de error */}
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
          Error sintáctico
        </p>
        {parseError && (
          <>
            {(parseError.line != null) && (
              <p className="mt-1 font-mono text-xs text-red-400">
                Línea {parseError.line}
                {parseError.column != null ? `, columna ${parseError.column}` : ''}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-red-700">
              {parseError.message}
            </p>
          </>
        )}
        {!parseError && (
          <p className="mt-1 text-sm text-red-600">
            El analizador detectó un error antes de completar el árbol.
          </p>
        )}
      </div>

      {/* Árbol parcial */}
      {hasPartialTree && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Árbol parcial construido
          </p>
          <div className="overflow-auto rounded-lg border border-zinc-200 bg-white p-4">
            <p className="mb-3 text-xs text-zinc-400 italic">
              Lo que el analizador logró parsear antes de encontrar el error:
            </p>
            <TreeNode node={partialAST!} isRoot />
          </div>
        </div>
      )}

      {/* Explicación didáctica */}
      {hasExplanation && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            ¿Cómo lo detectó el analizador?
          </p>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-600">
              {errorExplanation}
            </pre>
          </div>
        </div>
      )}

      {/* Explicación genérica cuando no hay datos del ejemplo */}
      {!hasPartialTree && !hasExplanation && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="mb-1 text-xs font-semibold text-zinc-500">¿Por qué no hay árbol?</p>
          <p className="text-sm leading-relaxed text-zinc-600">
            El analizador sintáctico construye el árbol nodo a nodo. En el momento
            en que encontró un token inesperado, la estructura quedó incompleta y
            no se puede representar como árbol. Corrige el error en el editor y el
            árbol se regenerará automáticamente.
          </p>
        </div>
      )}

    </div>
  );
}
