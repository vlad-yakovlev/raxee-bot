/* eslint-disable max-len, no-irregular-whitespace */
import { User } from 'grammy/out/platform.node';

import { formatter } from '../../utils/formatter';
import { getUserName } from '../../utils/getUserName';

import { buildMessageVariants } from './utils/buildMessageVariants';
import { getDayString } from './utils/getDayString';
import { getPidorString } from './utils/getPidorString';
import { StatsItem } from './utils/getStatsItems';

/* istanbul ignore next */
export const pidorMessages = {
  _: {
    duplicate: buildMessageVariants([
      (user) => formatter.join(['По моей информации, ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' \u2013 ', formatter.mention(user)]),
    ]),

    empty: buildMessageVariants([
      () => 'Не объявлен список кандидатов',
    ]),

    found1: buildMessageVariants([
      () => '### RUNNING \'TYPIDOR.SH\'...',
      () => 'Woop-woop! That\'s the sound of da pidor-police!',
      () => formatter.join(['Инициирую поиск ', formatter.bold(`${getPidorString(2, 1)} ${getDayString()}`), '...']),
      () => `Итак... кто же ${getPidorString(1, 1)} ${getDayString()}?`,
      () => 'Зачем вы меня разбудили...',
      () => 'Кто счастливчик?',
      () => 'Опять в эти ваши игрульки играете? Ну ладно...',
      () => formatter.join(['Осторожно! ', formatter.bold(`${getPidorString(1, 1, { capitalize: true })} ${getDayString()}`), ' активирован!']),
      () => 'Сейчас поколдуем...',
      () => 'Система взломана. Нанесён урон. Запущено планирование контрмер.',
      () => 'Что тут у нас?',
      () => 'Эй, зачем разбудили...',
    ]),

    found2: buildMessageVariants([
      () => formatter.italic('(Ворчит) А могли бы на работе делом заниматься'),
      () => formatter.italic('Ведётся поиск в базе данных'),
      () => formatter.italic('Военный спутник запущен, коды доступа внутри...'),
      () => formatter.italic('Выезжаю на место...'),
      () => formatter.italic('Где-же он...'),
      () => formatter.italic('Интересно...'),
      () => formatter.italic('Машины выехали'),
      () => formatter.italic('Сканирую...'),
      () => formatter.italic('Сонно смотрит на бумаги'),
      () => formatter.italic('Хм...'),
      () => formatter.italic('Шаманим-шаманим...'),
      () => formatter.italic('Ну давай, посмотрим кто тут классный...'),
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
      (user) => formatter.join([`.∧＿∧ \n( ･ω･｡)つ━☆・*。 \n⊂　 ノ 　　　・゜+. \nしーＪ　　　°。+ *´¨) \n　　　　　　　　　.· ´¸.·*´¨) \n　　　　　　　　　　(¸.·´ (¸.·'* ☆ ВЖУХ И ТЫ ${getPidorString(1, 1, { uppercase: true })}, `, formatter.mention(user)]),
      (user) => formatter.join([formatter.bold(`${getPidorString(1, 1, { capitalize: true })} ${getDayString()}`), ' обыкновенный, 1шт. \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Ага! Поздравляю! ', formatter.bold(`Ты ${getPidorString(1, 1)}`), ' \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Анализ завершен. ', formatter.bold(`Ты ${getPidorString(1, 1)}`), ', ', formatter.mention(user)]),
      (user) => formatter.join(['Кажется, ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' \u2013 ', formatter.mention(user)]),
      (user) => formatter.join([`И прекрасный человек ${getDayString()}... а нет, ошибка, всего-лишь `, formatter.bold(getPidorString(1, 1)), ' \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Кто бы мог подумать, но ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Кто тут у нас ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), '? Ты ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Ну ты и ', formatter.bold(getPidorString(1, 1)), ', ', formatter.mention(user)]),
      (user) => formatter.join(['Няшный ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Ого, вы посмотрите только! А ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' то \u2013 ', formatter.mention(user)]),
      (user) => formatter.join(['Стоять! Не двигаться! Вы объявлены ', formatter.bold(`${getPidorString(5, 1)} ${getDayString()}`), ', ', formatter.mention(user)]),
      (user) => formatter.join(['Что? Где? Когда? А ты ', formatter.bold(`${getPidorString(1, 1)} ${getDayString()}`), ' \u2013 ', formatter.mention(user)]),
    ]),

    newYear: (year: string) => formatter.join(['Чуть не забыл.. ', formatter.bold(`С Новым Годом, ${getPidorString(1, 2)}!`), '\nУзнай кто ', formatter.italic('победил'), `: /pidor_${year}`]),
    year: (user: User, year: string) => formatter.join([formatter.bold(`Пидор ${year} года`), ' \u2013 ', formatter.mention(user)]),
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
      () => formatter.join(['Ты в игре, ', formatter.bold('сучка')]),
      () => 'Скоро и до тебя доберемся',
      (user) => formatter.join([formatter.bold('PREPAREURANUS'), ', ', formatter.mention(user)]),
    ]),

    duplicate: buildMessageVariants([
      () => 'Молния не бьет дважды в одно место',
    ]),
  },

  stats: (items: StatsItem[], usersCount: number) => formatter.join([
    formatter.join(['Встречайте топовых ', formatter.bold(getPidorString(2, 2)), ':']),
    formatter.join(items.map((item, index) => formatter.join([formatter.bold(`${index + 1}.`), ` ${getUserName(item.user)} \u2013 `, formatter.italic(`${item.count} раз(а)`)])), '\n'),
    formatter.join(['Всего участников \u2013 ', formatter.italic(String(usersCount))]),
  ], '\n\n'),

  statsYear: (items: StatsItem[], usersCount: number) => formatter.join([
    formatter.join(['Встречайте топовых ', formatter.bold(getPidorString(2, 2)), ' этого года:']),
    formatter.join(items.map((item, index) => formatter.join([formatter.bold(`${index + 1}.`), ` ${getUserName(item.user)} \u2013 `, formatter.italic(`${item.count} раз(а)`)])), '\n'),
    formatter.join(['Всего участников \u2013 ', formatter.italic(String(usersCount))]),
  ], '\n\n'),
};
