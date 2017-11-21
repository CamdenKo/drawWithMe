import React from 'react'
import { storiesOf } from '@storybook/react'
import store, { readRoom } from '../../store'

import {
  JoinRoom,
  CreatedRoom,
} from '../Screens'
import { Home } from './Home';

store.dispatch(readRoom({ key: 123456 }))
storiesOf('Screens', module)
  .add('JoinRoom', () => <JoinRoom />)
  .add('CreatedRoom', () => <CreatedRoom />)
  .add('Home', () => <Home />)
