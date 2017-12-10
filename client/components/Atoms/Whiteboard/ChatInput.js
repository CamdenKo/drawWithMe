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
  }

  onChange(e) {
    console.log('e', e)
    if (e.keyCode === 13) {
      console.log('enter')
      console.log(e.shiftKey)
    }

    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <form>
        <Input
          onChange={this.onChange}
          value={this.state.value}
        />
      </form>
    )
  }
}

const mapDispatch = dispatch => ({

})

export default connect()(ChatInput)
