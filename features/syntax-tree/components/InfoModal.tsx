'use client';

import { useEffect } from 'react';

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="sticky top-0 flex items-center justify-between border-b border-zinc-100 bg-white px-6 py-4">
          <h2 className="text-base font-semibold text-zinc-900">Sobre esta herramienta</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Cerrar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 0 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 0 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94 4.28 3.22Z" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">

          {/* Sección 1 */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">¿Qué es un árbol sintáctico?</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              Un <strong>árbol sintáctico abstracto (AST)</strong> es la representación jerárquica
              de la estructura gramatical de un programa. Cada nodo del árbol representa una
              construcción del lenguaje: sentencias, expresiones, operadores, valores...
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              El árbol es <em>abstracto</em> porque omite detalles superficiales del texto
              (espacios, paréntesis de agrupación) y conserva solo la estructura lógica.
            </p>
          </section>

          {/* Sección 2 */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">¿Cómo funciona el analizador sintáctico?</h3>
            <p className="text-sm leading-relaxed text-zinc-600">
              El <strong>analizador sintáctico (parser)</strong> recibe los tokens producidos
              por el analizador léxico y los compara con una gramática formal. Sigue la
              estructura de las reglas para construir el árbol nodo a nodo.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Cuando encuentra un token que no coincide con lo que la gramática espera,
              en ese punto exacto lanza un <strong>error sintáctico</strong> e interrumpe
              la construcción del árbol.
            </p>
          </section>

          {/* Sección 3 */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">Cómo usar esta herramienta</h3>
            <ul className="space-y-1.5 text-sm text-zinc-600">
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Selecciona un ejemplo de los botones superiores para pre-cargar código en el editor.</li>
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Edita libremente el código en el panel izquierdo — el árbol se actualiza en tiempo real.</li>
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Los ejemplos inválidos muestran el <strong>árbol parcial</strong> y una explicación de cómo el parser detectó el error.</li>
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Escribe código propio (JavaScript) y observa cómo el parser lo interpreta.</li>
            </ul>
          </section>

          {/* Sección 4: colores */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Significado de los colores</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { color: 'bg-zinc-100 border-zinc-400 text-zinc-700', label: 'Gris', desc: 'Nodo raíz (Programa)' },
                { color: 'bg-blue-50 border-blue-400 text-blue-700', label: 'Azul', desc: 'Estructuras de control (if, while, for…)' },
                { color: 'bg-violet-50 border-violet-400 text-violet-700', label: 'Violeta', desc: 'Expresiones (operaciones, llamadas, accesos)' },
                { color: 'bg-emerald-50 border-emerald-400 text-emerald-700', label: 'Verde', desc: 'Literales (números, cadenas, booleanos)' },
                { color: 'bg-amber-50 border-amber-400 text-amber-700', label: 'Ámbar', desc: 'Identificadores (nombres de variables)' },
                { color: 'bg-red-50 border-red-400 text-red-700', label: 'Rojo', desc: 'Nodo de error (árbol parcial)' },
              ].map(({ color, label, desc }) => (
                <div key={label} className="flex items-start gap-2">
                  <span className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-xs font-semibold ${color}`}>
                    {label}
                  </span>
                  <span className="text-xs text-zinc-500">{desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sección 5: leer el árbol */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">Cómo leer el árbol</h3>
            <ul className="space-y-1.5 text-sm text-zinc-600">
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>El nodo raíz <strong>Programa</strong> contiene todas las sentencias del archivo.</li>
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Cada nodo padre <em>contiene</em> a sus nodos hijos (subexpresiones o subsentencias).</li>
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Las etiquetas en gris (ej. <em>condición →</em>) indican el <strong>rol semántico</strong> del nodo dentro de su padre.</li>
              <li className="flex gap-2"><span className="mt-0.5 shrink-0 text-zinc-400">›</span>Los operadores aparecen directamente en el nodo de expresión (ej. <code className="rounded bg-zinc-100 px-1 font-mono text-xs">&gt;=</code>).</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
