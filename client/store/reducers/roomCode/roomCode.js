import db from '../../../firebase/db'

import {
  createRoom as firebaseCreateRoom,
  deleteRoom as firebaseDeleteRoom,
} from '../../../firebase/utils/utils'

const READ_ROOM_CODE = 'READ_ROOM_CODE'
const DELETE_ROOM_CODE = 'DELETE_ROOM_CODE'
const ERROR_ROOM_CODE = 'ERROR_ROOM_CODE'

export const readRoomCode = code => ({ type: READ_ROOM_CODE, code })
export const deleteRoomCode = () => ({ type: DELETE_ROOM_CODE })
export const errorRoomCode = err => ({ type: ERROR_ROOM_CODE, err })

export const createRoom = () =>
  async dispatch =>
    dispatch(readRoomCode(await firebaseCreateRoom()))

export const deleteRoom = () =>
  async (dispatch, getState) => {
    await firebaseDeleteRoom(getState().roomCode)
    dispatch(deleteRoomCode())
  }

export const joinRoom = code =>
  async (dispatch) => {
    const ref = await db.ref(`${code}`).once()
    if (ref.val()) {
      dispatch(readRoomCode(code))
    } else {
      dispatch(errorRoomCode(`Doesn't seem to be a room at ${code}. Try again?`))
    }
  }

const defaultState = {
  roomCode: '',
  err: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM_CODE:
      return { ...state, roomCode: action.code, err: null }
    case DELETE_ROOM_CODE:
      return { ...state, roomCode: '', err: null }
    case ERROR_ROOM_CODE:
      return { ...state, err: action.err }
    default:
      return state
  }
}
