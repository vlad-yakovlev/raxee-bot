import { BotError, Context } from 'grammy'
import { handleError } from './handleError.js'

afterEach(() => {
  jest.spyOn(global.console, 'error').mockRestore()
})

describe('#handleError', () => {
  it('should console error and send reply', async () => {
    const error = new Error('some error')

    const consoleError = jest.fn()
    const reply = jest.fn()

    jest.spyOn(global.console, 'error').mockImplementation(consoleError)

    await handleError(
      new BotError(error, {
        reply,
        update: { update_id: 12345 },
      } as unknown as Context),
    )

    expect(consoleError).toHaveBeenCalledTimes(1)
    expect(consoleError).toHaveBeenCalledWith(
      'Error while handling update 12345:',
      error,
    )

    expect(reply).toHaveBeenCalledTimes(1)
    expect(reply).toHaveBeenCalledWith('Something went wrong ¯\\_(ツ)_/¯')
  })

  it('should handle send reply error', async () => {
    const error = new Error('some error')
    const replyError = new Error('reply error')

    const consoleError = jest.fn()
    const reply = jest.fn().mockImplementation(() => {
      throw replyError
    })

    jest.spyOn(global.console, 'error').mockImplementation(consoleError)

    await handleError(
      new BotError(error, {
        reply,
        update: { update_id: 12345 },
      } as unknown as Context),
    )

    expect(consoleError).toHaveBeenCalledTimes(2)
    expect(consoleError.mock.calls[0]).toStrictEqual([
      'Error while handling update 12345:',
      error,
    ])
    expect(consoleError.mock.calls[1]).toStrictEqual([replyError])

    expect(reply).toHaveBeenCalledTimes(1)
    expect(reply).toHaveBeenCalledWith('Something went wrong ¯\\_(ツ)_/¯')
  })
})
