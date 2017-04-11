import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { error, loading } from '@cheesecakelabs/boilerplate/reducers'

import { user, org } from './user/reducers'
import { auth } from './auth/reducers'

const rootReducer = combineReducers({
  routing,
  user,
  org,
  auth,
  error,
  loading,
})

export default rootReducer
