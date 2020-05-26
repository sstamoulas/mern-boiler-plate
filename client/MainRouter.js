import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'

import Menu from './pages/Menu'
import Home from './pages/Home'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'
import PrivateRoute from './auth/PrivateRoute'

const theme = createMuiTheme({
  palette: {  
    primary: {  
      light: '#757de8',  
      main: '#3f51b5',  
      dark: '#002984',  
      contrastText: '#fff',
    },
    secondary: {  
      light: '#ff79b0',  
      main: '#ff4081',  
      dark: '#c60055',  
      contrastText: '#000',
    },  
    openTitle: indigo['400'],  
    protectedTitle: pink['400'],  
    type: 'light'
  }
})

const MainRouter = () => (
  <ThemeProvider theme={theme}>
    <Menu />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/users' component={Users} />
      <Route path='/sign-up' component={SignUp} />
      <Route path='/sign-in' component={SignIn} />
      <PrivateRoute path='/user/edit/:userId' component={EditProfile} />
      <Route path='/user/:userId' component={Profile} />
    </Switch>
  </ThemeProvider>
)

export default MainRouter
