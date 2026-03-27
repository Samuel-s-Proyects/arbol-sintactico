export interface ASTNode {
  type: string;
  role?: string;
  value?: string | number;
  operator?: string;
  children?: ASTNode[];
  isError?: boolean;
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
}
