import {
  readSocket,
  READ_SOCKET,
} from './socket'

describe('socket actions', () => {
  const fakeSocket = {
    socket: 'woot',
  }
  it('should create action with READ_SOCKET', () => {
    expect(readSocket(fakeSocket)).toEqual({ type: READ_SOCKET, socket: fakeSocket })
  })
})
