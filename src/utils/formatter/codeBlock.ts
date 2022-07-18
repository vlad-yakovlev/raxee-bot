import { Escaped, MayBeEscaped } from './escaped';

export const codeBlock = (code: MayBeEscaped, language = '') => {
  return new Escaped(`\`\`\`${new Escaped(language)}\n${new Escaped(code)}\n\`\`\``, true);
};
