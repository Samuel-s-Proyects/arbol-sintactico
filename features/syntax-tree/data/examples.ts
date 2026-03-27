import type { SyntaxExample } from '../types';

/*
 * Ejemplos didácticos.
 */

export const EXAMPLES: SyntaxExample[] = [

  // ─── PAR 1: sentencia if ─────────────────────────────────────────────────────

  {
    id: 'if-valid',
    title: 'if — válido',
    description: 'Sentencia if con condición binaria (>=) y una llamada a console.log en el bloque de ejecución.',
    code: 'if (edad >= 18) {\n  console.log("Eres mayor de edad");\n}',
    isValid: true,
  },

  {
    id: 'if-invalid',
    title: 'if — inválido',
    description: 'Sentencia if con dos paréntesis de apertura pero solo uno de cierre en la condición.',
    code: 'if ((edad >= 18) {\n  console.log("Eres mayor de edad");\n}',
    isValid: false,
  },

  // ─── PAR 2: sentencia while ───────────────────────────────────────────

  {
    id: 'while-valid',
    title: 'while — válido',
    description: 'Sentencia while con acumulador (suma) y contador (i). Contiene dos AssignmentExpression anidadas.',
    code: 'while (i < 10) {\n  suma = suma + i;\n  i = i + 1;\n}',
    isValid: true,
  },

  {
    id: 'while-invalid',
    title: 'while — inválido',
    description: 'Sentencia while sin paréntesis en la condición. Error común al olvidar la sintaxis obligatoria.',
    code: 'while i < 10 {\n  suma = suma + i;\n  i = i + 1;\n}',
    isValid: false,
  },

  // ─── PAR 3: declaración de variable ────────────────────────────────────

  {
    id: 'var-valid',
    title: 'variable — válida',
    description: 'Declaración de variable con const e inicialización mediante una expresión aritmética.',
    code: 'const total = precio * cantidad;',
    isValid: true,
  },

  {
    id: 'var-invalid',
    title: 'variable — inválida',
    description: 'Declaración de variable sin el nombre (identificador) después de "const".',
    code: 'const = precio * cantidad;',
    isValid: false,
  },

];


