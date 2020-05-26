import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { ServerStyleSheets } from '@material-ui/core/styles';

import devBundle from './devBundle'
import config from './../config/config'

import MainRouter from './../client/MainRouter'
import Template from './../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()

const handleRender = (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {}

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <MainRouter />
      </StaticRouter>
    ),
  );

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    redirect(301, context.url);
  }

  // Grab the CSS from the sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  res.status(200).send(Template(html, css));
}

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

// This is fired every time the server-side receives a request.
app.use(handleRender);

export default app
