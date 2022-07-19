import { Escaped, MayBeEscaped } from './escaped';

export const bold = (text: MayBeEscaped) => {
  if (!text) {
    return new Escaped();
  }

  return new Escaped(`*${new Escaped(text)}*`, true);
};
