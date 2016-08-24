/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../modules/reducers'


const router = routerMiddleware(browserHistory)

/**
 * Creates a preconfigured store.
 */
const configureStore = (preloadedState) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, router)
  )


export default configureStore
