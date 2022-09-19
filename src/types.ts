export enum TokenTypes {
  Paren = "paren",
  Name = "name",
  Number = "number",
  String = "string",
}
export type Token = {
  type: TokenTypes;
  value: string;
};
export type Tokens = Token[];

export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression",
  StringLiteral = "StringLiteral",
  Program = "Program",
  Statement = "Statement",
  Identifier = "Identifier",
}

export interface Node {
  type: NodeTypes;
}

export type ChildNode = NumberNode | StringNode | CallExpressionNode;
export type ParentNode = RootNode | CallExpressionNode | undefined;

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
  context?: any[];
}

export interface NumberNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringNode extends Node {
  type: NodeTypes.StringLiteral;
  value: string;
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
  context?: any[];
}

type VisitorFn = (node: RootNode | ChildNode, parent: ParentNode) => void;

interface VisitorItem {
  enter: VisitorFn;
  exit?: VisitorFn;
}

export type Visitor = {
  [key in NodeTypes]?: VisitorItem;
};

export interface ASTCallee {
  type: NodeTypes.Identifier;
  name: string;
}

type ASTChildNode =
  | ASTNumberNode
  | ASTCallExpressionNode
  | ASTNumberNode
  | ASTStringNode;
export interface ASTCallExpressionNode {
  type: NodeTypes.CallExpression;
  callee: ASTCallee;
  arguments: ASTChildNode[];
}

export interface ASTStatementNode {
  type: NodeTypes.Statement;
  expression: ASTCallExpressionNode;
}

export interface ASTNumberNode {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface ASTStringNode {
  type: NodeTypes.StringLiteral;
  value: string;
}

export interface ASTRoot {
  type: NodeTypes.Program;
  body: ASTStatementNode[];
}
