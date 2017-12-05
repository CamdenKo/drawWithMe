import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  createRoom,
  unloadHost,
} from '../../store'
import {
  PlayerList,
  BigHeader,
  SmallHeader,
} from '../../components'

const Parent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`

const AccentBigHeader = BigHeader.extend`
  color: ${({ theme }) => theme.colors.primaryAccent};
`

const KeyWrapper = styled.div`
  text-align: center;
`

export class CreatedRoom extends React.Component {
  componentDidMount() {
    this.props.requestCreateRoom(this.props.socket)
    if (window.onbeforeunload !== undefined) {
      window.onbeforeunload = () => {
        this.props.unloadHost()
        return undefined
      }
    } else if (window.onpagehide !== undefined) {
      window.onpagehide = this.props.unloadHost
    }
  }

  componentWillUnmount() {
    this.props.unloadHost()
  }

  render() {
    return (
      <Parent>
        <BigHeader>Created Room</BigHeader>
        <KeyWrapper>
          <SmallHeader>Generated key:</SmallHeader>
          <AccentBigHeader>{this.props.roomCode.roomCode}</AccentBigHeader>
        </KeyWrapper>
        <PlayerList />
      </Parent>
    )
  }
}

const mapState = state => ({
  roomCode: state.roomCode,
  players: state.players,
})

const mapDispatch = dispatch => ({
  requestCreateRoom: () => dispatch(createRoom()),
  unloadHost: () => dispatch(unloadHost()),
})

export default withRouter(connect(mapState, mapDispatch)(CreatedRoom))
