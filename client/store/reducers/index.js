import {
  combineReducers,
} from 'redux'

import chat from './chat/chat'
import guesses from './guesses/guesses'
import room from './room/room'
import user from './user/user'
import roomCode from './roomCode/roomCode'
import word from './word/word'
import players from './players/players'
import drawing from './drawing/drawing'

const reducer = combineReducers({
  chat,
  guesses,
  room,
  user,
  roomCode,
  players,
  word,
  drawing,
})

export default reducer
export * from './roomCode/roomCode'
export * from './word/word'
export * from './chat/chat'
export * from './guesses/guesses'
export * from './room/room'
export * from './user/user'
export * from './players/players'
export * from './drawing/drawing'
