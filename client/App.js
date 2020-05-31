import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Menu from './pages/Menu'
import Home from './pages/Home'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'
import PrivateRoute from './auth/PrivateRoute'
import Routes from './routes'

const App = () => (
  <Fragment>
    <Menu />
    <Switch>
      {
        Routes.map((route, index) => (
          <Route key={index} {...route} />
        ))
      }
    </Switch>
  </Fragment>
)

export default hot(module)(App)
