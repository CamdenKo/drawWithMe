export const READ_ROOM = 'READ_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'
export const ERROR_ROOM = 'ERROR_ROOM'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_NAME_ERROR = 'CHANGE_NAME_ERROR'
export const LOAD_ROOM = 'LOAD_ROOM'

export const readRoom = room => ({ type: READ_ROOM, room })
export const updateRoom = room => ({ type: UPDATE_ROOM, room })
export const deleteRoom = () => ({ type: DELETE_ROOM })
export const errorRoom = err => ({ type: ERROR_ROOM, err })
export const changeName = () => ({ type: CHANGE_NAME })
export const changeNameError = () => ({ type: CHANGE_NAME_ERROR })
export const loadRoom = () => ({ type: LOAD_ROOM })

export const requestCreateRoom = socket =>
  () => {
    socket.emit('requestCreateRoom')
  }

export const requestChangeName = (socket, name) =>
  () => {
    socket.emit('requestChangeName', { name })
  }

export const requestJoinRoom = (socket, key) =>
  (dispatch) => {
    dispatch(loadRoom())
    socket.emit('requestJoinRoom', { key })
  }

export const defaultState = {
  users: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM:
      return Object.assign({}, state, action.room)
    case UPDATE_ROOM:
      return Object.assign({}, state, action.room)
    case DELETE_ROOM:
      return defaultState
    case ERROR_ROOM:
      return Object.assign({}, state)
    case CHANGE_NAME:
      return Object.assign({}, state)
    case CHANGE_NAME_ERROR:
      return Object.assign({}, state)
    case LOAD_ROOM:
      return { ...state }
    default:
      return state
  }
}
