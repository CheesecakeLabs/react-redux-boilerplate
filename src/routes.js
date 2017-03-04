import React from 'react'
import { Route } from 'react-router'

import App from './components/app'
import Home from './views/home'
import NotFound from './views/not-found'
import Github from './views/github'
import User from './views/github/user'

const routes = (
  <Route component={App} >
    <Route path="/" component={Home} />
    <Route path="github/:org" component={Github}>
      <Route path=":user" component={User} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
