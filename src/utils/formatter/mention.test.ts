import { mention } from './mention';

test('should accept undefined', () => {
  expect(mention(undefined).value).toBe('tg://user?id\\=undefined');
});

test('should return simple mention when username is presented', () => {
  expect(mention({ first_name: 'bar', id: 12345, is_bot: false, username: 'foo' }).value).toBe('@foo');
});

test('should return simple mention with escaped username', () => {
  expect(mention({ first_name: 'bar', id: 12345, is_bot: false, username: 'foo_foo' }).value).toBe('@foo\\_foo');
});

test('should return link mention when no username presented', () => {
  expect(mention({ first_name: 'bar', id: 12345, is_bot: false, last_name: 'baz' }).value).toBe('[bar baz](tg://user?id\\=12345)');
  expect(mention({ first_name: 'bar', id: 12345, is_bot: false }).value).toBe('[bar](tg://user?id\\=12345)');
});
