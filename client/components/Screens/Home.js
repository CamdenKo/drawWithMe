import React from 'react'
import { connect } from 'react-redux'

import {
  Button,

} from '../../components'

export const Home = props => (
  <div>
    <Button>Join</Button>
    <Button>Create</Button>
  </div>
)

const mapDispatch = dispatch => ({

})

export default connect(null, mapDispatch)(Home)
