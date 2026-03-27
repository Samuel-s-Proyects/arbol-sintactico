export interface ASTNode {
  type: string;
  role?: string;
  value?: string | number;
  operator?: string;
  children?: ASTNode[];
  // Para nodos de error en el árbol parcial de ejemplos inválidos
  isError?: boolean;
  errorInfo?: { found: string; expected: string };
}

export interface ParseError {
  message: string;
  line?: number;
  column?: number;
}

export interface SyntaxExample {
  id: string;
  title: string;
  description: string;
  code: string;
  isValid: boolean;
  // Para ejemplos inválidos: árbol parcial de lo que se parseó antes del error
  partialAST?: ASTNode;
  // Para ejemplos inválidos: explicación didáctica del error
  errorExplanation?: string;
}
