import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { user, member } from './user/reducers'

const rootReducer = combineReducers({
  routing,
  user,
  member,
})

export default rootReducer
