import { traverser } from "./traverser";
import {
  ASTCallExpressionNode,
  ASTNumberNode,
  ASTRoot,
  ASTStatementNode,
  ASTStringNode,
  NodeTypes,
  RootNode,
} from "./types";

function createCallExpressionNode(name: string): ASTCallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    callee: {
      type: NodeTypes.Identifier,
      name,
    },
    args: [],
  };
}

function createStatementNode(
  expression: ASTCallExpressionNode
): ASTStatementNode {
  return {
    type: NodeTypes.Statement,
    expression,
  };
}

function createNumberNode(value: string): ASTNumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  };
}

function createStringNode(value: string): ASTStringNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  };
}

export function transformer(ast: RootNode) {
  const newAst: ASTRoot = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let callExpressionNode: ASTCallExpressionNode | ASTStatementNode =
            createCallExpressionNode(node.name);
          node.context = callExpressionNode.args;
          if (parent?.type !== NodeTypes.CallExpression) {
            callExpressionNode = createStatementNode(callExpressionNode);
          }

          parent!.context!.push(callExpressionNode);
        }
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode = createNumberNode(node.value);
          parent!.context?.push(numberNode);
        }
      },
    },
    StringLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.StringLiteral) {
          const numberNode = createStringNode(node.value);
          parent!.context?.push(numberNode);
        }
      },
    },
  });

  return newAst;
}
