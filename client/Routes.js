import React from 'react'
import { Router } from 'react-router'
import {
  Route,
  Switch,
} from 'react-router-dom'

import history from './history'

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>LOADED</div>
      </Router>
    )
  }
}

export default Routes
