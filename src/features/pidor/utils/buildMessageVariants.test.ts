import { buildMessageVariants } from './buildMessageVariants';

test('should return same value', () => {
  const variants = [() => '', () => '', () => ''];
  expect(buildMessageVariants(variants)).toBe(variants);
});
