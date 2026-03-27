import type { ParseError } from '../types';

interface ErrorViewerProps {
  parseError: ParseError;
}

export default function ErrorViewer({ parseError }: ErrorViewerProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
        Error sintáctico
      </p>
      {parseError.line != null && (
        <p className="mt-1 font-mono text-xs text-red-400">
          Línea {parseError.line}
          {parseError.column != null ? `, columna ${parseError.column}` : ''}
        </p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-red-700">{parseError.message}</p>
      <p className="mt-3 text-xs leading-relaxed text-red-500">
        El parser detectó un token inesperado en ese punto y detuvo el análisis.
        El árbol de abajo muestra lo que se pudo construir antes del error;
        los nodos <span className="font-semibold">⚠ Error</span> son los lugares donde el parser recurrió a recuperación.
      </p>
    </div>
  );
}
