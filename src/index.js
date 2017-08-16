import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ApolloProvider } from 'react-apollo'

import './bootstrap'
import configureStore from './store/configure-store'
import routes from './routes'
import client from './graphql/client'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
console.log(window.__APOLLO_STATE__)
console.log(client)
const Root = () =>
  <ApolloProvider store={store} client={client}>
    <Router history={history} routes={routes(store)} />
  </ApolloProvider>

render(<Root />, document.getElementById('root'))
