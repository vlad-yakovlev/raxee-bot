import { getMention } from './getMention';

test('should accept undefined', () => {
  expect(getMention(undefined)).toBe('[](tg://user?id=undefined)');
});

test('should return simple mention when username is presented', () => {
  expect(getMention({ first_name: 'bar', id: 12345, is_bot: false, username: 'foo' })).toBe('@foo');
});

test('should return simple mention with escaped username', () => {
  expect(getMention({ first_name: 'bar', id: 12345, is_bot: false, username: 'foo_foo' })).toBe('@foo\\_foo');
});

test('should return link mention when no username presented', () => {
  expect(getMention({ first_name: 'bar', id: 12345, is_bot: false, last_name: 'baz' })).toBe('[bar baz](tg://user?id=12345)');
  expect(getMention({ first_name: 'bar', id: 12345, is_bot: false })).toBe('[bar](tg://user?id=12345)');
});
