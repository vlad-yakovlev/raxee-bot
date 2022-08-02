import { PokerCard } from './PokerCard';
import { PokerPlayer } from './PokerPlayer';
import { PokerPlayersList } from './PokerPlayersList';
import { PokerState } from './PokerState';

describe('#fromRaw', () => {
  test('should properly build from raw', () => {
    const state = PokerState.fromRaw({} as any, {
      cards: [{ suit: 0, value: 1 }, { suit: 1, value: 2 }, { suit: 2, value: 3 }],
      cardsOpened: 2,
      firstPlayerIndex: 3,
      playersList: {
        index: 13,
        players: [
          {
            balance: 800,
            bet: 30,
            cards: [{ suit: 2, value: 3 }, { suit: 3, value: 4 }],
            folded: true,
            lost: false,
            turnMade: true,
            user: { id: 123 } as any,
          },
          {
            balance: 600,
            bet: 300,
            cards: [{ suit: 0, value: 7 }, { suit: 5, value: 1 }],
            folded: false,
            lost: true,
            turnMade: false,
            user: { id: 321 } as any,
          },
        ],
      },
      round: 44,
      started: true,
    });

    expect(state.cards).toStrictEqual([new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3)]);
    expect(state.cardsOpened).toBe(2);
    expect(state.firstPlayerIndex).toBe(3);
    expect(state.playersList).toStrictEqual(new PokerPlayersList([
      (() => {
        const player = new PokerPlayer({} as any, { id: 123 } as any);
        player.balance = 800;
        player.bet = 30;
        player.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
        player.folded = true;
        player.lost = false;
        player.turnMade = true;
        return player;
      })(),
      (() => {
        const player = new PokerPlayer({} as any, { id: 321 } as any);
        player.balance = 600;
        player.bet = 300;
        player.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
        player.folded = false;
        player.lost = true;
        player.turnMade = false;
        return player;
      })(),
    ], 13));
    expect(state.round).toBe(44);
    expect(state.started).toBe(true);
  });
});

describe('#toRaw', () => {
  test('should properly build raw', () => {
    const state = new PokerState({} as any);
    state.cards = [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3)];
    state.cardsOpened = 2;
    state.firstPlayerIndex = 3;
    state.playersList = new PokerPlayersList([
      (() => {
        const player = new PokerPlayer({} as any, { id: 123 } as any);
        player.balance = 800;
        player.bet = 30;
        player.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
        player.folded = true;
        player.lost = false;
        player.turnMade = true;
        return player;
      })(),
      (() => {
        const player = new PokerPlayer({} as any, { id: 321 } as any);
        player.balance = 600;
        player.bet = 300;
        player.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
        player.folded = false;
        player.lost = true;
        player.turnMade = false;
        return player;
      })(),
    ], 13);
    state.round = 44;
    state.started = true;

    expect(state.toRaw()).toStrictEqual({
      cards: [{ suit: 0, value: 1 }, { suit: 1, value: 2 }, { suit: 2, value: 3 }],
      cardsOpened: 2,
      firstPlayerIndex: 3,
      playersList: {
        index: 13,
        players: [
          {
            balance: 800,
            bet: 30,
            cards: [{ suit: 2, value: 3 }, { suit: 3, value: 4 }],
            folded: true,
            lost: false,
            turnMade: true,
            user: { id: 123 } as any,
          },
          {
            balance: 600,
            bet: 300,
            cards: [{ suit: 0, value: 7 }, { suit: 5, value: 1 }],
            folded: false,
            lost: true,
            turnMade: false,
            user: { id: 321 } as any,
          },
        ],
      },
      round: 44,
      started: true,
    });
  });
});
