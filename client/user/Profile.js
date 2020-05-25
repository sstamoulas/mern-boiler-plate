import React, { Compoenent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar, 
  Avatar, 
  Divider, 
  IconButton,
  ListItemSecondaryAction, 
  Typography 
} from '@material-ui/core'
import { Person, Edit } from '@material-ui/icons'
import DeleteUser from './DeleteUser'

import { read } from './api-user'
import { isAuthenticated } from './../auth/auth-helper'

const styles = (theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.primary.main
  },
  media: {
    minHeight: 330
  }
})

class Profile extends Compoenent {
  state = { 
    user: '',
    redirectToSignin: false,
  }

  componentDidMount = () => {
    console.log(this.props.match)
    this.init(this.props.match.params.userId)
  }

  init = (userId) => {
    const jwt = isAuthenticated()

    read({
      userId
    }, 
    {
      t: jwt.token
    })
    .then((data) => {
      if (data.error)
        this.setState({ redirectToReferrer: true })
      else
        this.setState({ user: data })
    })
  }

  render() {
    const { classes } = this.props
    const redirectToSignin = this.state.redirectToSignin

    if (redirectToSignin) 
      return <Redirect to='/signin/' />
    else
      return (
        <Paper className={classes.root} elevation={4}>
          <Typography type='title' className={classes.title}>Profile</Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={this.state.user.name} 
                secondary={this.state.user.email} 
              />
              {
                isAuthenticated().user && 
                isAuthenticated().user_id === this.state.user._id && (
                  <ListItemSecondaryAction>
                    <Link to={`/user/edit/${this.state.user._id}`}>
                      <IconButton color='primary'>
                        <Edit />
                      </IconButton>
                    </Link>
                    <DeleteUser userId={this.state.user._id} />
                  </ListItemSecondaryAction>
                )
              }
              <Divider />
              <ListItem>
                <ListItemText 
                  primary={`Joined: ${(new Date(this.state.user.created)).toDateString()}`} 
                />
              </ListItem>
            </ListItem>
          </List>
        </Paper>
      )
  }
}

export default withStyles(styles)(Profile)
