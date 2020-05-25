import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './pages/Menu'
import Home from './pages/Home'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'

import PrivateRoute from './auth/PrivateRoute'

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/users' component={Users} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/sign-in' component={SignIn} />
      <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
      <Route path='/user/:userId' component={Profile} />
    </Switch>
  </div>
)

export default MainRouter
