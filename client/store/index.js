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

const reducer = combineReducers({
  room,
  socket,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true }),
))
const store = createStore(reducer, middleware)

export default store
export * from './room/room'
export * from './socket/socket'
