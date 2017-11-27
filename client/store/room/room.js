import history from '../../history'

export const READ_ROOM = 'READ_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'
export const ERROR_ROOM = 'ERROR_ROOM'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_NAME_ERROR = 'CHANGE_NAME_ERROR'

export const readRoom = room => ({ type: READ_ROOM, room })
export const updateRoom = room => ({ type: UPDATE_ROOM, room })
export const deleteRoom = () => ({ type: DELETE_ROOM })
export const errorRoom = err => ({ type: ERROR_ROOM, err })
export const changeName = () => ({ type: CHANGE_NAME })
export const changeNameError = () => ({ type: CHANGE_NAME_ERROR })

export const requestCreateRoom = socket =>
  () => {
    socket.emit('requestCreateRoom')
  }

export const requestChangeName = (socket, name) =>
  () => {
    socket.emit('requestChangeName', { name })
  }

export const successJoinRoom = room =>
  (dispatch) => {
    dispatch(readRoom(room))
    history.push(`/room/${room.key}`)
  }

const defaultState = {
  users: {},
  nameChanged: '',
  error: false,
}

const noError = { error: true }

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM:
      return Object.assign({}, state, action.room, noError)
    case UPDATE_ROOM:
      return Object.assign({}, state, action.room, noError)
    case DELETE_ROOM:
      return defaultState
    case ERROR_ROOM:
      return Object.assign({}, state, { error: true })
    case CHANGE_NAME:
      return Object.assign({}, state, { nameChanged: 'success' }, noError)
    case CHANGE_NAME_ERROR:
      return Object.assign({}, state, { nameChanged: 'error' }, noError)
    default:
      return state
  }
}
