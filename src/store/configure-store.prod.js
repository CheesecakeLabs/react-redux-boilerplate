import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import promise from 'redux-promise-middleware'
import { errorMiddleware } from '@cheesecakelabs/boilerplate/middlewares'

import rootReducer from '../modules/reducers'

const router = routerMiddleware(browserHistory)

const configureStore = (preloadedState) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, errorMiddleware, promise(), router),
  )

export default configureStore
