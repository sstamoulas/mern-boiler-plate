import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import MainRouter from './MainRouter'

const App = () => (
  <BrowserRouter>
    <MainRouter/>
  </BrowserRouter>
)

export default hot(module)(App)
