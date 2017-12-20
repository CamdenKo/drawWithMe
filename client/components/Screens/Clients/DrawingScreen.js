import React from 'react'
import { connect } from 'react-redux'

import {
  ColoredWhiteboard,
  BigHeader,
} from '../../../components'

const BottomText = BigHeader.extend`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  left: 0;
  right: 0;
  width: fit-content;
`

const DrawingScreen = props => (
  <React.Fragment>
    <ColoredWhiteboard drawing />
    <BottomText>{props.word.word}</BottomText>
  </React.Fragment>
)

const mapState = state => ({
  word: state.word,
})

export default connect(mapState)(DrawingScreen)
