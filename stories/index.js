import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { ThemeProvider } from 'styled-components'

import store from '../client/store'
import history from '../client/history'
import theme from '../client/theme'

const req = require.context('../client/components', true, /\.stories\.js$/)

const loadStories = () => req.keys().forEach(file => req(file))

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Provider store={store}><Router history={history}>{story()}</Router></Provider>
  </ThemeProvider>
))
configure(loadStories, module)
