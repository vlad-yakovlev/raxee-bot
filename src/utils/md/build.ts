import { Escaped, MayBeEscaped } from './escaped';

export const build = (text: MayBeEscaped) => {
  return String(new Escaped(text));
};
