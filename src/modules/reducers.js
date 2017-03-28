import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { user, org } from './user/reducers'
import { auth } from './auth/reducers'
import { error } from './error/reducers'
import { loading } from './loading/reducers'

const rootReducer = combineReducers({
  routing,
  user,
  org,
  auth,
  error,
  loading,
})

export default rootReducer
