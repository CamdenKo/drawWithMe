import db from '../../../firebase/db'
import {
  generateWord,
} from '../../../firebase/utils/utils'

const READ_WORD = 'READ_WORD'
const SUBSCRIBE_WORD = 'SUBSCRIBE_WORD'
const UNSUBSCRIBE_WORD = 'UNSUBSCRIBE_WORD'

export const readWord = word => ({ type: READ_WORD, word })
export const subscribeWord = ref => ({ type: SUBSCRIBE_WORD, ref })
export const unsubscribeWord = () => ({ type: UNSUBSCRIBE_WORD })

export const generateNewWord = () =>
  async (dispatch) => {
    dispatch(readWord(generateWord))
  }

export const subscribeToWords = () =>
  (dispatch, getState) => {
    if (getState().subscribed || !getState().roomCode.code) return
    const code = getState().roomCode.code
    const ref = db.ref(`${code}`)
    ref.on('value', (snapshot) => {
      const words = snapshot.val()
      const newestWord = words[words.length - 1]
      if (newestWord !== getState().word.word) {
        dispatch(readWord(newestWord))
      }
    })
    dispatch(subscribeWord(ref))
  }

export const unsubcribeToWords = () =>
  (dispatch, getState) => {
    if (!getState().subscribed) return
    getState().subscribed.off()
    dispatch(unsubscribeWord())
  }

export const defaultState = {
  subscribed: null, // firebase database ref
  word: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_WORD:
      return { ...state, word: action.word }
    case SUBSCRIBE_WORD:
      return { ...state, subscribed: action.ref }
    case UNSUBSCRIBE_WORD:
      return { ...state, subscribed: null }
    default:
      return state
  }
}
