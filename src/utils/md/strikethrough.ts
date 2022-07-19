import { Escaped, MayBeEscaped } from './escaped';

export const strikethrough = (text: MayBeEscaped) => {
  if (!text) {
    return new Escaped();
  }

  return new Escaped(`~${new Escaped(text)}~`, true);
};
