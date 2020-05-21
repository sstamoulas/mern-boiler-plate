import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Users from './user/Users'
import SignUp from './user/SignUp'

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users" component={Users} />
    <Route path="/sign-up" component={SignUp} />
  </Switch>
)

export default MainRouter
