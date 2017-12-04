import db from '../../../firebase/db'

const READ_GUESS = 'READ_GUESS'
const READ_GUESSES = 'READ_GUESSES'
const CLEAR_GUESSES = 'CLEAR_GUESSES'
const SUBSCRIBE_GUESSES = 'SUBSCRIBE_GUESSES'
const UNSUBSCRIBE_GUESSES = 'UNSUBSCRIBE_GUESSES'

export const readGuess = guess => ({ type: READ_GUESS, guess })
export const readGuesses = guesses => ({ type: READ_GUESSES, guesses })
export const clearGuesses = () => ({ type: CLEAR_GUESSES })
export const subscribeGuesses = ref => ({ type: SUBSCRIBE_GUESSES, ref })
export const unsubscribeGuesses = () => ({ type: UNSUBSCRIBE_GUESSES })

const generateGuess = (word, state) => ({
  id: state.user.id,
  name: state.user.name,
  word,
  correct: state.word.word === word,
})

export const postGuess = guess =>
  async (dispatch, getState) => {
    const state = getState()
    const ref = db.ref(`${state.roomCode.roomCode}/guesses`)
    const toAppend = generateGuess(guess, state)
    await ref.push(toAppend)
    dispatch(readGuess(toAppend))
  }

export const subscribeToGuesses = () =>
  (dispatch, getState) => {
    const state = getState()
    if (state.guesses.subscribed) return
    const code = state.roomCode.roomCode
    const ref = db.ref(`${code}/guesses`)
    ref.on('value', (snapshot) => {
      const guesses = snapshot.val()
      if (Array.isArray(guesses)) {
        dispatch(readGuesses(guesses))
      } else {
        dispatch(readGuess(Object.values(guesses)))
      }
    })
    dispatch(subscribeGuesses(ref))
  }

export const unsubscribeToGuesses = () =>
  (dispatch, getState) => {
    if (!getState().guesses.subscribed) return
    getState().guesses.subscribed.off()
    dispatch(unsubscribeGuesses())
  }

const defaultState = {
  subscribed: null,
  guesses: [],
  /**
   * {
   *  id: userID, string
   *  name, string
   *  word, string
   *  correct, bool
   * }
   */
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_GUESS:
      return { ...state, guesses: [...state.guesses, action.guess] }
    case READ_GUESSES:
      return { ...state, guesses: action.guesses }
    case CLEAR_GUESSES:
      return { ...state, guesses: [] }
    case SUBSCRIBE_GUESSES:
      return { ...state, subscribed: action.ref }
    case UNSUBSCRIBE_GUESSES:
      return { ...state, subscribed: null }
    default:
      return state
  }
}
