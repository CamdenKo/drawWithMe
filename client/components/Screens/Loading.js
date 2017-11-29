import React from 'react'
import styled from 'styled-components'
import { BounceLoader } from 'react-spinners'

import theme from '../../theme'

const Parent = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  display: flex;
`

export default () => (
  <Parent>
    <BounceLoader
      loading
      size={200}
      color={theme.colors.darkAccent}
    />
  </Parent>
)
