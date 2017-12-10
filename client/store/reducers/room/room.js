import db from '../../../firebase/db'
import history from '../../../history'

const READ_ROOM = 'READ_ROOM'
const ERROR_ROOM = 'ERROR_ROOM'
const SUBSCRIBE_ROOM = 'SUBSCRIBE_ROOM'

export const readRoom = status => ({ type: READ_ROOM, status })
export const errorRoom = err => ({ type: ERROR_ROOM, err })
export const subscribeRoom = ref => ({ type: SUBSCRIBE_ROOM, ref })

export const startGame = () =>
  async (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/numLoading`)
    const numLoading = (await ref.once('value')).val()
    if (numLoading) {
      dispatch(errorRoom('Please wait for all players to choose a name.'))
    } else {
      const gameStartedRef = db.ref(`${code}/gameStarted`)
      await gameStartedRef.set(true)
      dispatch(readRoom())
      history.push(`/host/${code}`)
    }
  }

export const subscribeToRoom = () =>
  async (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/gameStarted`).on('value', (snapshot) => {
      const gameStatus = snapshot.val()
      dispatch(readRoom(gameStatus))
    })
    dispatch(subscribeRoom(ref))
  }

const defaultState = {
  gameStarted: false,
  subscribed: null,
  err: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM:
      return { ...state, gameStarted: action.status }
    case ERROR_ROOM:
      return { ...state, err: action.err }
    case SUBSCRIBE_ROOM:
      return { ...state, subscribed: action.ref }
    default:
      return state
  }
}
