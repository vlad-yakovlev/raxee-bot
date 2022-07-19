import { bold as boldFunc } from './bold';
import { build as buildFunc } from './build';
import { codeBlock as codeBlockFunc } from './codeBlock';
import { Escaped } from './escaped';
import { inlineCode as inlineCodeFunc } from './inlineCode';
import { italic as italicFunc } from './italic';
import { join as joinFunc } from './join';
import { link as linkFunc } from './link';
import { mention as mentionFunc } from './mention';
import { spoiler as spoilerFunc } from './spoiler';
import { strikethrough as strikethroughFunc } from './strikethrough';
import { underline as underlineFunc } from './underline';

export { MayBeEscaped } from './escaped';

export function md(strings: TemplateStringsArray, ...values: unknown[]) {
  let result = `${new Escaped(strings[0])}`;

  for (let i = 1; i < strings.length; i += 1) {
    result += `${new Escaped(values[i - 1])}${new Escaped(strings[i])}`;
  }

  return new Escaped(result, true);
}

export namespace md {
  export const bold = boldFunc;
  export const build = buildFunc;
  export const codeBlock = codeBlockFunc;
  export const inlineCode = inlineCodeFunc;
  export const italic = italicFunc;
  export const link = linkFunc;
  export const join = joinFunc;
  export const mention = mentionFunc;
  export const spoiler = spoilerFunc;
  export const strikethrough = strikethroughFunc;
  export const underline = underlineFunc;
}
