import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Marker,
  Whiteboard,
  Message,
  ChatInput,
  SendButton,
} from '../Whiteboard'
import {
  // ChatInput,
} from './ChatInput'

const Blue = Marker.extend`
  background-color: blue;
`

storiesOf('Atoms/Whiteboard', module)
  .add('Blue', () => <Blue />)
  .add('Whiteboard', () => <Whiteboard />)
  .add('Message', () => <Message message={{ author: 'tom', content: 'darn' }} />)
  .add('ChatInput', () => <ChatInput />)
  .add('SendButton', () => <SendButton />)
