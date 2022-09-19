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
}

export interface Node {
  type: NodeTypes;
}

export type ChildNode = NumberNode | StringNode | CallExpressionNode;

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
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
}

interface VisitorItem {
  enter: (
    node: RootNode | ChildNode,
    parent: RootNode | ChildNode | undefined
  ) => void;
  exit: (
    node: RootNode | ChildNode,
    parent: RootNode | ChildNode | undefined
  ) => void;
}

export type Visitor = {
  [key in NodeTypes]?: VisitorItem;
};
