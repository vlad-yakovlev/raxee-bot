import { Escaped, MayBeEscaped } from './escaped';

export const inlineCode = (code: MayBeEscaped) => {
  if (!code) {
    return new Escaped();
  }

  return new Escaped(`\`${new Escaped(code)}\``, true);
};
