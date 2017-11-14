import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'

import './bootstrap'
import configureStore from './store/configure-store'
import routes from './routes'

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(fromJS(window.__INITIAL_STATE__).toObject())
const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={routes(store)} />
  </Provider>
)

render(<Root />, document.getElementById('root'))
