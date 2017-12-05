import React from 'react'
// import styled from 'styled-components'
import { connect } from 'react-redux'

import {
  BodyText,
  SmallHeader,
} from '../../../components'

export const PlayerList = props => (
  <React.Fragment>
    <SmallHeader>Players:</SmallHeader>
    {
      props.players.players.map(player => (
        <BodyText key={player.name}>{player.name}</BodyText>
      ))
    }
    {
      props.players.numLoading > 0 && new Array(props.players.numLoading)
        .fill(undefined)
        .map((_, index) => <BodyText key={index}>Picking Name...</BodyText>)
    }
  </React.Fragment>
)

const mapState = state => ({
  players: state.players,
})

export default connect(mapState)(PlayerList)
