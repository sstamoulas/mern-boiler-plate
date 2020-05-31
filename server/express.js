import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from "react-router-dom"
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Cookies from 'cookies'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import jwt from 'jsonwebtoken'
import { ServerStyleSheets } from '@material-ui/core/styles'

import devBundle from './devBundle'
import config from './../config/config'

import App from './../client/App'
import Routes from './../client/routes'
import Template from './../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()

const handleRender = (req, res, context) => {
  const sheets = new ServerStyleSheets()

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    ),
  )

  // Grab the CSS from the sheets.
  const css = sheets.toString()

  // Send the rendered page back to the client.
  return Template(html, css)
}

if(config.env === "development") {
  devBundle.compile(app, config.env)
}

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use('/favicon.ico', express.static(path.join(CURRENT_WORKING_DIR, 'client/assets/images/favicon.ico')))

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
  let context = {}
  let cookies = new Cookies(req, res)

  const currentRoute = Routes.find(route => matchPath(req.url, route)) || {}

  jwt.verify(cookies.get('t'), config.jwtSecret, function(err, decoded) {
    if(currentRoute.usesAuthentication && !!cookies.get('t')) {
      context = { id: decoded._id, authenticated: true }
    }
    else if (currentRoute.exact) {
      context = { id: 1, authenticated: false }
    }
    else {
      context = { id: 1 }
    }
  });

  const content = handleRender(req, res, context)

  if (currentRoute.usesAuthentication && context.authenticated == undefined) {
    res.redirect(303, '/sign-in')
  }
  else {
    res.status(200).send(content)
  }
})

export default app
