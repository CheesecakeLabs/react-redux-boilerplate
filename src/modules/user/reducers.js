import { Map, fromJS } from 'immutable'

import createReducer from '../../utils/create-reducer'

import { GET_USER, GET_MEMBERS } from './actions'

const INITIAL_STATE = new Map()

export const user = createReducer(INITIAL_STATE, {
  [GET_USER.FULFILLED]: (state, { payload }) => state.set(payload.login, fromJS(payload)),
})

export const member = createReducer(INITIAL_STATE, {
  [GET_MEMBERS.FULFILLED]: (state, { payload }) => state.set(payload.org, fromJS(payload.payload)),
})
