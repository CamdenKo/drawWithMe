import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  Redirect,
  withRouter,
} from 'react-router-dom'

import {
  BigHeader,
  TextInput,
  Button,
  ErrorText,
  SmallHeader,
  Loading,
  PlayerList,
} from '../../../components'
import {
  setName,
  unload,
  joinRoom,
} from '../../../store'

const Parent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  align-items: center;
`

export class JoinedRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      nameInput: '',
    }
  }

  componentDidMount() {
    this.props.joinRoom()
    if (window.onbeforeunload !== undefined) {
      window.onbeforeunload = () => {
        this.props.unload()
        return undefined
      }
    } else if (window.onpagehide !== undefined) {
      window.onpagehide = this.props.unload
    }
  }

  componentWillUnmount() {
    this.props.unload()
  }

  render() {
    if (this.props.roomCode.loading) {
      return <Loading />
    }
    if (this.props.roomCode.err) {
      return <Redirect to="/join" />
    }
    return (
      <Parent>
        <BigHeader>Room Joined {this.props.roomCode.roomCode}</BigHeader>
        {
          !this.props.user.nameSet && (
            <div>
              <SmallHeader>Set Name</SmallHeader>
              <TextInput
                placeholder="Name"
                onChange={e => this.setState({ nameInput: e.target.value })}
                value={this.state.nameInput}
              />
              <Button
                disabled={!this.state.nameInput.length}
                onClick={() => this.props.setName(this.state.nameInput)}
              >
                Change
              </Button>
              {
                this.props.user.err && <ErrorText>{this.props.user.err}</ErrorText>
              }
            </div>
          )
        }
        <PlayerList />
      </Parent>
    )
  }
}

const mapState = state => ({
  roomCode: state.roomCode,
  players: state.players,
  user: state.user,
})

const mapDispatch = (dispatch, ownProps) => ({
  joinRoom: () => dispatch(joinRoom(ownProps.match.params.roomId.toLowerCase())),
  setName: name => dispatch(setName(name)),
  unload: () => dispatch(unload()),
})

export default withRouter(connect(mapState, mapDispatch)(JoinedRoom))
