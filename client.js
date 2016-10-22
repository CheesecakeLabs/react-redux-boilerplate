/* eslint global-require: 0 */
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
/*
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import configureStore from './store/configure-store'
import routes from './routes'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

if (process.env.NODE_ENV === 'development') {
  const createDevToolsWindow = require('./utils/dev-tools/create-dev-tools-window').default
  createDevToolsWindow(store)
}


const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)


ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
