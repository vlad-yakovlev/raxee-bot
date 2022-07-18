import { PokerCard } from './PokerCard';
import { PokerPlayer } from './PokerPlayer';

describe('#fromRaw', () => {
  test('should properly build from raw', () => {
    const player = PokerPlayer.fromRaw({} as any, {
      balance: 800,
      bet: 30,
      cards: [{ suit: 2, value: 3 }, { suit: 3, value: 4 }],
      folded: true,
      lost: true,
      turnMade: true,
      user: { id: 123 } as any,
    });

    expect(player.balance).toBe(800);
    expect(player.bet).toBe(30);
    expect(player.cards).toStrictEqual([new PokerCard(2, 3), new PokerCard(3, 4)]);
    expect(player.folded).toBe(true);
    expect(player.lost).toBe(true);
    expect(player.turnMade).toBe(true);
    expect(player.user).toStrictEqual({ id: 123 });
  });
});

describe('#toRaw', () => {
  test('should properly build raw', () => {
    const player = new PokerPlayer({} as any, { id: 123 } as any);
    player.balance = 800;
    player.bet = 30;
    player.cards = [new PokerCard(2, 3), new PokerCard(3, 4)];
    player.folded = true;
    player.lost = true;
    player.turnMade = true;

    expect(player.toRaw()).toStrictEqual({
      balance: 800,
      bet: 30,
      cards: [{ suit: 2, value: 3 }, { suit: 3, value: 4 }],
      folded: true,
      lost: true,
      turnMade: true,
      user: { id: 123 } as any,
    });
  });
});
