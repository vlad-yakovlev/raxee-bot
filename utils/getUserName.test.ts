import { getUserName } from './getUserName.js'

describe('#getUserName', () => {
  it('should return username when presented', () => {
    const userName = getUserName({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: null,
      username: 'foo',
    })

    expect(userName).toBe('foo')
  })

  it('should return first and last name when no username presented', () => {
    const userName = getUserName({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: 'baz',
      username: null,
    })

    expect(userName).toBe('bar baz')
  })

  it('should return first name when no username and last name presented', () => {
    const userName = getUserName({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: null,
      username: null,
    })

    expect(userName).toBe('bar')
  })
})
