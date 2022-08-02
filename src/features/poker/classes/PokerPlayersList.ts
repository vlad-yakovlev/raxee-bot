import { PokerContext } from '../types';

import { PokerPlayer, PokerPlayerRaw } from './PokerPlayer';

export interface PokerPlayersListRaw {
  index: number
  players: PokerPlayerRaw[]
}

export class PokerPlayersList {
  constructor(public players: PokerPlayer[], public index: number) {}

  static fromRaw(ctx: PokerContext, raw: PokerPlayersListRaw) {
    return new PokerPlayersList(
      raw.players.map((rawPlayer) => PokerPlayer.fromRaw(ctx, rawPlayer)),
      raw.index,
    );
  }

  toRaw(): PokerPlayersListRaw {
    return {
      index: this.index,
      players: this.players.map((player) => player.toRaw()),
    };
  }

  get current() {
    return this.players[this.index];
  }

  get size() {
    return this.players.length;
  }

  add(player: PokerPlayer) {
    this.players.push(player);
  }

  getPlayerByUserId(userId: number) {
    return this.players.find((player) => player.user.id === userId);
  }

  toNext() {
    do {
      this.index += 1;
      this.index %= this.players.length;
    } while (this.current.lost || this.current.folded);
  }

  toIndex(index: number) {
    this.index = index;
  }
}
