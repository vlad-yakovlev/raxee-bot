/* eslint-disable max-len */
import * as R from 'remeda';
import { md } from 'telegram-md';

import { getMention } from '../../utils/getMention';

import { PokerCard } from './classes/PokerCard';
import { PokerPlayer } from './classes/PokerPlayer';

/* istanbul ignore next */
export const pokerStrings = {
  allIn: '💰 All in',
  amount: (value: number | string) => `${value} 🪙`,
  call: (value: number | string) => `✅ ${value}`,
  check: '✊ Check',
  fold: '❌ Fold',
  preFlop: 'Префлоп',
  raise: (value: number | string) => `⏫ ${value}`,
  win: '🏆 Win',
};

/* istanbul ignore next */
export const pokerMessages = {
  _: {
    gameFinished: 'Игра окончена, всем спасибо',
    playerMessage: (player: PokerPlayer, message: string) => md`${getMention(player.user)}: ${message}`,
    roundFinished: (boardCards: PokerCard[], players: PokerPlayer[]) => md.join([
      `Стол: ${boardCards.join(' ')}`,
      ...players.map((player) => md.join([
        md`${getMention(player.user)}: ${player.cards.join(' ')}`,
        [
          player.topCombination,
          player.folded && pokerStrings.fold,
          player.win && pokerStrings.win,
        ].filter(R.isTruthy).join(' '),
      ].filter(R.isTruthy), '\n')),
    ], '\n\n'),
    roundStarted: (players: PokerPlayer[], dealer: PokerPlayer, small: PokerPlayer, big: PokerPlayer) => md.join([
      md.bold('Играют:'),
      ...players.map((player) => md.join([
        '\u2022',
        getMention(player.user),
        `(${pokerStrings.amount(player.balance + player.bet)})`,
        player.balance === 0 && pokerStrings.allIn,
      ].filter(R.isTruthy), ' ')),
      '',
      md`${md.bold('Дилер:')} ${getMention(dealer.user)}`,
      md`${md.bold('Малый:')} ${getMention(small.user)} (${pokerStrings.amount(small.bet)})`,
      md`${md.bold('Большой:')} ${getMention(big.user)} (${pokerStrings.amount(big.bet)})`,
    ], '\n'),
    userTurn: (player: PokerPlayer) => md`Ходит ${getMention(player.user)}`,
  },

  onMessage: {
    allInIsNotAllowed: 'Ты не можешь сделать all in',
    betTooBig: 'Ставка слишком большая',
    betTooSmall: 'Ставка слишком маленькая',
    callIsNotAllowed: 'Ты не можешь сделать call',
    checkIsNotAllowed: 'Ты не можешь сделать check',
    foldIsNotAllowed: 'Ты не можешь сделать fold',
    raiseIsNotAllowed: 'Ты не можешь сделать raise',
    unknownCommand: 'Я тебя не понял, но всем передал',
    wrongTurn: 'Сейчас не твой ход, но я всем передал',
  },

  pokerReg: {
    alreadyStarted: 'Игра в этом чате уже началась',
    duplicateOtherChat: 'Ты уже в игре в другом чате',
    duplicateSameChat: 'Ты уже в игре в этом чате',
    registered: md`Готовься, ты в игре. Чтобы я смог с тобой общаться, ${md.link('начни чат со мной', 'https://t.me/raxee_bot?start=poker')}`,
    tooMany: 'Слишком много игроков в этом чате',
  },

  pokerStart: {
    alreadyStarted: 'Игра уже началась, дождись ее окончания',
    started: md`Го в ${md.link('ЛС', 'https://t.me/raxee_bot')}, игра началась`,
    tooFew: 'Слишком мало игроков, добавляйтесь через /poker_reg',
  },

  pokerStopGroup: {
    cancelled: 'Игра в этом чате отменена',
    stopped: 'Игра в этом чате остановлена',
  },

  pokerStopPrivate: {
    notFound: 'Ты не в игре',
  },

  start: {
    help: md.join([
      'Вижу, ты хочешь поиграть в покер. Ну ладно, давай я расскажу тебе что тут к чему',
      md`Игра ведется по правилами ${md.link('техасского холдема', 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%85%D0%B0%D1%81%D1%81%D0%BA%D0%B8%D0%B9_%D1%85%D0%BE%D0%BB%D0%B4%D0%B5%D0%BC')}`,
      md`Как только игра начнется, обычная клавиатура заменится клавиатурой покера:\n\u2022 в первой строке отображаются карты, которые лежат на столе\n\u2022 во второй строке банк \u2014 сумма всех ставок за раунд\n\u2022 в третей строке твои карты и баланс\n\u2022 в четвертой строке доступные действия: ${pokerStrings.fold}, ${pokerStrings.check}, ${pokerStrings.call('Call')}, ${pokerStrings.allIn}`,
      md`Чтобы сделать ${pokerStrings.raise('Raise')}, напиши цифру в чат. Например, "100" если хочешь поставить ${pokerStrings.amount(100)}`,
    ], '\n\n'),
  },
};

