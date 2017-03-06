import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { user, member } from './user/reducers'
import { error } from './error/reducers'
import { loading } from './loading/reducers'

const rootReducer = combineReducers({
  routing,
  user,
  member,
  error,
  loading,
})

export default rootReducer
