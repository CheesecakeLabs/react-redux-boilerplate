/* eslint no-underscore-dangle: 0, global-require: 0 */
import React from 'react'
import ReactDOM from 'react-dom'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import configureStore from './src/store/configure-store'
import routes from './src/routes'

const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)

if (process.env.NODE_ENV === 'development') {
  const createDevToolsWindow = require('./src/utils/dev-tools/create-dev-tools-window').default
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
)
