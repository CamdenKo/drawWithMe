import React from 'react'
import { storiesOf } from '@storybook/react'
import store, { readRoom } from '../../store'

import {
  JoinRoom,
  Loading,
  CreatedRoom,
} from '../Screens'
import { Home } from './Home';
import { JoinedRoom } from './JoinedRoom'

store.dispatch(readRoom({ key: 123456, error: 'none', users: { 123333: 'sam' } }))

storiesOf('Screens', module)
  .add('JoinRoom', () => <JoinRoom />)
  .add('CreatedRoom', () => <CreatedRoom />)
  .add('Home', () => <Home />)
  .add('JoinedRoom', () => <JoinedRoom />)
  .add('Loading', () => <Loading />)
