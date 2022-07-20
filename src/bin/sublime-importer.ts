import * as fs from 'fs/promises';

import { FileAdapter } from '@grammyjs/storage-file';
import * as R from 'remeda';

import { PidorState } from '../features/pidor/types';

type MayBeArray<T> = T | T[];

type TgExportMessageText = string | { text: string, type: string };

interface TgExportMessage {
  date: string
  from_id?: string
  text?: MayBeArray<TgExportMessageText>
}

interface TgExport {
  id: number
  messages: TgExportMessage[]
}

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

const getMessageText = (message: TgExportMessage): string => {
  if (!message.text) {
    return '';
  }

  const textToString = (text: TgExportMessageText) => (typeof text === 'string' ? text : text.text);

  if (Array.isArray(message.text)) {
    return R.pipe(
      message.text,
      R.map(textToString),
      (items) => items.join(''),
    );
  }

  return textToString(message.text);
};

export const runSublimeImporter = async (filename: string) => {
  const tgExport: TgExport = await R.pipe(
    await fs.readFile(filename, { encoding: 'utf-8' }),
    JSON.parse,
  );

  const storage = new FileAdapter<PidorState>({ dirName: 'db/v1' });
  const storageKey = `pidor_-${tgExport.id}`;
  const state = (await storage.read(storageKey)) || { importedStats: {}, stats: {}, users: {} };

  tgExport.messages.forEach((message) => {
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

  await storage.write(storageKey, state);
};

/* istanbul ignore next */
if (require.main === module) {
  // eslint-disable-next-line global-require
  require('dotenv-flow').config();

  if (process.argv.length !== 3) {
    // eslint-disable-next-line no-console
    console.log('Usage:\n$ npm run sublime-importer <telegram chat export json>');
    process.exit(1);
  }

  runSublimeImporter(process.argv[2])
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}
