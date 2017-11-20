import React from 'react';
import { configure, addDecorator } from '@storybook/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import store from '../client/store'
import history from '../client/history'

const req = require.context('../client/components', true, /\.stories\.js$/)

const loadStories = () => req.keys().forEach(file => req(file))

addDecorator(story => (
  <Provider store={store}><Router history={history}>{story()}</Router></Provider>
))
configure(loadStories, module)
