import db from '../../../firebase/db'
import history from '../../../history'

const READ_ROOM = 'READ_ROOM'
const ERROR_ROOM = 'ERROR_ROOM'

export const readRoom = () => ({ type: READ_ROOM })
export const errorRoom = err => ({ type: ERROR_ROOM, err })

export const startGame = () =>
  async (dispatch, getState) => {
    const state = getState()
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/numLoading`)
    const numLoading = (await ref.once('value')).val()
    if (numLoading) {
      dispatch(errorRoom('Please wait for all players to choose a name.'))
    } else {
      const gameStartedRef = db.ref(`${code}/players/gameStarted`)
      await gameStartedRef.set(true)
      dispatch(readRoom())
      history.push(`/createdRoom/${code}`)
    }
  }

const defaultState = {
  gameStarted: false,
  err: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_ROOM:
      return { ...state, gameStarted: true }
    case ERROR_ROOM:
      return { ...state, err: action.err }
    default:
      return state
  }
}
