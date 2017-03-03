import React from 'react'
import { Route } from 'react-router'

import Home from './views/home'
import NotFound from './views/not-found'
import Github from './views/github'

const routes = (
  <Route>
    <Route path="/" component={Home} />
    <Route path="github/:org/:user" component={Github} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
