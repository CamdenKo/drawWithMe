import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  sendMessage,
} from '../../../store'

const Input = styled.input`
  width: 100%;
`

class ChatInput extends React.Component {
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
    if (!this.state.value) return
    this.props.sendMessage(this.state.value)
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
      <form onSubmit={this.onSubmit}>
        <Input
          onChange={this.onChange}
          value={this.state.value}
        />
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  sendMessage: content => dispatch(sendMessage(content)),
})

export default connect(null, mapDispatch)(ChatInput)
