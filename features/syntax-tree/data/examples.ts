import type { SyntaxExample } from '../types';

/*
 * Ejemplos didácticos para el visualizador de árboles sintácticos.
 *
 * ► Los ejemplos VÁLIDOS son parseados dinámicamente por acorn.
 *
 * ► Los ejemplos INVÁLIDOS incluyen:
 *   - partialAST:       árbol parcial construido ANTES del error, con un
 *                       nodo ErrorNode marcando el punto de falla.
 *   - errorExplanation: explicación paso a paso de cómo el analizador
 *                       detectó el error (fines didácticos).
 */

export const EXAMPLES: SyntaxExample[] = [

  // ─── PAR 1: sentencia if ──────────────────────────────────────────────────

  {
    id: 'if-valid',
    title: 'if — válido',
    description:
      'Sentencia if con condición binaria (>=) y una llamada a console.log en el bloque de ejecución.',
    code: 'if (edad >= 18) {\n  console.log("Eres mayor de edad");\n}',
    isValid: true,
  },

  {
    id: 'if-invalid',
    title: 'if — inválido',
    description:
      'Sentencia if con dos paréntesis de apertura pero solo uno de cierre en la condición.',
    code: 'if ((edad >= 18) {\n  console.log("Eres mayor de edad");\n}',
    isValid: false,
    partialAST: {
      type: 'Program',
      children: [
        {
          type: 'IfStatement',
          children: [
            {
              type: 'BinaryExpression',
              role: 'condición',
              operator: '>=',
              children: [
                { type: 'Identifier', role: 'izquierda', value: 'edad' },
                { type: 'NumericLiteral', role: 'derecha', value: 18 },
                {
                  type: 'ErrorNode',
                  role: 'cierre esperado',
                  isError: true,
                  errorInfo: {
                    found: '{ (llave de apertura)',
                    expected: ') para cerrar el ( extra de la condición',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    errorExplanation:
      'El analizador lee el código token a token siguiendo la gramática:\n\n' +
      '1. Lee "if"  →  espera "(" para abrir la condición. ✓\n' +
      '2. Lee "("   →  abre un nivel de paréntesis (nivel 1). ✓\n' +
      '3. Lee "("   →  abre otro nivel (nivel 2, el extra). ✓\n' +
      '4. Parsea "edad >= 18"  →  BinaryExpression completa. ✓\n' +
      '5. Lee ")"   →  cierra el nivel 2 interno. ✓\n' +
      '6. Debe cerrar el nivel 1 con ")". ✗\n' +
      '7. Encuentra "{"  en lugar de ")". ¡ERROR!\n\n' +
      'No se puede construir el árbol completo porque la condición del if quedó ' +
      '"abierta": la gramática exige que todo paréntesis que se abre deba cerrarse.',
  },

  // ─── PAR 2: sentencia while ───────────────────────────────────────────────

  {
    id: 'while-valid',
    title: 'while — válido',
    description:
      'Sentencia while con acumulador (suma) y contador (i). Contiene dos AssignmentExpression anidadas.',
    code: 'while (i < 10) {\n  suma = suma + i;\n  i = i + 1;\n}',
    isValid: true,
  },

  {
    id: 'while-invalid',
    title: 'while — inválido',
    description:
      'Sentencia while sin paréntesis en la condición. Error común al olvidar la sintaxis obligatoria.',
    code: 'while i < 10 {\n  suma = suma + i;\n  i = i + 1;\n}',
    isValid: false,
    partialAST: {
      type: 'Program',
      children: [
        {
          type: 'WhileStatement',
          children: [
            {
              type: 'ErrorNode',
              role: 'condición',
              isError: true,
              errorInfo: {
                found: 'i  (Identificador)',
                expected: '( para abrir la condición',
              },
            },
          ],
        },
      ],
    },
    errorExplanation:
      'El analizador lee el código token a token siguiendo la gramática:\n\n' +
      '1. Lee "while"  →  espera "(" para abrir la condición. ✗\n' +
      '2. Encuentra "i" (identificador) donde esperaba "(". ¡ERROR!\n\n' +
      'La gramática formal del while es:\n' +
      '   while  (  <expresión>  )  {  <cuerpo>  }\n\n' +
      'Los paréntesis son tokens terminales obligatorios. El analizador ' +
      'simplemente compara el token recibido con el que indica la gramática ' +
      'y, al no coincidir, detiene el análisis e informa el error.',
  },

  // ─── PAR 3: declaración de variable ──────────────────────────────────────

  {
    id: 'var-valid',
    title: 'variable — válida',
    description:
      'Declaración de variable con const e inicialización mediante una expresión aritmética.',
    code: 'const total = precio * cantidad;',
    isValid: true,
  },

  {
    id: 'var-invalid',
    title: 'variable — inválida',
    description:
      'Declaración de variable sin el nombre (identificador) después de "const".',
    code: 'const = precio * cantidad;',
    isValid: false,
    partialAST: {
      type: 'Program',
      children: [
        {
          type: 'VariableDeclaration',
          operator: 'const',
          children: [
            {
              type: 'ErrorNode',
              role: 'nombre de variable',
              isError: true,
              errorInfo: {
                found: '= (operador de asignación)',
                expected: 'identificador (nombre de la variable)',
              },
            },
          ],
        },
      ],
    },
    errorExplanation:
      'El analizador lee el código token a token siguiendo la gramática:\n\n' +
      '1. Lee "const"  →  espera el nombre de la variable (un identificador). ✗\n' +
      '2. Encuentra "=" donde esperaba un nombre. ¡ERROR!\n\n' +
      'La gramática de una declaración es:\n' +
      '   const  <identificador>  =  <expresión>  ;\n\n' +
      'Sin el nombre, el árbol no tiene dónde "anclar" el nodo declarador. ' +
      'El analizador no puede continuar: la estructura fundamental de la ' +
      'declaración está rota desde el inicio.',
  },

];

