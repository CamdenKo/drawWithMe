import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  createRoom,
  startGame,
  unloadHost,
} from '../../../store'
import {
  PlayerList,
  BigHeader,
  SmallHeader,
  Button,
} from '../../../components'

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
  constructor() {
    super()
    this.gameStart = this.gameStart.bind(this)
  }

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

  gameStart() {
    if (this.props.players.players.length > 1 && this.props.players.numLoading === 0) {
      return (
        <Button onClick={this.props.startGame}>
          Start Game
        </Button>
      )
    }
    if (this.props.players.players.length < 2) {
      return (
        <React.Fragment>
          <Button disabled>
            Start Game
          </Button>
          <SmallHeader>Waiting for more players...</SmallHeader>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <Button disabled>
          Start Game
        </Button>
        <SmallHeader>Waiting for everyone to pick their name.</SmallHeader>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Parent>
        <BigHeader>Created Room</BigHeader>
        <KeyWrapper>
          <SmallHeader>Generated key:</SmallHeader>
          <AccentBigHeader>{this.props.roomCode.roomCode}</AccentBigHeader>
        </KeyWrapper>
        {
          this.gameStart()
        }
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
  startGame: () => dispatch(startGame()),
})

export default withRouter(connect(mapState, mapDispatch)(CreatedRoom))