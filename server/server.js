import mongoose from 'mongoose'

import config from './../config/config'
import app from './express'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err)
  }

  console.info('Server started on port %s.', config.port)
})
