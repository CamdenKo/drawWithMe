import React from 'react'
import { Router } from 'react-router'
import { ThemeProvider } from 'styled-components'
import {
  Route,
  Switch,
} from 'react-router-dom'

import history from './history'
import theme from './theme'

class Routes extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <div>LOADED</div>
        </Router>
      </ThemeProvider>
    )
  }
}

export default Routes
