'use client';

import { useState, useEffect } from 'react';
import { EXAMPLES } from './data/examples';
import { parseCode, type ParseResult } from './utils/parser';
import ExampleSelector from './components/ExampleSelector';
import CodePanel from './components/CodePanel';
import TreeViewer from './components/TreeViewer';
import InfoModal from './components/InfoModal';

export default function SyntaxTreeExplorer() {
  const [selectedId, setSelectedId] = useState<string>(EXAMPLES[0].id);
  const [code, setCode] = useState<string>(EXAMPLES[0].code);
  const [parseResult, setParseResult] = useState<ParseResult | null>(
    () => parseCode(EXAMPLES[0].code)
  );
  const [parsedCode, setParsedCode] = useState<string>(EXAMPLES[0].code);
  const [showModal, setShowModal] = useState(false);

  const activeExample = EXAMPLES.find((e) => e.id === selectedId) ?? null;
  const isParsing = code.trim() !== '' && code !== parsedCode;

  useEffect(() => {
    if (!code.trim()) return;
    const timer = setTimeout(() => {
      setParseResult(parseCode(code));
      setParsedCode(code);
    }, 350);
    return () => clearTimeout(timer);
  }, [code]);

  function handleSelectExample(id: string) {
    const example = EXAMPLES.find((e) => e.id === id);
    if (example) {
      setSelectedId(id);
      setCode(example.code);
      setParsedCode('');
      setParseResult(null);
    }
  }

  function handleCodeChange(newCode: string) {
    setCode(newCode);
    if (!newCode.trim()) {
      setParseResult(null);
      setParsedCode('');
    }
  }

  const hasError = parseResult?.error != null;

  return (
    <>
      {showModal && <InfoModal onClose={() => setShowModal(false)} />}

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

        <div className="mb-5 flex flex-col gap-2">
          <p className="text-xs text-zinc-400">Ejemplos</p>
          <ExampleSelector
            examples={EXAMPLES}
            selectedId={selectedId}
            onSelect={handleSelectExample}
          />
        </div>

        {activeExample?.description && (
          <p className="mb-5 text-sm text-zinc-500">{activeExample.description}</p>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          <div>
            <p className="mb-1.5 text-xs font-medium text-zinc-400">Código fuente</p>
            <CodePanel
              value={code}
              onChange={handleCodeChange}
              placeholder="Escribe código JavaScript aquí…"
            />
            <p className="mt-1.5 text-xs text-zinc-300">
              Puedes editar el código libremente — el árbol se actualiza en tiempo real.
            </p>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-zinc-400">
              {hasError ? 'Árbol parcial (recuperación de errores)' : 'Árbol sintáctico'}
            </p>
            <TreeViewer parseResult={parseResult} isParsing={isParsing} />
          </div>

        </div>
      </div>
    </>
  );
}

