/* eslint-disable @typescript-eslint/no-explicit-any */
import * as acorn from 'acorn';
import type { ASTNode, ParseError } from '../types';

// Traducciones de roles ESTree → español
const ROLE_ES: Record<string, string> = {
  test: 'condición',
  consequent: 'bloque si-verdadero',
  alternate: 'bloque si-falso',
  body: 'cuerpo',
  left: 'izquierda',
  right: 'derecha',
  callee: 'función',
  object: 'objeto',
  property: 'propiedad',
  init: 'inicialización',
  update: 'actualización',
  argument: 'operando',
  id: 'nombre',
  key: 'clave',
  value: 'valor',
  expression: 'expresión',
};

function translateRole(role: string): string {
  if (ROLE_ES[role]) return ROLE_ES[role];
  // Patrones dinámicos: arguments[0], param[1], [2]
  const argMatch = role.match(/^arguments\[(\d+)\]$/);
  if (argMatch) return `argumento ${Number(argMatch[1]) + 1}`;
  const paramMatch = role.match(/^param\[(\d+)\]$/);
  if (paramMatch) return `parámetro ${Number(paramMatch[1]) + 1}`;
  const elemMatch = role.match(/^\[(\d+)\]$/);
  if (elemMatch) return `elemento [${elemMatch[1]}]`;
  return role;
}

function convertNode(node: any, role?: string): ASTNode {
  if (!node || typeof node !== 'object' || !node.type) return { type: 'Desconocido' };

  const base: ASTNode = { type: node.type };
  if (role) base.role = translateRole(role);

  switch (node.type) {
    case 'Program':
      base.children = node.body.map((n: any) => convertNode(n));
      break;

    case 'IfStatement':
      base.children = [
        convertNode(node.test, 'test'),
        convertNode(node.consequent, 'consequent'),
        ...(node.alternate ? [convertNode(node.alternate, 'alternate')] : []),
      ];
      break;

    case 'WhileStatement':
    case 'DoWhileStatement':
      base.children = [
        convertNode(node.test, 'test'),
        convertNode(node.body, 'body'),
      ];
      break;

    case 'ForStatement':
      base.children = [
        ...(node.init ? [convertNode(node.init, 'init')] : []),
        ...(node.test ? [convertNode(node.test, 'test')] : []),
        ...(node.update ? [convertNode(node.update, 'update')] : []),
        convertNode(node.body, 'body'),
      ];
      break;

    case 'ForInStatement':
    case 'ForOfStatement':
      base.children = [
        convertNode(node.left, 'left'),
        convertNode(node.right, 'right'),
        convertNode(node.body, 'body'),
      ];
      break;

    case 'BlockStatement':
      base.children = node.body.map((n: any) => convertNode(n));
      break;

    case 'ExpressionStatement':
      base.children = [convertNode(node.expression, 'expression')];
      break;

    case 'BinaryExpression':
    case 'LogicalExpression':
      base.operator = node.operator;
      base.children = [
        convertNode(node.left, 'left'),
        convertNode(node.right, 'right'),
      ];
      break;

    case 'AssignmentExpression':
      base.operator = node.operator;
      base.children = [
        convertNode(node.left, 'left'),
        convertNode(node.right, 'right'),
      ];
      break;

    case 'CallExpression':
      base.children = [
        convertNode(node.callee, 'callee'),
        ...node.arguments.map((a: any, i: number) => convertNode(a, `arguments[${i}]`)),
      ];
      break;

    case 'MemberExpression':
      base.children = [
        convertNode(node.object, 'object'),
        convertNode(node.property, 'property'),
      ];
      break;

    case 'Identifier':
      base.value = node.name;
      break;

    case 'Literal':
      base.value = String(node.value);
      // Refinar el tipo para mayor claridad didáctica
      if (typeof node.value === 'number') base.type = 'NumericLiteral';
      else if (typeof node.value === 'string') base.type = 'StringLiteral';
      else if (typeof node.value === 'boolean') base.type = 'BooleanLiteral';
      break;

    case 'VariableDeclaration':
      base.operator = node.kind; // let / const / var
      base.children = node.declarations.map((d: any) => convertNode(d));
      break;

    case 'VariableDeclarator':
      base.children = [
        convertNode(node.id, 'id'),
        ...(node.init ? [convertNode(node.init, 'init')] : []),
      ];
      break;

    case 'FunctionDeclaration':
    case 'FunctionExpression':
      if (node.id) base.value = node.id.name;
      base.children = [
        ...node.params.map((p: any, i: number) => convertNode(p, `param[${i}]`)),
        convertNode(node.body, 'body'),
      ];
      break;

    case 'ArrowFunctionExpression':
      base.children = [
        ...node.params.map((p: any, i: number) => convertNode(p, `param[${i}]`)),
        convertNode(node.body, 'body'),
      ];
      break;

    case 'ReturnStatement':
      if (node.argument) base.children = [convertNode(node.argument, 'argument')];
      break;

    case 'UnaryExpression':
      base.operator = node.operator;
      base.children = [convertNode(node.argument, 'argument')];
      break;

    case 'UpdateExpression':
      base.operator = node.prefix ? `${node.operator}x` : `x${node.operator}`;
      base.children = [convertNode(node.argument, 'argument')];
      break;

    case 'ConditionalExpression':
      base.children = [
        convertNode(node.test, 'test'),
        convertNode(node.consequent, 'consequent'),
        convertNode(node.alternate, 'alternate'),
      ];
      break;

    case 'ArrayExpression':
      base.children = (node.elements as any[])
        .filter(Boolean)
        .map((e: any, i: number) => convertNode(e, `[${i}]`));
      break;

    case 'ObjectExpression':
      base.children = node.properties.map((p: any) => convertNode(p));
      break;

    case 'Property':
      base.children = [
        convertNode(node.key, 'key'),
        convertNode(node.value, 'value'),
      ];
      break;

    case 'SpreadElement':
    case 'RestElement':
      base.children = [convertNode(node.argument, 'argument')];
      break;

    case 'TemplateLiteral':
      base.type = 'StringLiteral';
      base.value = '`template`';
      break;

    default:
      break;
  }

  return base;
}

export interface ParseSuccess {
  ast: ASTNode;
  error: null;
}

export interface ParseFailure {
  ast: null;
  error: ParseError;
}

export type ParseResult = ParseSuccess | ParseFailure;

export function parseCode(code: string): ParseResult {
  const trimmed = code.trim();
  if (!trimmed) {
    return { ast: null, error: { message: 'El editor está vacío.' } };
  }
  try {
    const rawAST = acorn.parse(trimmed, {
      ecmaVersion: 2020,
      sourceType: 'script',
    });
    return { ast: convertNode(rawAST), error: null };
  } catch (e: unknown) {
    const err = e as { message?: string; loc?: { line: number; column: number } };
    return {
      ast: null,
      error: {
        message: err.message ?? 'Error de sintaxis desconocido.',
        line: err.loc?.line,
        column: err.loc?.column,
      },
    };
  }
}
