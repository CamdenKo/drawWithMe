import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { unloadHost, createRoom } from '../../../store'
import Room from './CreatedRoom'
import Host from './Host'

export class HostIndex extends React.Component {
  componentDidMount() {
    this.props.requestCreateRoom()
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
      <React.Fragment>
        <Route path={`${this.props.match.url}/:roomId`} component={Host} />
        <Route exact path={`${this.props.match.url}/`} component={Room} />
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  unloadHost: () => dispatch(unloadHost()),
  requestCreateRoom: () => dispatch(createRoom()),
})

export default connect(null, mapDispatch)(HostIndex)
