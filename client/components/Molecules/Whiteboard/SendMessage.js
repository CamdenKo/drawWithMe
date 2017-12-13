import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  sendMessage,
} from '../../../store'
import {
  ChatInput,
  SendButton,
} from '../../../components'

const Form = styled.form`
  display: flex;
`

export class SendMessage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    if (!this.state.value.length) return
    // this.props.sendMessage(this.state.value)
    this.setState({
      value: '',
    })
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <ChatInput
          onChange={this.onChange}
          value={this.state.value}
        />
        <SendButton
          type="submit"
          value="Send"
        />
      </Form>
    )
  }
}


const mapDispatch = dispatch => ({
  sendMessage: content => dispatch(sendMessage(content)),
})

export default connect(null, mapDispatch)(SendMessage)
