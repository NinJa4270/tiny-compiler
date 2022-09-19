import { test, expect } from "vitest";
import { traverser } from "../src/traverser";
import { NodeTypes, RootNode, Visitor } from "../src/types";

test("traverser", () => {
  const ast: RootNode = {
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

  const callArr: unknown[] = [];
  const visitor: Visitor = {
    Program: {
      enter(node, parent) {
        callArr.push(["program-enter", node.type, ""]);
      },
      exit(node, parent) {
        callArr.push(["program-exit", node.type, ""]);
      },
    },

    CallExpression: {
      enter(node, parent) {
        callArr.push(["callExpression-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callArr.push(["callExpression-exit", node.type, parent!.type]);
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        callArr.push(["numberLiteral-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callArr.push(["numberLiteral-exit", node.type, parent!.type]);
      },
    },

    StringLiteral: {
      enter(node, parent) {
        callArr.push(["stringLiteral-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callArr.push(["stringLiteral-exit", node.type, parent!.type]);
      },
    },
  };

  traverser(ast, visitor);
  expect(callArr).toEqual([
    ["program-enter", NodeTypes.Program, ""],
    ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Program],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    [
      "callExpression-enter",
      NodeTypes.CallExpression,
      NodeTypes.CallExpression,
    ],
    ["stringLiteral-enter", NodeTypes.StringLiteral, NodeTypes.CallExpression],
    ["stringLiteral-exit", NodeTypes.StringLiteral, NodeTypes.CallExpression],
    ["stringLiteral-enter", NodeTypes.StringLiteral, NodeTypes.CallExpression],
    ["stringLiteral-exit", NodeTypes.StringLiteral, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Program],
    ["program-exit", NodeTypes.Program, ""],
  ]);
});
