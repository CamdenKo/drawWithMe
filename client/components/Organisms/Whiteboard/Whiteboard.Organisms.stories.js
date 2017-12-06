import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  ColoredWhiteboard,
} from '../Whiteboard'

storiesOf('Organisms/Whiteboard', module)
  .add('ColoredWhiteboard drawing', () => <ColoredWhiteboard drawing />)
