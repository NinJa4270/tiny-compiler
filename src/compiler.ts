import { codeGenerator } from "./codeGenerator";
import { parser } from "./parser";
import { tokenizer } from "./tokenizer";
import { transformer } from "./transformer";

export function compiler(code: string) {
  const tokens = tokenizer(code);
  const ast = transformer(parser(tokens));
  return codeGenerator(ast);
}
