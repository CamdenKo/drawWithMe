import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  PlayerCardBackground,
} from '../Players'

storiesOf('Atoms/Players', module)
  .add('PlayerCardBackground', () => <PlayerCardBackground>TEXT</PlayerCardBackground>)
