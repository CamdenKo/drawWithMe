import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import room from './room/room'
import socket from './socket/socket'
import socketSubscriptions from './socketSubscriptions'

const reducer = combineReducers({
  room,
  socket,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true }),
))
const store = createStore(reducer, middleware)
socketSubscriptions(store)

export default store
export * from './room/room'
export * from './socket/socket'
