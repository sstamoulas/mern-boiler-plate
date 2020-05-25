import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions 
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { remove } from './api-user'
import { isAuthenticated, signout } from './../auth/auth-helper'

const styles = (theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  cardContent: {
    maxWidth: 350,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  submit: {
    padding: theme.spacing(1, 2),
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.primary.main,
  },
})

class DeleteUser extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      redirect: false,
      open: false,
    }
  }

  clickButton = () => {
    this.setState({open: true})
  }

  handleRequestClose = () => {
    this.setState({open: false})
  }

  deleteAccount = () => {
    const jwt = isAuthenticated()

    remove({
      userId: this.props.userId
    },
    {
      t: jwt.token
    })
    .then((data) => {
      if (data.error) 
        console.log(data.error)
      else
        signout(() => console.log('deleted'))
        this.setState({
          redirect: true
        })
    })
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/' />
    }
    else
      return (
        <span>
          <IconButton 
            aria-label='Delete' 
            onClick={this.clickButton}
            color='secondary'
          >
            <Delete />
          </IconButton>
          <Dialog open={this.state.open} onClose={this.handleRequestClose}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Confirm to delete your account.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose} color='primary'>
                Cancel
              </Button>
              <Button 
                onClick={this.deleteAccount} 
                color='secondary' 
                autoFocus='autoFocus'
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      )
  }
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}

export default withStyles(styles)(DeleteUser)
