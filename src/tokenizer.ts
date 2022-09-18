export enum TokenTypes {
  Paren,
  Name,
  Number,
}
type Token = {
  type: TokenTypes;
  value: string;
};
type Tokens = Token[];

export function tokenizer(code: string) {
  const tokens: Tokens = [];
  let current = 0;
  while (current < code.length) {
    let char = code[current];
    const WhiteSpaceTest = /\s/;

    if (WhiteSpaceTest.test(char)) {
      current++;
      continue;
    }

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
    }

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
    }
  }

  return tokens;
}
