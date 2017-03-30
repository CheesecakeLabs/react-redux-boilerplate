import React from 'react'
import { Route } from 'react-router'

import { userLoginRequired } from './utils/routes'
import App from './components/app'
import Home from './views/home'
import NotFound from './views/not-found'
import Github from './views/github'
import User from './views/github/user'
import Login from './views/login'
import Restrict from './views/restrict'

const routes = (store) => (
  <Route component={App} >
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/restrict" component={Restrict} onEnter={userLoginRequired(store)} />
    <Route path="github/:org" component={Github}>
      <Route path=":user" component={User} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
