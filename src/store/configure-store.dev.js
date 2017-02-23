import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistState } from 'redux-devtools'
// eslint-disable-next-line import/no-extraneous-dependencies
import createLogger from 'redux-logger'

import rootReducer from '../modules/reducers'
import DevTools from '../utils/dev-tools/dev-tools'
import errorMiddleware from '../middleware/error-middleware'

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const router = routerMiddleware(browserHistory)

/**
 * Creates a preconfigured store.
 */
const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        errorMiddleware,
        promise(),
        router,
        logger,
      ),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/,
        ),
      ),
    ),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../modules/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
