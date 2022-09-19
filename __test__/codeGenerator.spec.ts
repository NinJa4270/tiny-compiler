import { test, expect } from "vitest";
import { codeGenerator } from "../src/codeGenerator";
import { ASTRoot, NodeTypes } from "../src/types";

test("codeGenerator", () => {
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
          args: [
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
              args: [
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
      {
        type: NodeTypes.Statement,
        expression: {
          type: NodeTypes.CallExpression,
          callee: {
            type: NodeTypes.Identifier,
            name: "add",
          },
          args: [
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
              args: [
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

  const code = `add(2, subtract("abc", "def"));add(2, subtract("abc", "def"));`;
  expect(codeGenerator(ast)).toEqual(code);
});
