import { Map, fromJS } from 'immutable'

import createReducer from '../../utils/create-reducer'

import { AUTH_LOGIN } from './actions'

const INITIAL_STATE = new Map()

export const auth = createReducer(INITIAL_STATE, {
  [AUTH_LOGIN.FULFILLED]: (state, { payload }) => fromJS(payload),
})

