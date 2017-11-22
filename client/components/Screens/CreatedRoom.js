import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import{
  requestCreateRoom,
} from '../../store'
import {
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
  }

  render() {
    console.log('update', this.props.room.users)
    return (
      <Parent>
        <BigHeader>Created Room</BigHeader>
        <KeyWrapper>
          <SmallHeader>Generated key:</SmallHeader>
          <AccentBigHeader>{this.props.room.key}</AccentBigHeader>
        </KeyWrapper>
        {
          Object.values(this.props.room.users).map(user => <SmallHeader>{user}</SmallHeader>)
        }
        {
          console.log(Object.values(this.props.room.users))
        }
      </Parent>
    )
  }
}

const mapState = state => ({
  room: state.room,
  socket: state.socket,
})

const mapDispatch = dispatch => ({
  requestCreateRoom: socket => dispatch(requestCreateRoom(socket)),
})

export default connect(mapState, mapDispatch)(CreatedRoom)
