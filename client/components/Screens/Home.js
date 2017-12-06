import React from 'react'

import {
  Button,
} from '../../components'

export const Home = props => (
  <div>
    <Button onClick={() => props.history.push('/room')}>Join</Button>
    <Button onClick={() => props.history.push('/host')}>Create</Button>
  </div>
)

export default Home
