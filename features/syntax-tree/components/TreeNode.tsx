import type { ASTNode } from '../types';

const NODE_LABELS_ES: Record<string, string> = {
  Program: 'Programa',
  IfStatement: 'Sentencia if',
  WhileStatement: 'Sentencia while',
  ForStatement: 'Sentencia for',
  ForInStatement: 'Sentencia for-in',
  ForOfStatement: 'Sentencia for-of',
  DoWhileStatement: 'Sentencia do-while',
  BlockStatement: 'Bloque',
  ExpressionStatement: 'Sentencia',
  VariableDeclaration: 'Declaración',
  VariableDeclarator: 'Declarador',
  FunctionDeclaration: 'Función',
  FunctionExpression: 'Función anónima',
  ArrowFunctionExpression: 'Función flecha',
  ReturnStatement: 'Retorno',
  BinaryExpression: 'Op. Binaria',
  LogicalExpression: 'Op. Lógica',
  AssignmentExpression: 'Asignación',
  CallExpression: 'Llamada',
  MemberExpression: 'Acceso',
  UnaryExpression: 'Op. Unaria',
  UpdateExpression: 'Actualización',
  ConditionalExpression: 'Ternario',
  ArrayExpression: 'Arreglo',
  ObjectExpression: 'Objeto',
  Property: 'Propiedad',
  Identifier: 'Identificador',
  NumericLiteral: 'Número',
  StringLiteral: 'Cadena',
  BooleanLiteral: 'Booleano',
  Literal: 'Literal',
  SpreadElement: 'Spread',
  RestElement: 'Rest',
  ErrorNode: '⚠ Error',
};

const NODE_STYLES: Record<string, string> = {
  Program: 'bg-zinc-100 border-zinc-400 text-zinc-700',
  IfStatement: 'bg-blue-50 border-blue-400 text-blue-700',
  WhileStatement: 'bg-blue-50 border-blue-400 text-blue-700',
  ForStatement: 'bg-blue-50 border-blue-400 text-blue-700',
  ForInStatement: 'bg-blue-50 border-blue-400 text-blue-700',
  ForOfStatement: 'bg-blue-50 border-blue-400 text-blue-700',
  DoWhileStatement: 'bg-blue-50 border-blue-400 text-blue-700',
  BlockStatement: 'bg-blue-50 border-blue-300 text-blue-600',
  ExpressionStatement: 'bg-blue-50 border-blue-300 text-blue-600',
  VariableDeclaration: 'bg-blue-50 border-blue-400 text-blue-700',
  VariableDeclarator: 'bg-blue-50 border-blue-300 text-blue-600',
  FunctionDeclaration: 'bg-indigo-50 border-indigo-400 text-indigo-700',
  FunctionExpression: 'bg-indigo-50 border-indigo-400 text-indigo-700',
  ArrowFunctionExpression: 'bg-indigo-50 border-indigo-400 text-indigo-700',
  ReturnStatement: 'bg-indigo-50 border-indigo-300 text-indigo-600',
  BinaryExpression: 'bg-violet-50 border-violet-400 text-violet-700',
  LogicalExpression: 'bg-violet-50 border-violet-400 text-violet-700',
  AssignmentExpression: 'bg-violet-50 border-violet-400 text-violet-700',
  CallExpression: 'bg-violet-50 border-violet-400 text-violet-700',
  MemberExpression: 'bg-violet-50 border-violet-300 text-violet-600',
  UnaryExpression: 'bg-violet-50 border-violet-300 text-violet-600',
  UpdateExpression: 'bg-violet-50 border-violet-300 text-violet-600',
  ConditionalExpression: 'bg-violet-50 border-violet-400 text-violet-700',
  ArrayExpression: 'bg-violet-50 border-violet-300 text-violet-600',
  ObjectExpression: 'bg-violet-50 border-violet-300 text-violet-600',
  Property: 'bg-violet-50 border-violet-200 text-violet-500',
  NumericLiteral: 'bg-emerald-50 border-emerald-400 text-emerald-700',
  StringLiteral: 'bg-emerald-50 border-emerald-400 text-emerald-700',
  BooleanLiteral: 'bg-emerald-50 border-emerald-400 text-emerald-700',
  Literal: 'bg-emerald-50 border-emerald-400 text-emerald-700',
  Identifier: 'bg-amber-50 border-amber-400 text-amber-700',
  ErrorNode: 'bg-red-50 border-red-400 text-red-700',
};

const DEFAULT_STYLE = 'bg-zinc-100 border-zinc-300 text-zinc-600';

function getNodeStyle(node: ASTNode): string {
  if (node.isError) return NODE_STYLES.ErrorNode;
  return NODE_STYLES[node.type] ?? DEFAULT_STYLE;
}

function getLabel(node: ASTNode): string {
  return NODE_LABELS_ES[node.type] ?? node.type;
}

interface TreeNodeProps {
  node: ASTNode;
  isRoot?: boolean;
}

export default function TreeNode({ node, isRoot = false }: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={isRoot ? '' : ''}>
      <div className="flex flex-wrap items-center gap-1.5">
        {node.role && (
          <>
            <span className="font-mono text-xs text-zinc-400">{node.role}</span>
            <span className="text-xs text-zinc-300">→</span>
          </>
        )}
        <span
          className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-xs font-medium ${getNodeStyle(node)}`}
        >
          {getLabel(node)}
          {node.operator !== undefined && (
            <span className="ml-1 rounded bg-black/5 px-1 font-bold">{node.operator}</span>
          )}
          {node.value !== undefined && (
            <span className="ml-1 opacity-75">{String(node.value)}</span>
          )}
        </span>
      </div>

      {hasChildren && (
        <div className="relative ml-5 mt-2 border-l-2 border-zinc-200 pl-5">
          {node.children!.map((child, index) => (
            <div key={index} className="relative mt-2 first:mt-1">
              <div className="absolute -left-5 top-2.5 h-px w-5 bg-zinc-200" />
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

