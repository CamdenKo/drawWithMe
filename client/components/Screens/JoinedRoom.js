import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  Redirect,
} from 'react-router-dom'

import {
  BigHeader,
  TextInput,
  Button,
  SmallHeader,
  BodyText,
} from '../../components'
import {
  requestChangeName,
} from '../../store'

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
    this.props.socket.emit('requestJoinRoom', { key: this.props.match.params.roomId })
  }

  render() {
    return this.props.room && this.props.room.error ? (
      <Redirect to="/join" />
    ) : (
      <Parent>
        <BigHeader>Room Joined</BigHeader>
        {
          this.state.nameChanged !== 'success' && (
            <div>
              <SmallHeader>Set Name</SmallHeader>
              <TextInput
                placeholder="Name"
                onChange={e => this.setState({ nameInput: e.target.value })}
                value={this.state.nameInput}
              />
              <Button
                disabled={!!this.state.nameInput.length}
                onClick={() => this.props.requestChangeName(this.props.socket, this.state.nameInput)}
              >
                Change
              </Button>
            </div>
          )
        }
        {
          this.state.nameChanged === 'error' && (
            <BodyText>Name is already taken, try again</BodyText>
          )
        }
        <SmallHeader>Players:</SmallHeader>
        {
          Object.keys(this.props.room.users).map(user => (
            <BodyText key={user}>{this.props.room.users[user]}</BodyText>
          ))
        }
      </Parent>
    )
  }
}

const mapState = state => ({
  room: state.room,
  nameChanged: state.room.nameChanged,
  socket: state.socket,
})

const mapDisaptch = dispatch => ({
  requestChangeName: (socket, name) => dispatch(requestChangeName(socket, name)),
})

export default connect(mapState, mapDisaptch)(JoinedRoom)
