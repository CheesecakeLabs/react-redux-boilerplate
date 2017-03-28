import { Map, fromJS } from 'immutable'
import { normalize, schema } from 'normalizr'

import createReducer from '../../utils/create-reducer'

import { GET_USER, GET_MEMBERS } from './actions'

export const INITIAL_STATE = new Map()
export const userSchema = new schema.Entity('user', {}, { idAttribute: 'login' })

export const user = createReducer(INITIAL_STATE, {
  [GET_USER.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload, userSchema).entities.user),
  [GET_MEMBERS.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload.payload, [userSchema]).entities.user),
})

const getLogin = (u) => u.login
export const org = createReducer(INITIAL_STATE, {
  [GET_MEMBERS.FULFILLED]: (state, { payload }) =>
    state.set(payload.org, fromJS(payload.payload.map(getLogin))),
})
