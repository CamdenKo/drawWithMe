import React from 'react'
import styled from 'styled-components'

import styles from '../../../theme'

const colors = Object.values(styles.colors)

export default (props) => {
  const colorNum = props.color ?
    props.color % colors.length :
    0

  const Parent = styled.div`
    width: 80%;
    max-width: 35rem;
    background-color: ${colors[colorNum]};
    height: 20rem;
    color: white;
  `

  return (
    <Parent>
      {props.children}
    </Parent>
  )
}
