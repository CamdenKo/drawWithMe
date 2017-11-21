import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  requestJoinRoom,
} from '../../store'
import {
  BigHeader,
  Button,
  SpecialTextInput,
  SmallHeader,
} from '../../components'

const Parent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const InputWrapper = styled.div`
  text-align: center;
`

export class JoinRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
    }
    this.maxSize = 6
    this.onChangeText = this.onChangeText.bind(this)
  }

  onChangeText(e) {
    this.setState({ inputValue: e.target.value })
  }

  render() {
    const ColoredSmallHeader = this.state.inputValue.length === this.maxSize ?
      SmallHeader.extend`
        color: lightgreen;
      ` :
      SmallHeader

    return (
      <Parent>
        <BigHeader>Join Room</BigHeader>
        <InputWrapper>
          <SpecialTextInput
            size={this.maxSize + 2}
            maxLength={this.maxSize}
            value={this.state.inputValue}
            onChange={this.onChangeText}
          />
          <ColoredSmallHeader>Room Key</ColoredSmallHeader>
        </InputWrapper>
        <Button onClick={this.props.onClick}>Enter</Button>
      </Parent>
    )
  }
}

const mapState = state => ({
  room: state.room,
})

const mapDispatch = dispatch => ({
  requestJoinRoom: key => requestJoinRoom(soc)
})
export default connect()(JoinRoom)
