import React from 'react'

import {
  Button,
} from '../../components'

export const Home = props => (
  <div>
    <Button onClick={() => props.history.push('/join')}>Join</Button>
    <Button onClick={() => props.history.push('/createdRoom')}>Create</Button>
  </div>
)

export default Home
