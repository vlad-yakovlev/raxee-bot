import { Escaped } from './escaped';

describe('#constructor', () => {
  test('should save escaped text', () => {
    expect(new Escaped('foo_bar').value).toBe('foo\\_bar');
  });

  test('should save unescaped text', () => {
    expect(new Escaped('foo_bar', true).value).toBe('foo_bar');
  });

  test('should save value from escaped', () => {
    const escaped = new Escaped();
    escaped.value = 'foo_bar';
    expect(new Escaped(escaped).value).toBe('foo_bar');
  });
});

describe('#escape', () => {
  test('should escape string', () => {
    expect(Escaped.escape('foo_bar_baz')).toBe('foo\\_bar\\_baz');
  });
});

describe('#toString', () => {
  test('should return value', () => {
    expect(new Escaped('foo_bar').toString()).toBe('foo\\_bar');
  });
});
