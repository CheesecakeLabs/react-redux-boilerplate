/* eslint global-require: 0 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import rootReducer from '../modules/reducers'
import DevTools from '../utils/dev-tools/dev-tools'


const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const router = routerMiddleware(browserHistory)

let persistUrl = null

if (process.env.BROWSER) {
  persistUrl = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
}

/**
 * Creates a preconfigured store.
 */
const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, router, logger),
      DevTools.instrument(),
      persistState(persistUrl)
    )
  )

  return store
}


export default configureStore
