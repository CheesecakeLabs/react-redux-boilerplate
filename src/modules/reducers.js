import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { counter } from './counter/reducers'
import { user, member } from './user/reducers'

const rootReducer = combineReducers({
  routing,
  counter,
  user,
  member,
})

export default rootReducer
