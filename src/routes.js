import React from 'react'
import { Route } from 'react-router'

import { userLoginRequired } from '_utils/routes'
import App from '_components/app'
import Home from '_views/home'
import NotFound from '_views/not-found'
import Github from '_views/github'
import User from '_views/github/user'
import Login from '_views/login'
import Restrict from '_views/restrict'

const routes = store => (
  <Route component={App}>
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
