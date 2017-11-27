import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  requestCreateRoom,
} from '../../store'
import {
  Button,
} from '../../components'

export const Home = props => (
  <div>
    <Button onClick={() => props.history.push('/join')}>Join</Button>
    <Button onClick={() => props.history.push('/createdRoom')}>Create</Button>
  </div>
)

const mapState = state => ({
  socket: state.socket,
})

const mapDispatch = dispatch => ({
  requestCreateRoom: socket => dispatch(requestCreateRoom(socket)),
})

export default withRouter(connect(mapState, mapDispatch)(Home))
