import React from 'react'
import styled from 'styled-components'

import {
  SendMessage,
  MessageGroup,
} from '../../../components'

const Parent = styled.main`
  display: flex;
  height: 100%;
  flex-direction: column;
`

export default () => (
  <Parent>
    <MessageGroup />
    <SendMessage />
  </Parent>
)
