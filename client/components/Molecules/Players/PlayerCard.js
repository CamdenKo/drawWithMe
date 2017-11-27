import React from 'react'
import styled from 'styled-components'

import {
  PlayerHeader,
} from '../../../components'

export default (props) => {
  const Text = PlayerHeader.extend`
    background-color: ${props.backgroundColor ? props.backgroundColor : ({ theme }) => theme.colors.dark};
  `

  return (
    <Text>{props.children}</Text>
  )
}
