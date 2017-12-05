import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (ENV === 'dev' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/* eslint-enable */

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
export * from './reducers'
