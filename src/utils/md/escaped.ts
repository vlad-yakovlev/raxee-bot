export type MayBeEscaped = string | Escaped;

export class Escaped {
  value: string;

  constructor(value: unknown = '', escaped = false) {
    if (value instanceof Escaped) {
      this.value = value.value;
    } else {
      this.value = escaped ? String(value) : Escaped.escape(String(value));
    }
  }

  static escape(text: string) {
    return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
  }

  toString() {
    return this.value;
  }
}
