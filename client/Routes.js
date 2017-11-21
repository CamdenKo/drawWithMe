import React from 'react'
import { Router } from 'react-router'
import { ThemeProvider } from 'styled-components'
import {
  Route,
  Switch,
} from 'react-router-dom'

import history from './history'
import theme from './theme'
import {
  JoinRoom,
  CreatedRoom,
} from './components'

class Routes extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route path="/join" component={JoinRoom} />
            <Route path="/createdRoom" component={CreatedRoom} />
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default Routes
