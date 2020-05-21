import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { indigo, pink } from 'material-ui/styles/colors'

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


class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello!</h1>
      </div>
    )
  }
}

export default hot(module)(App)
