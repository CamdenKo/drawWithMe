import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import RoomJoin from './JoinRoom'
import RoomJoined from './JoinedRoom'
import {
  unload,
} from '../../../store'

export class ClientIndex extends React.Component {
  componentDidMount() {
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
    return (
      <React.Fragment>
        <Route path={`${this.props.match.url}/:roomId`} component={RoomJoined} />
        <Route exact path={`${this.props.match.url}/`} component={RoomJoin} />
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  unload: () => dispatch(unload()),
})

export default connect(null, mapDispatch)(ClientIndex)
