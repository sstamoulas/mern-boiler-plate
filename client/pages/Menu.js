import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Button, 
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Home } from '@material-ui/icons'

import { isAuthenticated, signout } from './../auth/auth-helper'

const isActive = (history, path) => {
  if (history.location.pathname === path) 
    return { color: '#ff4081' }
  else
    return { color: '#ffffff' }
}

const Menu = ({ history, staticContext }) => {
  let id, authenticated
  if (staticContext)
    ({ id, authenticated } = staticContext)

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography type='title' color='inherit'>
            MERN Skeleton
          </Typography>
          <Link to='/'>
            <IconButton aria-label='Home' style={isActive(history, '/')}>
              <Home />
            </IconButton>
          </Link>
          <Link to='/users'>
            <Button style={isActive(history, '/users')}>Users</Button>
          </Link>
          {
            ((!!id && authenticated) || (!staticContext && isAuthenticated())) && (
              <Fragment>
                <Link to={`/user/${id || isAuthenticated().user._id}`}>
                  <Button style={isActive(history, `/user/${id || isAuthenticated().user._id}`)}>My Profile</Button>
                </Link>
                <Button 
                  color='inherit'
                  onClick={() => {signout(() => history.push('/'))}}
                >
                  Sign Out
                </Button>
              </Fragment>
            )
          }
          {
            ((!!id && !authenticated) || (!staticContext && !isAuthenticated())) && (
              <Fragment>
                <Link to='/sign-up'>
                  <Button style={isActive(history, '/sign-up')}>Sign Up</Button>
                </Link>
                <Link to='/sign-in'>
                  <Button style={isActive(history, '/sign-in')}>Sign In</Button>
                </Link>
              </Fragment>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Menu)
