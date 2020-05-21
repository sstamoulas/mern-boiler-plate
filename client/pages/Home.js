import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import SeaShellImg from './../assets/images/seashell.jpg'

const styles = (theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

const Home = (props) => {
  const { classes } = props 

  return (
    <div>
      <Link to="/users">Users</Link>
      <Card className={classes.card}>
        <Typography variant="h5" component="h2" className={classes.title}>
          Home Page
        </Typography>
        <CardMedia className={classes.media} image={SeaShellImg} title="Unicord Shells" />
        <CardContent>
          <Typography variant="body1" component="p">
            Welcome to the Mern Skeleton home page
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
