import { test, expect } from "vitest";
import { tokenizer } from "../src/tokenizer";
import { TokenTypes } from "../src/types";

test("paren", () => {
  const code = `(`;
  const tokens = [{ type: TokenTypes.Paren, value: "(" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("add", () => {
  const code = `add`;
  const tokens = [{ type: TokenTypes.Name, value: "add" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("number", () => {
  const code = `223`;
  const tokens = [{ type: TokenTypes.Number, value: "223" }];
  expect(tokenizer(code)).toEqual(tokens);
});

test("string", () => {
  const code = `"abc" "def"`;
  const tokens = [
    { type: TokenTypes.String, value: "abc" },
    { type: TokenTypes.String, value: "def" },
  ];
  expect(tokenizer(code)).toEqual(tokens);
});

test("tokenizer", () => {
  const code = `(add 2 (subtract "abc" "def"))`;
  const tokens = [
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "add" },
    { type: TokenTypes.Number, value: "2" },
    { type: TokenTypes.Paren, value: "(" },
    { type: TokenTypes.Name, value: "subtract" },
    { type: TokenTypes.String, value: "abc" },
    { type: TokenTypes.String, value: "def" },
    { type: TokenTypes.Paren, value: ")" },
    { type: TokenTypes.Paren, value: ")" },
  ];

  expect(tokenizer(code)).toEqual(tokens);
});
