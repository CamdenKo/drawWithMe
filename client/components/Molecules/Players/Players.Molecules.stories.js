import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  PlayerList,
} from '../Players'

storiesOf('Molecules/Players', module)
  .add('PlayerList', () => <PlayerList />)
