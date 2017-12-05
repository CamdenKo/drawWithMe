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
  async (dispatch) => {
    dispatch(readRoomCode(await firebaseCreateRoom()))
    dispatch(subscribeToPlayers())
  }

export const deleteRoom = () =>
  async (dispatch, getState) => {
    await firebaseDeleteRoom(getState().roomCode.roomCode)
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

export const unloadHost = () =>
  async (dispatch, getState) => {
    dispatch(deleteRoom())
  }

export const unload = () =>
  async (dispatch, getState) => {
    const state = getState()
    if (!state.roomCode.roomCode) return
    const code = state.roomCode.roomCode
    if (!state.user.nameSet) {
      const ref = db.ref(`${code}/numLoading`)
      const numLoading = (await ref.once('value')).val()
      await ref.set(numLoading - 1)
    } else {
      const ref = db.ref(`${code}/players`)
      const name = state.user.user.name
      if (Object.keys((await ref.once('value')).val()).length === 1) {
        await ref.set(false)
      } else {
        ref.orderByChild('name').equalTo(name).on('child_added', async (snapshot) => {
          await db.ref(`${code}/players/${snapshot.key}`).set(null)
        })
      }
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
