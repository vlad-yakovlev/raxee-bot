export type MayBeEscaped = string | Escaped;

export class Escaped {
  value: string;

  constructor(text: MayBeEscaped = '', escaped = false) {
    if (typeof text === 'string') {
      this.value = escaped ? text : Escaped.escape(text);
    } else {
      this.value = text.value;
    }
  }

  static escape(text: string) {
    return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
  }

  toString() {
    return this.value;
  }
}
