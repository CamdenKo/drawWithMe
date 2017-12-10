import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  MarkerGroup,
} from '../Whiteboard'
import { MessageGroup } from './MessageGroup';

const chat = {
  chat: new Array(30).fill({
    author: 'sam',
    content: 'asb',
  }),
}

storiesOf('Molecules/Whiteboard', module)
  .add('MarkerGroup', () => <MarkerGroup onClick={action} />)
  .add('MessageGroup', () => <MessageGroup chat={chat} />)
