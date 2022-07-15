/* eslint-disable max-len, no-irregular-whitespace */
import { User } from 'grammy/out/platform.node';

import { buildMessageVariants, buildPidorStatsMessageVariant, getMention, getUserName, isFirstApril, isHalloween } from '../utils';

const pidor = [
  ['пидор', 'пидоры'],
  ['пидора', 'пидоров'],
  ['пидору', 'пидорам'],
  ['пидора', 'пидоров'],
  ['пидором', 'пидорами'],
  ['пидоре', 'пидорах'],
];

const pumpkin = [
  ['тыковка', 'тыковки'],
  ['тыковки', 'тыковок'],
  ['тыковке', 'тыковкам'],
  ['тыковку', 'тыковки'],
  ['тыковкой', 'тыковками'],
  ['тыковке', 'тыковках'],
];

const getDay = () => {
  let text = 'дня';

  if (isFirstApril()) {
    text = 'часа';
  }

  return text;
};

const getPidor = (role: 1 | 2 | 3 | 4 | 5 | 6, count: 1 | 2, opts: {
  capitalize?: boolean
  uppercase?: boolean
} = {}) => {
  let translation = pidor;

  if (isHalloween()) {
    translation = pumpkin;
  }

  let text = translation[role - 1][count - 1];

  if (opts.capitalize) {
    text = text[0].toUpperCase() + text.slice(1);
  }

  if (opts.uppercase) {
    text = text.toUpperCase();
  }

  return text;
};

