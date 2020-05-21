import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar, 
  Avatar, 
  IconButton, 
  ListItemSecondaryAction, 
  Typography 
} from '@material-ui/core'
import { Person, ArrowForward } from '@material-ui/icons'
import { list } from './api-user'

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

class Users extends Component {
  state = { users: [] }

  componentDidMount = () => {
    list()
    .then((data) => {
      if (data.error) 
        console.log(data.error)
      else
        this.setState({users: data})
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          All Users
        </Typography>
        <List>
          {this.state.users.map((item, index) => {
            return (
              <Link to={'/user/' + item._id} key={index}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            )
          })}
        </List>
      </Paper>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)
