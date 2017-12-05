import db from '../../../firebase/db'
import {
  createRoom as firebaseCreateRoom,
  deleteRoom as firebaseDeleteRoom,
} from '../../../firebase/utils/utils'
import {
  subscribeToPlayers,
} from '../../../store'

const READ_ROOM_CODE = 'READ_ROOM_CODE'
const DELETE_ROOM_CODE = 'DELETE_ROOM_CODE'
const ERROR_ROOM_CODE = 'ERROR_ROOM_CODE'
const LOADING_ROOM_CODE = 'LOADING_ROOM_CODE'

export const readRoomCode = code => ({ type: READ_ROOM_CODE, code })
export const deleteRoomCode = () => ({ type: DELETE_ROOM_CODE })
export const errorRoomCode = err => ({ type: ERROR_ROOM_CODE, err })
export const loadingRoomCode = () => ({ type: LOADING_ROOM_CODE })

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
    dispatch(loadingRoomCode())
    const ref = await db.ref(`${code}`).once('value')
    if (ref.val()) {
      dispatch(readRoomCode(code))
      const numLoadingRef = db.ref(`${code}/numLoading`)
      const numLoading = await numLoadingRef.once('value')
      if (numLoading.val() === null) {
        await numLoadingRef.set(1)
      } else {
        await numLoadingRef.set(numLoading.val() + 1)
      }
      dispatch(subscribeToPlayers())
    } else {
      dispatch(errorRoomCode(`Doesn't seem to be a room at ${code}. Try again?`))
    }
  }

const defaultState = {
  roomCode: '',
  err: '',
  loading: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM_CODE:
      return { ...state, roomCode: action.code, err: null, loading: false }
    case DELETE_ROOM_CODE:
      return { ...state, roomCode: '', err: null, loading: false }
    case ERROR_ROOM_CODE:
      return { ...state, err: action.err, loading: false }
    case LOADING_ROOM_CODE:
      return { ...state, loading: true }
    default:
      return state
  }
}
