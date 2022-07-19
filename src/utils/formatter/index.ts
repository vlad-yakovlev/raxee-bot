import { bold } from './bold';
import { build } from './build';
import { codeBlock } from './codeBlock';
import { inlineCode } from './inlineCode';
import { italic } from './italic';
import { join } from './join';
import { link } from './link';
import { mention } from './mention';
import { spoiler } from './spoiler';
import { strikethrough } from './strikethrough';
import { underline } from './underline';

export { MayBeEscaped } from './escaped';

export const formatter = {
  bold,
  build,
  codeBlock,
  inlineCode,
  italic,
  join,
  link,
  mention,
  spoiler,
  strikethrough,
  underline,
};