export const pidorMessages = {
  _: {
    duplicate: buildMessageVariants([
      (user) => `По моей информации, *${getPidor(1, 1)} ${getDay()}* \u2013 ${getMention(user)}`,
    ]),

    empty: buildMessageVariants([
      () => 'Не объявлен список кандидатов',
    ]),

    found1: buildMessageVariants([
      () => '### RUNNING \'TYPIDOR.SH\'...',
      () => 'Woop-woop! That\'s the sound of da pidor-police!',
      () => `Инициирую поиск *${getPidor(2, 1)} ${getDay()}*...`,
      () => `Итак... кто же ${getPidor(1, 1)} ${getDay()}?`,
      () => 'Зачем вы меня разбудили...',
      () => 'Кто счастливчик?',
      () => 'Опять в эти ваши игрульки играете? Ну ладно...',
      () => `Осторожно! *${getPidor(1, 1, { capitalize: true })} ${getDay()}* активирован!`,
      () => 'Сейчас поколдуем...',
      () => 'Система взломана. Нанесён урон. Запущено планирование контрмер.',
      () => 'Что тут у нас?',
      () => 'Эй, зачем разбудили...',
    ]),

    found2: buildMessageVariants([
      () => '_(Ворчит) А могли бы на работе делом заниматься_',
      () => '_Ведётся поиск в базе данных_',
      () => '_Военный спутник запущен, коды доступа внутри..._',
      () => '_Выезжаю на место..._',
      () => '_Где-же он..._',
      () => '_Интересно..._',
      () => '_Машины выехали_',
      () => '_Сканирую..._',
      () => '_Сонно смотрит на бумаги_',
      () => '_Хм..._',
      () => '_Шаманим-шаманим..._',
      () => 'Ну давай, посмотрим кто тут классный...',
    ]),

    found3: buildMessageVariants([
      () => 'В этом совершенно нет смысла...',
      () => 'Ведётся захват подозреваемого...',
      () => 'Высокий приоритет мобильному юниту.',
      () => 'Доступ получен. Аннулирование протокола.',
      () => 'Не может быть!',
      () => 'КЕК!',
      () => 'Ого-го...',
      () => 'Ох...',
      () => 'Проверяю данные...',
      () => 'Так, что тут у нас?',
      () => 'Так-так, что же тут у нас...',
      () => 'Тысяча чертей!',
      () => 'Что с нами стало...',
      () => 'Я в опасности, системы повреждены!',
    ]),

    found4: buildMessageVariants([
      (user) => `.∧＿∧ \n( ･ω･｡)つ━☆・\\*。 \n⊂　 ノ 　　　・゜+. \nしーＪ　　　°。+ \\*´¨) \n　　　　　　　　　.· ´¸.·\\*´¨) \n　　　　　　　　　　(¸.·´ (¸.·'\\* ☆ ВЖУХ И ТЫ ${getPidor(1, 1, { uppercase: true })}, ${getMention(user)}`,
      (user) => `*${getPidor(1, 1, { capitalize: true })} ${getDay()}* обыкновенный, 1шт. \u2013 ${getMention(user)}`,
      (user) => `Ага! Поздравляю! *Ты ${getPidor(1, 1)}* \u2013 ${getMention(user)}`,
      (user) => `Анализ завершен. *Ты ${getPidor(1, 1)}*, ${getMention(user)}`,
      (user) => `Кажется, *${getPidor(1, 1)} ${getDay()}* \u2013 ${getMention(user)}`,
      (user) => `И прекрасный человек ${getDay()}... а нет, ошибка, всего-лишь *${getPidor(1, 1)}* \u2013 ${getMention(user)}`,
      (user) => `Кто бы мог подумать, но *${getPidor(1, 1)} ${getDay()}* \u2013 ${getMention(user)}`,
      (user) => `Кто тут у нас *${getPidor(1, 1)} ${getDay()}*? Ты *${getPidor(1, 1)} ${getDay()}* \u2013 ${getMention(user)}`,
      (user) => `Ну ты и *${getPidor(1, 1)}*, ${getMention(user)}`,
      (user) => `Няшный *${getPidor(1, 1)} ${getDay()}* \u2013 ${getMention(user)}`,
      (user) => `Ого, вы посмотрите только! А *${getPidor(1, 1)} ${getDay()}* то \u2013 ${getMention(user)}`,
      (user) => `Стоять! Не двигаться! Вы объявлены *${getPidor(5, 1)} ${getDay()}*, ${getMention(user)}`,
      (user) => `Что? Где? Когда? А ты *${getPidor(1, 1)} ${getDay()}* \u2013 ${getMention(user)}`,
    ]),

    newYear: (year: string) => `Чуть не забыл.. *С Новым Годом, ${getPidor(1, 2)}!*\nУзнай кто _победил_: /pidor\\_${year}`,
    year: (user: User, year: string) => `*Пидор ${year} года* \u2013 ${getMention(user)}`,
  },

  onMessage: {
    current: buildMessageVariants([
      () => `${getPidor(3, 2, { capitalize: true })} слова не давали!`,
      () => `Кстати, ты ${getPidor(1, 1)} :)`,
      () => `${getPidor(2, 1, { capitalize: true })} ответ`,
      () => `Стоп, а когда у ${getPidor(2, 2)} появилось право слова?`,
      () => 'ДЖИГУРДА!!11',
      () => 'Не забывай о своем статусе! ПИДОООР',
      () => 'Крепостное право отменили в 1861 году, а твои права даже не вводили',
      () => 'Что ты делаешь вечером?',
      () => `Какая честь видеть в этом чате ${getPidor(2, 2)} ${getDay()}!`,
      () => `Я бы на твоем месте уже ливнул с позором из чатика, ${getPidor(1, 1)}`,
      () => 'О, а ты что, еще здесь?',
      () => 'А какого размера твой АНУС?))',
      () => '15см \u2013 не приговор',
      () => 'Третий размер \u2013 не приговор',
      () => 'Лох! Пидр!',
      () => 'Ко-ко-ко',
      () => 'И ты думаешь, это смешно?',
      () => 'И что ты мне сделаешь, чтобы я замолчал?',
      () => 'dоɓиu ıqɯ',
    ]),
  },

  register: {
    added: buildMessageVariants([
      () => 'Ты в игре, *сучка*',
      () => 'Скоро и до тебя доберемся',
      (user) => `*PREPAREURANUS*, ${getMention(user)}`,
    ]),

    duplicate: buildMessageVariants([
      () => 'Молния не бьет дважды в одно место',
    ]),
  },

  stats: buildPidorStatsMessageVariant({
    row: (index, user, count) => `*${index + 1}.* ${getUserName(user, true)} \u2013 _${count} раз(а)_`,
    title: () => `Встречайте топовых *${getPidor(2, 2)}*:`,
    total: (count) => `Всего участников \u2013 _${count}_`,
  }),

  statsYear: buildPidorStatsMessageVariant({
    row: (index, user, count) => `*${index + 1}.* ${getUserName(user, true)} \u2013 _${count} раз(а)_`,
    title: () => `Встречайте топовых *${getPidor(2, 2)}* этого года:`,
    total: (count) => `Всего участников \u2013 _${count}_`,
  }),
};
