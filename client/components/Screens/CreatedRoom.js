import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  BigHeader,
  SmallHeader,
} from '../../components'

const Parent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`

const AccentBigHeader = BigHeader.extend`
  color: ${({ theme }) => theme.colors.primaryAccent};
`

const KeyWrapper = styled.div`
  text-align: center;
`

export const CreatedRoom = props => (
  <Parent>
    <BigHeader>Created Room</BigHeader>
    <KeyWrapper>
      <SmallHeader>Generated key:</SmallHeader>
      <AccentBigHeader>{props.room.key}</AccentBigHeader>
    </KeyWrapper>
  </Parent>
)

const mapState = state => ({
  room: state.room,
})

export default connect(mapState)(CreatedRoom)
