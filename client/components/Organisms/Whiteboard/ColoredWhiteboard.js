import React from 'react'

import {
  MarkerGroup,
  Whiteboard,
} from '../../../components'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      color: 'black',
    }
    this.changeColor = this.changeColor.bind(this)
  }

  changeColor(color) {
    this.setState({ color })
  }

  render() {
    return (
      <div>
        {
          this.props.drawing && <MarkerGroup onClick={this.changeColor} />
        }
        <Whiteboard color={this.state.color} />
      </div>
    )
  }
}
