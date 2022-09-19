import { test, expect } from "vitest";
import { compiler } from "../src/compiler";
test("compiler", () => {
  const code = `(add 2 (subtract "abc" "def"))(add 2 (subtract "abc" "def"))`;
  const compilerCode = `add(2, subtract("abc", "def"));add(2, subtract("abc", "def"));`;
  expect(compiler(code)).toEqual(compilerCode);
});
