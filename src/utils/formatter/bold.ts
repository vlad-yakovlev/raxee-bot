import { Escaped, MayBeEscaped } from './escaped';

export const bold = (text: MayBeEscaped) => {
  return new Escaped(`*${new Escaped(text)}*`, true);
};
