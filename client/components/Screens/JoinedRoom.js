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
  SmallHeader,
  Loading,
  BodyText,
} from '../../components'
import {
  setName,
  joinRoom,
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
    this.props.joinRoom()
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
                disabled={!this.state.nameInput.length}
                onClick={() => this.props.setName(this.state.nameInput)}
              >
                Change
              </Button>
            </div>
          )
        }
        <SmallHeader>Players:</SmallHeader>
        {/* {
          Object.keys(this.props.room.users).map(user => (
            <BodyText key={user}>{this.props.room.users[user]}</BodyText>
          ))
        } */}
      </Parent>
    )
  }
}

const mapState = state => ({
  roomCode: state.roomCode,
})

const mapDispatch = (dispatch, ownProps) => ({
  joinRoom: () => dispatch(joinRoom(ownProps.match.params.roomId.toLowerCase())),
  setName: name => dispatch(setName(name)),
  // setName: name => console.log(name),
})

export default withRouter(connect(mapState, mapDispatch)(JoinedRoom))
