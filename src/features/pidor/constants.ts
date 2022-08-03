/* eslint-disable max-len, no-irregular-whitespace */
import { User } from 'grammy/out/platform.node';
import { md } from 'telegram-md';

import { getMention } from '../../utils/getMention';
import { getUserName } from '../../utils/getUserName';

import { buildMessageVariants } from './utils/buildMessageVariants';
import { getDayString } from './utils/getDayString';
import { getPidorString } from './utils/getPidorString';
import { StatsItem } from './utils/getStatsItems';

/* istanbul ignore next */
export const pidorMessages = {
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
      () => '15см \u2014 не приговор',
      () => 'Третий размер \u2014 не приговор',
      () => 'Лох! Пидр!',
      () => 'Ко-ко-ко',
      () => 'И ты думаешь, это смешно?',
      () => 'И что ты мне сделаешь, чтобы я замолчал?',
      () => 'dоɓиu ıqɯ',
    ]),
  },

  pidor: {
    duplicate: buildMessageVariants([
      (user) => md`По моей информации, ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} \u2014 ${getMention(user)}`,
    ]),

    empty: buildMessageVariants([
      () => 'Не объявлен список кандидатов',
    ]),

    found1: buildMessageVariants([
      () => '### RUNNING \'TYPIDOR.SH\'...',
      () => 'Woop-woop! That\'s the sound of da pidor-police!',
      () => md`Инициирую поиск ${md.bold(`${getPidorString(2, 1)} ${getDayString()}`)}...`,
      () => `Итак... кто же ${getPidorString(1, 1)} ${getDayString()}?`,
      () => 'Зачем вы меня разбудили...',
      () => 'Кто счастливчик?',
      () => 'Опять в эти ваши игрульки играете? Ну ладно...',
      () => md`Осторожно! ${md.bold(`${getPidorString(1, 1, { capitalize: true })} ${getDayString()}`)} активирован!`,
      () => 'Сейчас поколдуем...',
      () => 'Система взломана. Нанесён урон. Запущено планирование контрмер.',
      () => 'Что тут у нас?',
      () => 'Эй, зачем разбудили...',
    ]),

    found2: buildMessageVariants([
      () => md.italic('(Ворчит) А могли бы на работе делом заниматься'),
      () => md.italic('Ведётся поиск в базе данных'),
      () => md.italic('Военный спутник запущен, коды доступа внутри...'),
      () => md.italic('Выезжаю на место...'),
      () => md.italic('Где-же он...'),
      () => md.italic('Интересно...'),
      () => md.italic('Машины выехали'),
      () => md.italic('Сканирую...'),
      () => md.italic('Сонно смотрит на бумаги'),
      () => md.italic('Хм...'),
      () => md.italic('Шаманим-шаманим...'),
      () => md.italic('Ну давай, посмотрим кто тут классный...'),
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
      (user) => md`.∧＿∧ \n( ･ω･｡)つ━☆・*。 \n⊂　 ノ 　　　・゜+. \nしーＪ　　　°。+ *´¨) \n　　　　　　　　　.· ´¸.·*´¨) \n　　　　　　　　　　(¸.·´ (¸.·'* ☆ ВЖУХ И ТЫ ${getPidorString(1, 1, { uppercase: true })}, ${getMention(user)}`,
      (user) => md`${md.bold(`${getPidorString(1, 1, { capitalize: true })} ${getDayString()}`)} обыкновенный, 1шт. \u2014 ${getMention(user)}`,
      (user) => md`Ага! Поздравляю! ${md.bold(`Ты ${getPidorString(1, 1)}`)} \u2014 ${getMention(user)}`,
      (user) => md`Анализ завершен. ${md.bold(`Ты ${getPidorString(1, 1)}`)}, ${getMention(user)}`,
      (user) => md`Кажется, ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} \u2014 ${getMention(user)}`,
      (user) => md`И прекрасный человек ${getDayString()}... а нет, ошибка, всего-лишь ${md.bold(getPidorString(1, 1))} \u2014 ${getMention(user)}`,
      (user) => md`Кто бы мог подумать, но ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} \u2014 ${getMention(user)}`,
      (user) => md`Кто тут у нас ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)}? Ты ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} \u2014 ${getMention(user)}`,
      (user) => md`Ну ты и ${md.bold(getPidorString(1, 1))}, ${getMention(user)}`,
      (user) => md`Няшный ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} \u2014 ${getMention(user)}`,
      (user) => md`Ого, вы посмотрите только! А ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} то \u2014 ${getMention(user)}`,
      (user) => md`Стоять! Не двигаться! Вы объявлены ${md.bold(`${getPidorString(5, 1)} ${getDayString()}`)}, ${getMention(user)}`,
      (user) => md`Что? Где? Когда? А ты ${md.bold(`${getPidorString(1, 1)} ${getDayString()}`)} \u2014 ${getMention(user)}`,
    ]),

    newYear: (year: string) => md`Чуть не забыл.. ${md.bold(`С Новым Годом, ${getPidorString(1, 2)}!`)}\nУзнай кто ${md.italic('победил')}: /pidor_${year}`,
    year: (user: User, year: string) => md`${md.bold(`Пидор ${year} года`)} \u2014 ${getMention(user)}`,
  },

  pidorReg: {
    added: buildMessageVariants([
      () => md`Ты в игре, ${md.bold('сучка')}`,
      () => 'Скоро и до тебя доберемся',
      (user) => md`${md.bold('PREPAREURANUS')}, ${getMention(user)}`,
    ]),

    duplicate: buildMessageVariants([
      () => 'Молния не бьет дважды в одно место',
    ]),
  },

  pidorStats: (items: StatsItem[], usersCount: number) => md.join([
    md`Встречайте топовых ${md.bold(getPidorString(2, 2))}:`,
    md.join(items.map((item, index) => md`${md.bold(`${index + 1}.`)} ${getUserName(item.user)} \u2014 ${md.italic(`${item.count} раз(а)`)}`), '\n'),
    md`Всего участников \u2014 ${md.italic(String(usersCount))}`,
  ], '\n\n'),

  pidorStatsYear: (items: StatsItem[], usersCount: number) => md.join([
    md`Встречайте топовых ${md.bold(getPidorString(2, 2))} этого года:`,
    md.join(items.map((item, index) => md`${md.bold(`${index + 1}.`)} ${getUserName(item.user)} \u2014 ${md.italic(`${item.count} раз(а)`)}`), '\n'),
    md`Всего участников \u2014 ${md.italic(String(usersCount))}`,
  ], '\n\n'),
};
