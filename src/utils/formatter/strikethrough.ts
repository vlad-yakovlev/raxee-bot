import { Escaped, MayBeEscaped } from './escaped';

export const strikethrough = (text: MayBeEscaped) => {
  return new Escaped(`~${new Escaped(text)}~`, true);
};
