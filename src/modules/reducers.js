import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { error, loading, pagination } from '@cheesecakelabs/boilerplate/reducers'

import { user, org, repos } from './user/reducers'
import { auth } from './auth/reducers'

const rootReducer = combineReducers({
  routing,
  user,
  org,
  auth,
  repos,
  error,
  loading,
  pagination,
})

export default rootReducer
