import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { ThemeProvider } from 'styled-components'

import store, {
  readRoomCode, subscribeToMessages, readUser,
} from '../client/store'
import history from '../client/history'
import theme from '../client/theme'

const req = require.context('../client/components', true, /\.stories\.js$/)

console.log(req.keys())

const loadStories = () => req.keys().forEach(file => req(file))

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Provider store={store}><Router history={history}>{story()}</Router></Provider>
  </ThemeProvider>
))

const setupRedux = () => {
  store.dispatch(readRoomCode('test'))
  store.dispatch(readUser({
    name: 'testUser',
  }))
  store.dispatch(subscribeToMessages())
}

setupRedux()
configure(loadStories, module)
