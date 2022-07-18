import { PokerRootState } from './PokerRootState';

describe('#fromRaw', () => {
  test('should properly build from raw', () => {
    const state = PokerRootState.fromRaw({} as any, {
      lobbies: {
        123: {
          id: 123,
          userIds: [456, 789],
        },
        321: {
          id: 321,
          userIds: [321, 321],
        },
      },
    });

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    });
  });
});

describe('#toRaw', () => {
  test('should properly build raw', () => {
    const state = new PokerRootState({} as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.toRaw()).toStrictEqual({
      lobbies: {
        123: {
          id: 123,
          userIds: [456, 789],
        },
        321: {
          id: 321,
          userIds: [321, 321],
        },
      },
    });
  });
});

describe('#lobbyByGroup', () => {
  test('should throw error for private chat', () => {
    const state = new PokerRootState({ chat: { type: 'private' } } as any);
    expect(() => state.lobbyByGroup).toThrow(new Error('lobbyByGroup called in private chat'));
  });

  test('should return existing lobby when lobby exits', () => {
    const state = new PokerRootState({ chat: { id: 123 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobbyByGroup).toStrictEqual({
      id: 123,
      userIds: [456, 789],
    });
  });

  test('should create and return new lobby when lobby not exits', () => {
    const state = new PokerRootState({ chat: { id: 456 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobbyByGroup).toStrictEqual({
      id: 456,
      userIds: [],
    });

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
      456: {
        id: 456,
        userIds: [],
      },
    });
  });
});

describe('#lobbyByUser', () => {
  test('should return lobby when user added', () => {
    const state = new PokerRootState({ from: { id: 456 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobbyByUser).toStrictEqual({
      id: 123,
      userIds: [456, 789],
    });
  });

  test('should return undefined when user not added', () => {
    const state = new PokerRootState({ from: { id: 555 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobbyByUser).toBe(undefined);
  });
});

describe('#lobby', () => {
  test('should return user lobby when chat is private and user added', () => {
    const state = new PokerRootState({ chat: { type: 'private' }, from: { id: 456 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobby).toStrictEqual({
      id: 123,
      userIds: [456, 789],
    });
  });

  test('should return undefined when chat is private and user not added', () => {
    const state = new PokerRootState({ chat: { id: 123, type: 'private' }, from: { id: 555 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobby).toBe(undefined);
  });

  test('should return existing chat lobby when chat is no private and lobby exits', () => {
    const state = new PokerRootState({ chat: { id: 123 }, from: { id: 321 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobby).toStrictEqual({
      id: 123,
      userIds: [456, 789],
    });
  });

  test('should create and return new chat lobby when chat is no private and lobby not exits', () => {
    const state = new PokerRootState({ chat: { id: 456 }, from: { id: 321 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    expect(state.lobby).toStrictEqual({
      id: 456,
      userIds: [],
    });

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
      456: {
        id: 456,
        userIds: [],
      },
    });
  });
});

describe('#addUserToLobby', () => {
  test('should throw error for private chat', () => {
    const state = new PokerRootState({ chat: { id: 555, type: 'private' }, from: { id: 555 } } as any);
    expect(() => state.lobbyByGroup).toThrow(new Error('lobbyByGroup called in private chat'));
  });

  test('should add user to existing lobby when lobby exits', () => {
    const state = new PokerRootState({ chat: { id: 123 }, from: { id: 555 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    state.addUserToLobby();

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789, 555],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    });
  });

  test('should create new lobby when lobby not exits', () => {
    const state = new PokerRootState({ chat: { id: 456 }, from: { id: 555 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    state.addUserToLobby();

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
      456: {
        id: 456,
        userIds: [555],
      },
    });
  });
});

describe('#resetLobby', () => {
  test('should reset user lobby when chat is private and user added', () => {
    const state = new PokerRootState({ chat: { type: 'private' }, from: { id: 456 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    state.resetLobby();

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    });
  });

  test('should do nothing when chat is private and user not added', () => {
    const state = new PokerRootState({ chat: { id: 123, type: 'private' }, from: { id: 555 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    state.resetLobby();

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    });
  });

  test('should reset existing chat lobby when chat is no private and lobby exits', () => {
    const state = new PokerRootState({ chat: { id: 123 }, from: { id: 321 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    state.resetLobby();

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    });
  });

  test('should create new chat lobby when chat is no private and lobby not exits', () => {
    const state = new PokerRootState({ chat: { id: 456 }, from: { id: 321 } } as any);
    state.lobbies = {
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
    };

    state.resetLobby();

    expect(state.lobbies).toStrictEqual({
      123: {
        id: 123,
        userIds: [456, 789],
      },
      321: {
        id: 321,
        userIds: [321, 321],
      },
      456: {
        id: 456,
        userIds: [],
      },
    });
  });
});
