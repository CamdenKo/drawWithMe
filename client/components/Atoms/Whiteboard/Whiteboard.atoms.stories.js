import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Marker,
  Whiteboard,
} from '../Whiteboard'

const Blue = Marker.extend`
  background-color: blue;
`

storiesOf('Atoms/Whiteboard', module)
  .add('Blue', () => <Blue />)
  .add('Whiteboard', () => <Whiteboard />)
