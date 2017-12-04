import {
  combineReducers,
} from 'redux'

import room from './room/room'
import socket from './socket/socket'

const reducer = combineReducers({
  room,
  socket,
})

export default reducer
