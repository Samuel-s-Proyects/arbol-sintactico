'use client';

import { useState, useEffect } from 'react';
import { EXAMPLES } from './data/examples';
import { parseCode, type ParseResult } from './utils/parser';
import type { SyntaxExample } from './types';
import ExampleSelector from './components/ExampleSelector';
import CodePanel from './components/CodePanel';
import TreeViewer from './components/TreeViewer';
import InfoModal from './components/InfoModal';

export default function SyntaxTreeExplorer() {
  const [selectedId, setSelectedId] = useState<string>(EXAMPLES[0].id);
  const [code, setCode] = useState<string>(EXAMPLES[0].code);
  // parseResult: parseo último ejecutado (inicializado sincronamente con el primer ejemplo)
  const [parseResult, setParseResult] = useState<ParseResult | null>(
    () => parseCode(EXAMPLES[0].code)
  );
  // parsedCode: último código ya procesado por el parser
  const [parsedCode, setParsedCode] = useState<string>(EXAMPLES[0].code);
  const [showModal, setShowModal] = useState(false);

  const activeExample: SyntaxExample | null =
    EXAMPLES.find((e) => e.id === selectedId) ?? null;

  const isExactMatch =
    activeExample !== null && code.trim() === activeExample.code.trim();

  const skipParse = isExactMatch && activeExample !== null && !activeExample.isValid;

  // isParsing: hay código pendiente de procesar (derivado, no estado)
  const isParsing = !skipParse && code.trim() !== '' && code !== parsedCode;

  // El resultado efectivo a mostrar
  const effectiveResult = skipParse ? null : parseResult;

  // Debounce: sólo llama setState dentro del callback del timer (asíncrono)
  useEffect(() => {
    if (skipParse || !code.trim()) return;
    const timer = setTimeout(() => {
      setParseResult(parseCode(code));
      setParsedCode(code);
    }, 350);
    return () => clearTimeout(timer);
  }, [code, skipParse]);

  function handleSelectExample(id: string) {
    const example = EXAMPLES.find((e) => e.id === id);
    if (example) {
      setSelectedId(id);
      setCode(example.code);
      setParsedCode(''); // fuerza re-parseo en el efecto
      setParseResult(null); // limpia resultado anterior (llamada en event handler, OK)
    }
  }

  const description = activeExample?.description ?? null;

  return (
    <>
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}

      {/* Cabecera minimalista */}
      <header className="border-b border-zinc-100 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-zinc-900">Árbol Sintáctico</h1>
            <p className="text-xs text-zinc-400">Samuel Escobar | 5190-23-1952</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700"
          >
            ¿Qué es esto?
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">

        {/* Selector de ejemplos */}
        <div className="mb-5 flex flex-col gap-2">
          <p className="text-xs text-zinc-400">Ejemplos</p>
          <ExampleSelector
            examples={EXAMPLES}
            selectedId={selectedId}
            onSelect={handleSelectExample}
          />
        </div>

        {/* Descripción del ejemplo activo */}
        {description && (
          <p className="mb-5 text-sm text-zinc-500">{description}</p>
        )}

        {/* Panel principal: código + árbol */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Panel izquierdo: editor de código */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-zinc-400">Código fuente</p>
            <CodePanel
              value={code}
              onChange={setCode}
              placeholder="Escribe código JavaScript aquí…"
            />
            <p className="mt-1.5 text-xs text-zinc-300">
              Puedes editar el código libremente — el árbol se actualiza en tiempo real.
            </p>
          </div>

          {/* Panel derecho: árbol */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-zinc-400">
              {skipParse ? 'Árbol parcial (error)' : 'Árbol sintáctico'}
            </p>
            <TreeViewer
              parseResult={effectiveResult}
              isParsing={isParsing}
              activeExample={activeExample}
              isExactMatch={isExactMatch}
            />
          </div>

        </div>
      </div>
    </>
  );
}

