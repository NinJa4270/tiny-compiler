import { test, expect } from "vitest";
import { parser } from "../src/parser";
import { NodeTypes, TokenTypes } from "../src/types";

test("numberNode", () => {
  const tokens = [{ type: TokenTypes.Number, value: "2" }];

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
        value: "2",
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test("callExpressionNode", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  const ast = {
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
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test("two callExpressionNode", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "10" },
    { type: TokenTypes.Number, value: "20" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  const ast = {
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
            type: NodeTypes.NumberLiteral,
            value: "4",
          },
        ],
      },
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: "10",
          },
          {
            type: NodeTypes.NumberLiteral,
            value: "20",
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test("parser", () => {
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.Number, value: "4" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  const ast = {
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
                type: NodeTypes.NumberLiteral,
                value: "4",
              },
              {
                type: NodeTypes.NumberLiteral,
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});
