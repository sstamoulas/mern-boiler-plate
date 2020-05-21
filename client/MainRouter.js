import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Users from './user/Users'

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/users" component={Users}/>
  </Switch>
)

export default MainRouter
