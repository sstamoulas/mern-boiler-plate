import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
  </Switch>
)

export default MainRouter
