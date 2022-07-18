import { Escaped, MayBeEscaped } from './escaped';

export const inlineCode = (code: MayBeEscaped) => {
  return new Escaped(`\`${new Escaped(code)}\``, true);
};
