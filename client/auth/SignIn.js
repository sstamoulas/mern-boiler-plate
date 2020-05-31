import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { 
  Card, 
  CardContent, 
  TextField, 
  CardActions,
  Button, 
  Icon, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography 
} from '@material-ui/core'

import { signInApiCall } from './api-auth'
import { authenticate } from './auth-helper'

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

class SignIn extends Component {
  state = { 
    password: '',
    email: '',
    redirectToReferrer: false,
    error: '',
  }

  handleChange = (name) => (event) => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }

    signInApiCall(user)
    .then((data) => {
      if (data.error) 
        this.setState({error: data.error})
      else
        authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
    })
  }

  render() {
    const { classes } = this.props
    const { from } = this.props.location.state || {
      from: { pathname: '/' }
    }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer)
      return (<Redirect to={from} />)

    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography 
              align="center"
              variant="h5" 
              component="h2" 
              className={classes.title}
            >
              Sign In
            </Typography>
            <TextField 
              id="email" 
              label="Email"
              type="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <TextField 
              id="password" 
              label="Password"
              type="password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              fullWidth={true}
            />
            <br />
            {
              this.state.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {
                    this.state.error
                  }
                </Typography>
              )
            }
          </CardContent>
          <CardActions className={classes.flexCenter}>
            <Button 
              raised="raised" 
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignIn)
