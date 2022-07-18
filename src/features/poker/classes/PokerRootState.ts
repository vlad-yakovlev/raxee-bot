import { PokerContext } from '../types';

export interface PokerRootStateRaw {
  lobbies: Record<string, {
    id: number
    userIds: number[]
  }>;
}

export class PokerRootState {
  lobbies: PokerRootStateRaw['lobbies'] = {};

  constructor(public ctx: PokerContext) {}

  static fromRaw(ctx: PokerContext, raw: PokerRootStateRaw) {
    const instance = new PokerRootState(ctx);
    instance.lobbies = raw.lobbies;
    return instance;
  }

  toRaw(): PokerRootStateRaw {
    return {
      lobbies: this.lobbies,
    };
  }

  get lobbyByGroup() {
    if (this.ctx.chat!.type === 'private') {
      throw new Error('lobbyByGroup called in private chat');
    }

    if (!this.lobbies[this.ctx.chat!.id]) {
      this.lobbies[this.ctx.chat!.id] = {
        id: this.ctx.chat!.id,
        userIds: [],
      };
    }

    return this.lobbies[this.ctx.chat!.id];
  }

  get lobbyByUser() {
    return Object.values(this.lobbies).find((lobby) => lobby.userIds.includes(this.ctx.from!.id));
  }

  get lobby() {
    return this.ctx.chat!.type === 'private' ? this.lobbyByUser : this.lobbyByGroup;
  }

  addUserToLobby() {
    this.lobbyByGroup.userIds.push(this.ctx.from!.id);
  }

  resetLobby() {
    if (this.lobby) {
      this.lobby.userIds = [];
    }
  }
}
