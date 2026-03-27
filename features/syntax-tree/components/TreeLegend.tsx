'use client';

import { useState } from 'react';

const LEGEND_ITEMS = [
  { color: 'bg-zinc-100 border-zinc-400 text-zinc-700', label: 'Programa', desc: 'Nodo raíz. Representa todo el archivo de código.' },
  { color: 'bg-blue-50 border-blue-400 text-blue-700', label: 'Control', desc: 'Estructuras de control: Sentencia if, Sentencia while, Sentencia for…' },
  { color: 'bg-violet-50 border-violet-400 text-violet-700', label: 'Expresión', desc: 'Expresiones: Op. Binaria, Asignación, Llamada, Acceso a propiedad.' },
  { color: 'bg-emerald-50 border-emerald-400 text-emerald-700', label: 'Literal', desc: 'Valores concretos: Número, Cadena, Booleano.' },
  { color: 'bg-amber-50 border-amber-400 text-amber-700', label: 'Identificador', desc: 'Nombres de variables, funciones o propiedades.' },
  { color: 'bg-red-50 border-red-400 text-red-700', label: '⚠ Error', desc: 'Punto donde el analizador detuvo el análisis (árbol parcial).' },
];

const READING_TIPS = [
  'El nodo raíz Programa contiene todas las sentencias del archivo.',
  'Cada hijo de un nodo es una subexpresión o subestructura que lo compone.',
  'La etiqueta gris antes de "→" indica el rol semántico: condición, cuerpo, izquierda, derecha…',
  'Los operadores (+, -, >=, =…) aparecen dentro del nodo de expresión que los usa.',
  'Los nodos hoja (Identificador, Número, Cadena) no tienen hijos: son los valores finales.',
];

export default function TreeLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-zinc-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-1 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400 transition-colors hover:text-zinc-600"
      >
        <span>¿Cómo interpretar el árbol?</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="space-y-5 pb-4 pt-1">

          {/* Leyenda de colores */}
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">Colores de los nodos</p>
            <div className="space-y-2">
              {LEGEND_ITEMS.map(({ color, label, desc }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-xs font-semibold ${color}`}>
                    {label}
                  </span>
                  <span className="text-xs leading-relaxed text-zinc-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consejos de lectura */}
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">Cómo leer el árbol</p>
            <ul className="space-y-1.5">
              {READING_TIPS.map((tip) => (
                <li key={tip} className="flex gap-2 text-xs leading-relaxed text-zinc-500">
                  <span className="mt-0.5 shrink-0 text-zinc-300">›</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Diagrama de relaciones */}
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">Estructura del árbol</p>
            <pre className="rounded-lg bg-zinc-50 p-3 font-mono text-xs leading-relaxed text-zinc-500">
{`Programa
└── Sentencia if
      ├── condición → Expresión Binaria  >=
      │      ├── izquierda → Identificador  edad
      │      └── derecha  → Número  18
      └── bloque si-verdadero → Bloque
             └── Sentencia
                    └── Llamada  console.log
                           ├── función → Acceso  console.log
                           └── argumento 1 → Cadena  "Eres mayor de edad"`}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
}
