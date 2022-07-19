import { Escaped, MayBeEscaped } from './escaped';

export const join = (texts: MayBeEscaped[], separator: MayBeEscaped = '') => {
  const value = texts
    .map((text) => new Escaped(text))
    .join(String(new Escaped(separator)));

  return new Escaped(value, true);
};
