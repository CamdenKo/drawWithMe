import React from 'react'
import styled from 'styled-components'

import theme from '../../../theme'
import {
  Marker,
} from '../../../components'

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  width: 50px;
  height: fit-content;
  margin-left: 10px;
`

const { drawingColors } = theme

export default props => (
  <Parent>
    {
      drawingColors.map((color) => {
        const ColoredMarker = Marker.extend`
          background-color: ${color};
        `
        return <ColoredMarker key={color} onClick={() => props.onClick(color)} />
      })
    }
  </Parent>
)
