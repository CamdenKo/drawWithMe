import db from '../../../firebase/db'

const READ_PLAYERS = 'READ_PLAYERS'
const ERROR_PLAYERS = 'ERROR_PLAYERS'
const SUBSCRIBE_PLAYERS = 'SUBSCRIBE_PLAYERS'

export const readPlayers = players => ({ type: READ_PLAYERS, players })
export const errorPlayers = err => ({ type: ERROR_PLAYERS, err })
export const subscribePlayers = ref => ({ type: SUBSCRIBE_PLAYERS, ref })

export const subscribeToPlayers = () =>
  (dispatch, getState) => {
    const state = getState()
    if (state.players.subscribed) return
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/players`)
    ref.on('value', (snapshot) => {
      const users = snapshot.val()
      dispatch(readPlayers(Object.values(users)))
    })
    dispatch(subscribePlayers(ref))
  }

const defaultState = {
  subscribed: null,
  players: [],
  err: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
    case READ_PLAYERS:
      return { ...state, players: action.players, err: '' }
    case ERROR_PLAYERS:
      return { ...state, err: action.err }
    case SUBSCRIBE_PLAYERS:
      return { ...state, subscribed: action.ref }
  }
}
