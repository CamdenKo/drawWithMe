import db from '../../../firebase/db'

const READ_PLAYERS = 'READ_PLAYERS'
const ERROR_PLAYERS = 'ERROR_PLAYERS'
const SUBSCRIBE_PLAYERS = 'SUBSCRIBE_PLAYERS'
const READ_NUM_LOADING = 'READ_NUM_LOADING'
const SUBSCRIBE_NUM_LOADING = 'SUBSCRIBE_NUM_LOADING'

export const readPlayers = players => ({ type: READ_PLAYERS, players })
export const errorPlayers = err => ({ type: ERROR_PLAYERS, err })
export const subscribePlayers = ref => ({ type: SUBSCRIBE_PLAYERS, ref })
export const readNumLoading = numLoading => ({ type: READ_NUM_LOADING, numLoading })
export const subscribeNumLoading = ref => ({ type: SUBSCRIBE_NUM_LOADING, ref })

export const subscribeToPlayers = () =>
  (dispatch, getState) => {
    const state = getState()
    if (state.players.subscribed) return
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/players`)
    ref.on('value', (snapshot) => {
      const users = snapshot.val() || {}
      const players = Object.values(users)
        .filter(val => typeof val === 'object')
      dispatch(readPlayers(players))
    })
    db.ref(`${code}/numLoading`).on('value', (snapshot) => {
      const numLoading = snapshot.val()
      dispatch(readNumLoading(numLoading))
    })
    dispatch(subscribePlayers(ref))
  }

const defaultState = {
  subscribed: null,
  numLoadingSubscribed: null,
  players: [],
  numLoading: 0,
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
    case READ_NUM_LOADING:
      return { ...state, numLoading: action.numLoading }
    case SUBSCRIBE_NUM_LOADING:
      return { ...state, numLoadingSubscribed: action.ref }
  }
}
