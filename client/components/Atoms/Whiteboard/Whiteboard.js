import React from 'react'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      currentMousePosition: [0, 0],
    }
    this.resize = this.resize.bind(this)
    this.pos = this.pos.bind(this)
    this.mousedown = this.mousedown.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.removeEventListeners = this.removeEventListeners.bind(this)
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

  componentWillUnmount() {
    this.removeEventListeners()
  }

  mousemove(e) {
    if (!e.buttons) return
    const lastMousePosition = this.state.currentMousePosition
    this.setState({ currentMousePosition: this.pos(e) })
    if (lastMousePosition && this.state.currentMousePosition) {
      this.draw(lastMousePosition, this.state.currentMousePosition, this.props.color)
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
    return (
      <canvas ref={(c) => { this.canvas = c }} />
    )
  }
}

