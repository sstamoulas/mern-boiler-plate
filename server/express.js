import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import devBundle from './devBundle'
import config from './../config/config'

import Template from './../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()


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

app.get('/', (req, res) => {
  res.status(200).send(Template())
})

export default app
