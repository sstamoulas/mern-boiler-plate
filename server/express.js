import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import MainRouter from './../client/MainRouter'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { SheetsRegistry, JssProvider } from 'react-jss'
import { ThemeProvider, createMuiTheme, cretaeGenerateClassName } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'

import devBundle from './devBundle'
import config from './../config/config'

import Template from './../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()
const sheets = new SheetsRegistry()
const generateClassName = cretaeGenerateClassName({
  productionPrefix: 'c',
})
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

if(config.env === "development") {
  devBundle.compile(app, config.env)
}

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ 'error': err.name + ': ' + err.message })
  }
})

app.get('*', (req, res) => {
  res.status(200).send(Template())
})

export default app
