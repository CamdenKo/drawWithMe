import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  MarkerGroup,
} from '../Whiteboard'

storiesOf('Molecules/Whiteboard', module)
  .add('MarkerGroup', () => <MarkerGroup onClick={action} />)
