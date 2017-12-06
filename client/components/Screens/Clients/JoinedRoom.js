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
  }

  render() {
    if (this.props.roomCode.loading) {
      return <Loading />
    }
    if (this.props.roomCode.err) {
      return <Redirect to="/room" />
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
  setName: name => dispatch(setName(name)),
  joinRoom: () => dispatch(joinRoom(ownProps.match.params.roomId.toLowerCase())),
})


export default withRouter(connect(mapState, mapDispatch)(JoinedRoom))
