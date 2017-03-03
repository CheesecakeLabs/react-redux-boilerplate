import createReducer from '../../utils/create-reducer'

import { GET_USER, GET_MEMBERS } from './actions'

const INITIAL_STATE = {}

export const user = createReducer(INITIAL_STATE, {
  [GET_USER.FULFILLED]: (state, { payload }) =>
    Object.assign({}, state, { [payload.login]: payload }),
})

export const member = createReducer(INITIAL_STATE, {
  [GET_MEMBERS.FULFILLED]: (state, { payload }) =>
    Object.assign({}, state, { [payload.org]: payload.payload }),
})
