import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  Message,
} from '../../../components'

const Parent = styled.ul`
  height: 100%;
  list-style: none;
  width: 100%;
  overflow: scroll;
  padding: 0;
  margin: 0;
`

export class MessageGroup extends React.Component {
  constructor() {
    super()
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { chat } = this.props.chat
    return (
      <Parent>
        {
          chat.map(message => (
            <Message key={message.time} message={message} />
          ))
        }
        <div
          ref={(el) => { this.messagesEnd = el }}
        />
      </Parent>
    )
  }
}

const mapState = state => ({
  chat: state.chat,
})

export default connect(mapState)(MessageGroup)
