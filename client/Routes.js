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
  Clients,
  Home,
  Hosts,
} from './components'

const Routes = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Switch>
        <Route path="/room" component={Clients} />
        <Route path="/host" component={Hosts} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </ThemeProvider>
)


export default Routes
