import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import './bootstrap'
import configureStore from './store/configure-store'
import routes from './routes'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={routes(store)} />
  </Provider>
)

render(<Root />, document.getElementById('root'))
