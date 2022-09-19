import { test, expect } from "vitest";
import { transformer } from "../src/transformer";
import { ASTRoot, NodeTypes, RootNode } from "../src/types";
test("transformer", () => {
  const originAst: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "2",
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.StringLiteral,
                value: "abc",
              },
              {
                type: NodeTypes.StringLiteral,
                value: "def",
              },
            ],
          },
        ],
      },
    ],
  };
  const ast: ASTRoot = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.Statement,
        expression: {
          type: NodeTypes.CallExpression,
          callee: {
            type: NodeTypes.Identifier,
            name: "add",
          },
          arguments: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              callee: {
                type: NodeTypes.Identifier,
                name: "subtract",
              },
              arguments: [
                {
                  type: NodeTypes.StringLiteral,
                  value: "abc",
                },
                {
                  type: NodeTypes.StringLiteral,
                  value: "def",
                },
              ],
            },
          ],
        },
      },
    ],
  };

  expect(transformer(originAst)).toEqual(ast);
});
