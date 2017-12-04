export const READ_SOCKET = 'READ_SOCKET'

export const readSocket = socket => ({ type: READ_SOCKET, socket })

const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_SOCKET:
      return action.socket
    default:
      return state
  }
}
