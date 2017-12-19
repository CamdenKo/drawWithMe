import db from '../../../firebase/db'
import history from '../../../history'
import { generateNewWord } from '../../index';

const READ_ROOM = 'READ_ROOM'
const ERROR_ROOM = 'ERROR_ROOM'
const SUBSCRIBE_ROOM = 'SUBSCRIBE_ROOM'

export const readRoom = gameStarted => ({ type: READ_ROOM, gameStarted })
export const errorRoom = err => ({ type: ERROR_ROOM, err })
export const subscribeRoom = ref => ({ type: SUBSCRIBE_ROOM, ref })

const setPlayerAsDrawer = async (code, playerIndex) => {
  const playersRef = db.ref(`${code}/players`)
  const playersValue = (await playersRef.once('value')).val()
  const playerKey = Object.keys(playersValue)[playerIndex]
  const updatedPlayer = { ...playersValue[playerKey], drawer: true }
  const newPlayersValue = {
    ...playersValue,
    [playerKey]: updatedPlayer,
  }
  await playersRef.set(newPlayersValue)
}

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
      await setPlayerAsDrawer(code, 1)
      dispatch(generateNewWord())
      // GENERATE WORD
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
      return { ...state, gameStarted: action.gameStarted }
    case ERROR_ROOM:
      return { ...state, err: action.err }
    case SUBSCRIBE_ROOM:
      return { ...state, subscribed: action.ref }
    default:
      return state
  }
}
