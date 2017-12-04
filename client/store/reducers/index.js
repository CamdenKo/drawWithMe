import {
  combineReducers,
} from 'redux'

import roomCode from './roomCode/roomCode'
import word from './word/word'

const reducer = combineReducers({
  roomCode,
  word,
})

export default reducer
export * from './roomCode/roomCode'
export * from './word/word'
