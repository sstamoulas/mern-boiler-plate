import React, { useEffect } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'
import App from './App'

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

const Main = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  )
}

hydrate(<Main />, document.getElementById('root'))
