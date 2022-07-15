/* eslint-disable no-console */
import * as fs from 'fs/promises';
import * as URL from 'url';

import { FileAdapter } from '@grammyjs/storage-file';
import * as R from 'remeda';

import { FILE_ADAPTER_DIRNAME } from '../constants/db';
import { PidorState } from '../types/pidor';

require('dotenv-flow').config();

const SUBLIME_USER_ID = 232117096;

const SUBLIME_TEMPLATES = [
  'Ну ты и пидор, ',
  'Ага! Поздравляю! Сегодня ты пидор - ',
  'И прекрасный человек дня сегодня... а нет, ошибка, всего-лишь пидор - ',
  'Кто бы мог подумать, но пидор дня - ',
  'Няшный пидор дня - ',
  'Анализ завершен. Ты пидор, ',
  ".∧＿∧ \n( ･ω･｡)つ━☆・*。 \n⊂　 ノ 　　　・゜+. \nしーＪ　　　°。+ *´¨) \n　　　　　　　　　.· ´¸.·*´¨) \n　　　　　　　　　　(¸.·´ (¸.·'* ☆ ВЖУХ И ТЫ ПИДОР, ",
  'Кто тут у нас пидор дня? Ты пидор дня - ',
  'Стоять! Не двигаться! Вы объявлены пидором дня, ',
  'Ого, вы посмотрите только! А пидор дня то - ',
  'Кажется, пидор дня - ',
  'Что? Где? Когда? А ты пидор дня - ',
  'Пидор дня обыкновенный, 1шт. - ',
];

const readExport = async (filename: string) => {
  return R.pipe(
    await fs.readFile(filename, { encoding: 'utf-8' }),
    JSON.parse,
  );
};

const readState = async (id: number): Promise<PidorState> => {
  const storage = new FileAdapter<PidorState>({
    dirName: FILE_ADAPTER_DIRNAME,
  });

  return await storage.read(`pidor_-${id}`) || { importedStats: {}, stats: {}, users: {} };
};

const writeState = async (id: number, state: PidorState) => {
  const storage = new FileAdapter<PidorState>({
    dirName: FILE_ADAPTER_DIRNAME,
  });

  await storage.write(`pidor_-${id}`, state);
};

const getMessageText = (message: any): string => {
  if (typeof message.text === 'string') {
    return message.text;
  }

  return R.pipe(
    message.text,
    R.map((item: any) => item.text ?? item),
    (items: any[]) => items.join(''),
  );
};

(async () => {
  const meow = (await import('meow')).default;

  const cli = meow(
    [
      'Usage',
      '  $ npm run sublime-importer <telegram chat export json>',
    ].join('\n'),
    {
      importMeta: { url: URL.pathToFileURL(__filename).href },
    },
  );

  if (cli.input.length !== 1) {
    cli.showHelp();
    throw new Error('Incorrect arguments');
  }

  const tgExport = await readExport(cli.input[0]);
  const state = await readState(tgExport.id);

  tgExport.messages.forEach((message: any) => {
    if (Number(message.from_id?.slice(4)) === SUBLIME_USER_ID) {
      const text = getMessageText(message);

      const mention = SUBLIME_TEMPLATES.reduce((result, template) => {
        if (!result && text.startsWith(template)) {
          return text.slice(template.length);
        }

        return result;
      }, '');

      if (mention) {
        state.importedStats[message.date.slice(0, 10)] = mention;
      }
    }
  });

  await writeState(tgExport.id, state);
})()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
