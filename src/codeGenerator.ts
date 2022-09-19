import { ASTNode, NodeTypes } from "./types";

export function codeGenerator(node: ASTNode): string {
  switch (node.type) {
    case NodeTypes.Program:
      return node.body.map(codeGenerator).join("");
    case NodeTypes.Statement:
      return codeGenerator(node.expression) + ";";
    case NodeTypes.CallExpression:
      const { callee, args } = node;
      return `${codeGenerator(callee)}(${args.map(codeGenerator).join(", ")})`;
    case NodeTypes.Identifier:
      return node.name;
    case NodeTypes.NumberLiteral:
      return node.value;
    case NodeTypes.StringLiteral:
      return `"${node.value}"`;
    default:
      throw new TypeError(node);
  }
}
