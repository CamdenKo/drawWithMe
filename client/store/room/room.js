export const READ_ROOM = 'READ_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'
export const ERROR_ROOM = 'ERROR_ROOM'

export const readRoom = room => ({ type: READ_ROOM, room })
export const updateRoom = room => ({ type: UPDATE_ROOM, room })
export const deleteRoom = () => ({ type: DELETE_ROOM })
export const errorRoom = err => ({ type: ERROR_ROOM, err })

export const successJoinRoom = socket =>
  (dispatch) => {
    socket.on('successJoinRoom', ({ room }) => {
      dispatch(readRoom(room))
    })
  }

export const errorJoinRoom = socket =>
  (dispatch) => {
    socket.on('errorJoinRoom', ({ err }) => {
      dispatch(errorRoom(err))
    })
  }

export const successCreateRoom = socket =>
  (dispatch) => {
    socket.on('successCreateRoom', ({ room }) => {
      dispatch(readRoom(room))
    })
  }

export const requestCreateRoom = socket =>
  () => {
    socket.emit('requestCreateRoom')
  }

export const requestJoinRoom = (socket, key) =>
  () => {
    socket.emit('requestJoinRoom', { key })
  }
const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM:
      return action.room
    case UPDATE_ROOM:
      return Object.assign({}, state, action.room)
    case DELETE_ROOM:
      return defaultState
    default:
      return state
  }
}
