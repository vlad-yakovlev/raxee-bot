import { Escaped } from './escaped';

import { md } from './index';

test('should build from template', () => {
  expect(md`Hello, @${new Escaped('jonny_john')}! foo_bar!!`.value).toBe('Hello, @jonny\\_john\\! foo\\_bar\\!\\!');
});
