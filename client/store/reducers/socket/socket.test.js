import reducer, {
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

describe('socket reducer', () => {
  it('should return default state with default', () => {
    expect(reducer(undefined, {})).toEqual({})
  })
  it('should return socket with READ_SOCKET', () => {
    const fakeSocket = {
      socket: '12323',
    }
    expect(reducer(undefined, {
      type: READ_SOCKET,
      socket: fakeSocket,
    })).toEqual(fakeSocket)
  })
})
