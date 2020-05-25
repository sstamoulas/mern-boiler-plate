import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Users from './user/Users'
import SignUp from './user/SignUp'
import Profile from './user/Profile'
import SignIn from './auth/SignIn'

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users" component={Users} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/user/:userId" component={Profile} />
  </Switch>
)

export default MainRouter
