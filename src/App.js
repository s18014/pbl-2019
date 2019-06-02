import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Leaflet from 'leaflet'

import Form from './Form'
import Confirm from './Confirm'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to='/form' />
          )} />
          <Route exact path='/form' component={Form} />
          <Route exact path='/form/confirm' component={Confirm} />
        </Switch>
      </Router>
    )
  }
}
