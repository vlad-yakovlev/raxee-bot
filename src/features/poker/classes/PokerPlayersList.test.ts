import { PokerCard } from './PokerCard';
import { PokerPlayer } from './PokerPlayer';
import { PokerPlayersList } from './PokerPlayersList';

describe('#constructor', () => {
  it('should properly save players and index', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const playersList = new PokerPlayersList([player0, player1], 13);

    expect(playersList.players).toStrictEqual([player0, player1]);
    expect(playersList.index).toStrictEqual(13);
  });
});

describe('#fromRaw', () => {
  test('should properly build from raw', () => {
    const state = PokerPlayersList.fromRaw({} as any, {
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
    });

    expect(state.index).toStrictEqual(13);
    expect(state.players).toStrictEqual([
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
    ]);
  });
});

describe('#toRaw', () => {
  test('should properly build raw', () => {
    const playersList = new PokerPlayersList([
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

    expect(playersList.toRaw()).toStrictEqual({
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
    });
  });
});

describe('#current', () => {
  it('should return current player', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const playersList = new PokerPlayersList([player0, player1], 1);

    expect(playersList.current).toBe(player1);
  });
});

describe('#size', () => {
  it('should return players count', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const playersList = new PokerPlayersList([player0, player1], 1);

    expect(playersList.size).toBe(2);
  });
});

describe('#add', () => {
  it('should add player', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const playersList = new PokerPlayersList([player0], 1);
    playersList.add(player1);

    expect(playersList.players).toStrictEqual([player0, player1]);
  });
});

describe('#getPlayerByUserId', () => {
  it('should return player', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const playersList = new PokerPlayersList([player0, player1], 1);

    expect(playersList.getPlayerByUserId(123)).toStrictEqual(player0);
  });
});

describe('#toNext', () => {
  it('should find next in-game player', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const player2 = new PokerPlayer({} as any, { id: 456 } as any);
    player2.balance = 600;
    player2.bet = 300;
    player2.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player2.folded = false;
    player2.lost = false;
    player2.turnMade = false;

    const player3 = new PokerPlayer({} as any, { id: 654 } as any);
    player3.balance = 600;
    player3.bet = 300;
    player3.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player3.folded = false;
    player3.lost = false;
    player3.turnMade = false;

    const playersList = new PokerPlayersList([player0, player1, player2, player3], 3);
    playersList.toNext();

    expect(playersList.index).toBe(2);
  });
});

describe('#toIndex', () => {
  it('should set index', () => {
    const player0 = new PokerPlayer({} as any, { id: 123 } as any);
    player0.balance = 800;
    player0.bet = 30;
    player0.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player0.folded = true;
    player0.lost = false;
    player0.turnMade = true;

    const player1 = new PokerPlayer({} as any, { id: 321 } as any);
    player1.balance = 600;
    player1.bet = 300;
    player1.cards = [new PokerCard(0, 7), new PokerCard(5, 1)];
    player1.folded = false;
    player1.lost = true;
    player1.turnMade = false;

    const playersList = new PokerPlayersList([player0, player1], 13);
    playersList.toIndex(4);

    expect(playersList.index).toBe(4);
  });
});
