import {
  Tokens,
  TokenTypes,
  NodeTypes,
  RootNode,
  NumberNode,
  CallExpressionNode,
  StringNode,
} from "./types";

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  };
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value: value,
  };
}

function createStringNode(value: string): StringNode {
  return {
    type: NodeTypes.StringLiteral,
    value: value,
  };
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name: name,
    params: [],
  };
}

export function parser(tokens: Tokens) {
  let current = 0;
  const rootNode = createRootNode();

  function walk() {
    let token = tokens[current];

    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberNode(token.value);
    }

    if (token.type === TokenTypes.String) {
      current++;
      return createStringNode(token.value);
    }

    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++current];
      const callExpressionNode = createCallExpressionNode(token.value);
      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ")")) {
        callExpressionNode.params.push(walk());
        token = tokens[current];
      }
      current++;
      return callExpressionNode;
    }
    throw new Error(`token:${token}`);
  }

  while (current < tokens.length) {
    rootNode.body.push(walk());
  }
  return rootNode;
}
