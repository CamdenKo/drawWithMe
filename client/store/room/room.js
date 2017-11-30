export const READ_ROOM = 'READ_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'
export const CHANGE_NAME = 'CHANGE_NAME'

export const readRoom = room => ({ type: READ_ROOM, room })
export const updateRoom = room => ({ type: UPDATE_ROOM, room })
export const deleteRoom = () => ({ type: DELETE_ROOM })
export const changeName = () => ({ type: CHANGE_NAME })

export const requestCreateRoom = socket =>
  () => {
    socket.emit('requestCreateRoom')
  }

export const requestChangeName = (socket, name) =>
  () => {
    socket.emit('requestChangeName', { name })
  }

export const requestJoinRoom = (socket, key) =>
  () => {
    socket.emit('requestJoinRoom', { key })
  }

export const defaultState = {
  users: {},
  changedName: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM:
      return Object.assign({}, state, action.room)
    case UPDATE_ROOM:
      return Object.assign({}, state, action.room)
    case DELETE_ROOM:
      return defaultState
    case CHANGE_NAME:
      return { ...state, changedName: true }
    default:
      return state
  }
}
