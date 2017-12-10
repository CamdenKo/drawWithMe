import React from 'react'
import { connect } from 'react-redux'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    if (this.props.user.drawing) {
      return (
        <div> drawing </div>
      )
    }
    return <div> guessing </div>
  }
}
