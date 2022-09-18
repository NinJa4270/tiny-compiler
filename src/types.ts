export enum TokenTypes {
  Paren = "paren",
  Name = "name",
  Number = "number",
}
export type Token = {
  type: TokenTypes;
  value: string;
};
export type Tokens = Token[];

export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression",
  Program = "Program",
}

export interface Node {
  type: NodeTypes;
}

export type ChildNode = NumberNode | CallExpressionNode;

export interface RootNode extends Node {
  body: ChildNode[];
}

export interface NumberNode extends Node {
  value: string;
}

export interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
}