/* istanbul ignore next */
export const pokerStickers = [
  'CAACAgIAAxkBAAIMTWLDXSBtPvO6simMAoERFOb3h4-qAAJcAQACPQ3oBAABMsv78bItBCkE',
  'CAACAgIAAxkBAAIMT2LDXUySk7O9FuUYLdM7nORoabV_AALCAQACPQ3oBHwoB5GHkvIFKQQ',
  'CAACAgIAAxkBAAIMUWLDXVSCyaYBKZQFGVveI7CLNWjMAAJdAQACPQ3oBCjTPR_2UH5lKQQ',
  'CAACAgIAAxkBAAIMU2LDXV2k1B076cTTsIgWyilmr_ghAAJ_AQACPQ3oBL3xcqmoMiUoKQQ',
  'CAACAgIAAxkBAAIMVWLDXWspvHxp5JHcTRpQAfkphWtTAAJtAQACPQ3oBAPQUbk0UsTDKQQ',
  'CAACAgIAAxkBAAIMV2LDXXN_e94VwKziZLJPU8eckphvAAJgAQACPQ3oBD7wHLpauaCSKQQ',
  'CAACAgIAAxkBAAIMWWLDXXuoAlTchSTDOLRdrQagAtP0AAJiAQACPQ3oBBvmwIFyEW94KQQ',
  'CAACAgIAAxkBAAIMW2LDXYN9bYFj0PqHKlloSiiftMoPAAJjAQACPQ3oBF9OWWqaPMdwKQQ',
  'CAACAgIAAxkBAAIMXWLDXY2ahRS7koafnU4Yl0HnUTDpAAKIAQACPQ3oBDsAAS_6ars-VikE',
  'CAACAgIAAxkBAAIMX2LDXZTN9o839TVq7mIsX0VN9xiaAAJ2AQACPQ3oBBoOXWSygkzpKQQ',
  'CAACAgIAAxkBAAIMYWLDXaBwflUtgQHDBEZs70t7BlXrAAJlAQACPQ3oBIxK4cJVO_rzKQQ',
  'CAACAgIAAxkBAAIMY2LDXadFKIz80734i5SKpPbUd1lrAAJmAQACPQ3oBOMh-z8iW4cZKQQ',
  'CAACAgIAAxkBAAIMZWLDXa-zTghjcu1TIUBFRNp1qeWMAAK9DwACrGJhSz84smHrO6AnKQQ',
  'CAACAgIAAxkBAAIMZ2LDXbYsRS1pD_Xcu73WoKwq7wYHAAKAAQACPQ3oBL68Ur71xkeYKQQ',
  'CAACAgIAAxkBAAIMaWLDXcEt40sRdxc3VvjfN_1IMW1zAAKJAQACPQ3oBBMynEeF7WTrKQQ',
  'CAACAgIAAxkBAAIMa2LDXc4nM_5Np3x6QrD_CSCbpl-0AALbAQACPQ3oBNXTF0r9yu1QKQQ',
  'CAACAgIAAxkBAAIMbWLDXdegBSxYOaZpZ0qARV2NSVc8AAJoAQACPQ3oBPKZwg2PgLtjKQQ',
  'CAACAgIAAxkBAAIMb2LDXeBpORwQHTGUSq2vz9FmZX-rAAJpAQACPQ3oBAsxDlXNEwfsKQQ',
  'CAACAgIAAxkBAAIMcWLDXexd3e8nxRzlnpCh-Z_AM77wAALFAQACPQ3oBOdBQtf1YCO8KQQ',
  'CAACAgIAAxkBAAIMc2LDXfNV9h_b37Mj7eNXbVYlaZqVAALGAQACPQ3oBGtCxtKbgRk6KQQ',
  'CAACAgIAAxkBAAIMdWLDXftIWvgGXI1T-I-Eso9xktcSAAIUDwAC1I9gS7jbkdj0UX0_KQQ',
  'CAACAgIAAxkBAAIMd2LDXgNDWOaasBf3jbd4U0ml3jwuAALHAQACPQ3oBImPywI120eBKQQ',
  'CAACAgIAAxkBAAIMeWLDXgnLZcTWTzBDUQuc55hHz9aVAALIAQACPQ3oBFsUWwfxOHQGKQQ',
  'CAACAgIAAxkBAAIMe2LDXhNSrRhQ_QSXel2fM6uHjRsmAAJwAQACPQ3oBOlvvpLr8GSDKQQ',
  'CAACAgIAAxkBAAIMfWLDXiWuhhzmm2kpoOY1LE5GeiJSAAKEAQACPQ3oBOJOJmhYTDa5KQQ',
  'CAACAgIAAxkBAAIMf2LDXi1NHJk41YbEguU5M6n_d0ZNAAJvAQACPQ3oBDl_KLt4Lr__KQQ',
  'CAACAgIAAxkBAAIMgWLDXjMVr_BAuZR_nUQIMKwswiScAALPAQACPQ3oBOq1YbIcdrpBKQQ',
  'CAACAgIAAxkBAAIMg2LDXjq2VYi_IzAHFfWpHeoqk9TdAALRAQACPQ3oBPCyBQkFuchBKQQ',
  'CAACAgIAAxkBAAIMhWLDXkgnbpzFJpVVHftJRF6fpbZQAALSAQACPQ3oBKjp5HArmLWkKQQ',
  'CAACAgIAAxkBAAIMh2LDXlERcSGu4Baxle-dopXzd-orAALcAQACPQ3oBICtXNrgvru7KQQ',
  'CAACAgIAAxkBAAIMiWLDXlnSFjOnWsnWvm76yUT6RRlmAAJkAQACPQ3oBEGiWtbfacslKQQ',
  'CAACAgIAAxkBAAIMi2LDXmBjd6MKG-kgqgYN_otPo_FbAALaAQACPQ3oBNsxsT2ikK1EKQQ',
  'CAACAgIAAxkBAAIMjWLDXmowx5-9ZN8Gzj-Ez23sZKsKAAKjEgACqnkgSw14_DlLut12KQQ',
  'CAACAgIAAxkBAAIMj2LDXnCypC-n3XUQhR8vLKSs7F3rAAIYAgACPQ3oBJNzRRBs0e2EKQQ',
  'CAACAgIAAxkBAAIMkWLDXnatRznIjJ-JSJB32skD98TrAAJ1AQACPQ3oBEkHbkq-4YzCKQQ',
  'CAACAgIAAxkBAAIMk2LDXn7F-R8qiM7QDxxICokfU0GHAAJ7AQACPQ3oBPsgbkxf4HM8KQQ',
  'CAACAgIAAxkBAAIMlWLDXoXPfsIsz3g5r_gsgw15SECAAAKBAQACPQ3oBLnOfh48iQp_KQQ',
  'CAACAgIAAxkBAAIMl2LDXozUwq_R1PXP7nzliTSsL8wqAAJxAQACPQ3oBAABqhpXPuJa7ikE',
  'CAACAgIAAxkBAAIMmWLDXpI34S1v_SJjyRgmrev0AjwpAAK8AQACPQ3oBJBamUlVUaclKQQ',
  'CAACAgIAAxkBAAIMm2LDXpvDjj0Ufann9Vuy52D7sUlcAAKZAQACPQ3oBGKkXWkgx0-uKQQ',
  'CAACAgIAAxkBAAIMnWLDXqLk0JOlKHA8D9AccfzjfYXBAALdAQACPQ3oBFUlsSoCYsBhKQQ',
  'CAACAgIAAxkBAAIMn2LDXqkGa1dK7PQgd3AJgHujxtD3AAJ9AQACPQ3oBNLcd9pLkjk0KQQ',
  'CAACAgIAAxkBAAIMoWLDXq9q8E1suAmHi6Lthj7EnBVuAALKAQACPQ3oBG3o1UNRSDDSKQQ',
  'CAACAgIAAxkBAAIMo2LDXrcdLM_ap9ObRjff5MxgSOCeAAIVAgACPQ3oBMMq3u2PiYE-KQQ',
  'CAACAgIAAxkBAAIMpWLDXr6thHT9SHGYX7E8bJJmYDt8AALOAQACPQ3oBM28-iDZHxfzKQQ',
  'CAACAgIAAxkBAAIMp2LDXsfZGeHJaGzWqCV8zOtXfBqRAALMAQACPQ3oBMBrXcbV0L2fKQQ',
  'CAACAgIAAxkBAAIMqWLDXs3aRdElD2lusmIZEkD82brIAAJbAQACPQ3oBCzzxHoKz5YEKQQ',
  'CAACAgIAAxkBAAIMq2LDXtNHyCMPpFJmsTR_fCxOHwv_AAJeAQACPQ3oBAaIJIYJMJDLKQQ',
  'CAACAgIAAxkBAAIMrWLDXtocDdtpYXQovvCETb4fLZ86AAJnAQACPQ3oBG34I0o6RZMGKQQ',
  'CAACAgIAAxkBAAIMr2LDXuBbzBlmDOWby_2imFFoMOmyAAJ_EAAC-VZgS5YaUypWFf_HKQQ',
];
