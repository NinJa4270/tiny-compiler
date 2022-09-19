import { TokenTypes, Tokens } from "./types";

export function tokenizer(code: string) {
  const tokens: Tokens = [];
  let current = 0;
  while (current < code.length) {
    let char = code[current];

    // ( )
    if (char === "(") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    // whitespace
    const WhiteSpaceTest = /\s/;
    if (WhiteSpaceTest.test(char)) {
      current++;
      continue;
    }

    // number
    const NumberTest = /[0-9]/;
    if (NumberTest.test(char)) {
      let value = "";
      while (NumberTest.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
      continue;
    }

    // string
    if (char === '"') {
      let value = "";
      char = code[++current];

      while (char !== '"' && current < code.length) {
        value += char;
        char = code[++current];
      }
      char = code[++current];
      tokens.push({
        type: TokenTypes.String,
        value,
      });
      continue;
    }

    // callExpression name
    const LetterTest = /[a-z]/i;
    if (LetterTest.test(char)) {
      let value = "";
      while (LetterTest.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.Name,
        value,
      });
      continue;
    }

    throw new TypeError(`char:${char}`);
  }

  return tokens;
}
