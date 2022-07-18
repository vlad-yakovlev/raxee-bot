/* eslint-disable max-len, no-irregular-whitespace */
import { User } from 'grammy/out/platform.node';

import { getMention } from '../../utils/getMention';
import { getUserName } from '../../utils/getUserName';

import { buildMessageStatsVariant } from './utils/buildMessageStatsVariant';
import { buildMessageVariants } from './utils/buildMessageVariants';
import { getDayString } from './utils/getDayString';
import { getPidorString } from './utils/getPidorString';

export const pidorMessages = {
  _: {
    duplicate: buildMessageVariants([
      (user) => `По моей информации, *${getPidorString(1, 1)} ${getDayString()}* \u2013 ${getMention(user)}`,
    ]),

    empty: buildMessageVariants([
      () => 'Не объявлен список кандидатов',
    ]),

    found1: buildMessageVariants([
      () => '### RUNNING \'TYPIDOR.SH\'...',
      () => 'Woop-woop! That\'s the sound of da pidor-police!',
      () => `Инициирую поиск *${getPidorString(2, 1)} ${getDayString()}*...`,
      () => `Итак... кто же ${getPidorString(1, 1)} ${getDayString()}?`,
      () => 'Зачем вы меня разбудили...',
      () => 'Кто счастливчик?',
      () => 'Опять в эти ваши игрульки играете? Ну ладно...',
      () => `Осторожно! *${getPidorString(1, 1, { capitalize: true })} ${getDayString()}* активирован!`,
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
      (user) => `.∧＿∧ \n( ･ω･｡)つ━☆・\\*。 \n⊂　 ノ 　　　・゜+. \nしーＪ　　　°。+ \\*´¨) \n　　　　　　　　　.· ´¸.·\\*´¨) \n　　　　　　　　　　(¸.·´ (¸.·'\\* ☆ ВЖУХ И ТЫ ${getPidorString(1, 1, { uppercase: true })}, ${getMention(user)}`,
      (user) => `*${getPidorString(1, 1, { capitalize: true })} ${getDayString()}* обыкновенный, 1шт. \u2013 ${getMention(user)}`,
      (user) => `Ага! Поздравляю! *Ты ${getPidorString(1, 1)}* \u2013 ${getMention(user)}`,
      (user) => `Анализ завершен. *Ты ${getPidorString(1, 1)}*, ${getMention(user)}`,
      (user) => `Кажется, *${getPidorString(1, 1)} ${getDayString()}* \u2013 ${getMention(user)}`,
      (user) => `И прекрасный человек ${getDayString()}... а нет, ошибка, всего-лишь *${getPidorString(1, 1)}* \u2013 ${getMention(user)}`,
      (user) => `Кто бы мог подумать, но *${getPidorString(1, 1)} ${getDayString()}* \u2013 ${getMention(user)}`,
      (user) => `Кто тут у нас *${getPidorString(1, 1)} ${getDayString()}*? Ты *${getPidorString(1, 1)} ${getDayString()}* \u2013 ${getMention(user)}`,
      (user) => `Ну ты и *${getPidorString(1, 1)}*, ${getMention(user)}`,
      (user) => `Няшный *${getPidorString(1, 1)} ${getDayString()}* \u2013 ${getMention(user)}`,
      (user) => `Ого, вы посмотрите только! А *${getPidorString(1, 1)} ${getDayString()}* то \u2013 ${getMention(user)}`,
      (user) => `Стоять! Не двигаться! Вы объявлены *${getPidorString(5, 1)} ${getDayString()}*, ${getMention(user)}`,
      (user) => `Что? Где? Когда? А ты *${getPidorString(1, 1)} ${getDayString()}* \u2013 ${getMention(user)}`,
    ]),

    newYear: (year: string) => `Чуть не забыл.. *С Новым Годом, ${getPidorString(1, 2)}!*\nУзнай кто _победил_: /pidor\\_${year}`,
    year: (user: User, year: string) => `*Пидор ${year} года* \u2013 ${getMention(user)}`,
  },

  onMessage: {
    current: buildMessageVariants([
      () => `${getPidorString(3, 2, { capitalize: true })} слова не давали!`,
      () => `Кстати, ты ${getPidorString(1, 1)} :)`,
      () => `${getPidorString(2, 1, { capitalize: true })} ответ`,
      () => `Стоп, а когда у ${getPidorString(2, 2)} появилось право слова?`,
      () => 'ДЖИГУРДА!!11',
      () => 'Не забывай о своем статусе! ПИДОООР',
      () => 'Крепостное право отменили в 1861 году, а твои права даже не вводили',
      () => 'Что ты делаешь вечером?',
      () => `Какая честь видеть в этом чате ${getPidorString(2, 2)} ${getDayString()}!`,
      () => `Я бы на твоем месте уже ливнул с позором из чатика, ${getPidorString(1, 1)}`,
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

  stats: buildMessageStatsVariant({
    row: (index, user, count) => `*${index + 1}.* ${getUserName(user, true)} \u2013 _${count} раз(а)_`,
    title: () => `Встречайте топовых *${getPidorString(2, 2)}*:`,
    total: (count) => `Всего участников \u2013 _${count}_`,
  }),

  statsYear: buildMessageStatsVariant({
    row: (index, user, count) => `*${index + 1}.* ${getUserName(user, true)} \u2013 _${count} раз(а)_`,
    title: () => `Встречайте топовых *${getPidorString(2, 2)}* этого года:`,
    total: (count) => `Всего участников \u2013 _${count}_`,
  }),
};
