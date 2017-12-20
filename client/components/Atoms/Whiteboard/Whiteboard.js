import React from 'react'
import { connect } from 'react-redux'
import equals from 'shallow-equals'

import {
  postLine,
} from '../../../store'

class Whiteboard extends React.Component {
  constructor() {
    super()
    this.state = {
      currentMousePosition: null,
      drawing: [],
    }
    this.resize = this.resize.bind(this)
    this.pos = this.pos.bind(this)
    this.mousedown = this.mousedown.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.removeEventListeners = this.removeEventListeners.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d')
    this.resize()
    window.addEventListener('resize', this.resize)
    window.addEventListener('mousedown', this.mousedown)
    window.addEventListener('mousemove', this.mousemove)
    if (window.onbeforeunload !== undefined) {
      window.onbeforeunload = () => {
        this.removeEventListeners()
        return undefined
      }
    } else if (window.onpagehide !== undefined) {
      window.onpagehide = this.removeEventListeners
    }
  }

  componentWillReceiveProps(nextProps) {
    this.clearCanvas()
    nextProps.drawing.drawing
      .forEach(drawing => this.draw(drawing.lastMousePosition, drawing.currentMousePosition, drawing.color))
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  mousemove(e) {
    if (!e.buttons) return
    const lastMousePosition = this.state.currentMousePosition
    this.setState({ currentMousePosition: this.pos(e) })
    if (lastMousePosition && this.state.currentMousePosition) {
      const lineToPost = {
        lastMousePosition,
        currentMousePosition: this.state.currentMousePosition,
        color: this.props.color,
      }
      this.props.postLine(lineToPost)
    }
  }

  mousedown(e) {
    this.setState({ currentMousePosition: this.pos(e) })
  }

  removeEventListeners() {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('mousedown', this.mousedown)
    window.removeEventListener('mousemove', this.mousemove)
  }

  draw(lastMousePosition, currentMousePosition, color = 'black') {
    this.ctx.beginPath()
    this.ctx.strokeStyle = color
    this.ctx.moveTo(...lastMousePosition)
    this.ctx.lineTo(...currentMousePosition)
    this.ctx.closePath()
    this.ctx.stroke()
    // firebase
  }

  pos(e) {
    return [
      e.pageX - this.canvas.offsetLeft,
      e.pageY - this.canvas.offsetTop,
    ]
  }

  resize() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    const w = window.innerWidth
    const h = window.innerHeight
    if (w !== this.canvas.width || h !== this.canvas.height) {
      const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      this.canvas.width = w
      this.canvas.height = h
      this.ctx.putImageData(imgData, 0, 0)
    }
    this.ctx.lineWidth = 5
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
  }

  render() {
    this.props.drawing.drawing
      .forEach(line => this.draw(line.lastMousePosition, line.currentMousePosition, line.color))
    return (
      <canvas ref={(c) => { this.canvas = c }} />
    )
  }
}

const mapState = state => ({
  drawing: state.drawing,
})

const mapDispatch = dispatch => ({
  postLine: line => dispatch(postLine(line)),
})

export default connect(mapState, mapDispatch)(Whiteboard)
