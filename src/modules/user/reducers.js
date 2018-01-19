import { Map, fromJS } from 'immutable'
import { normalize, schema } from 'normalizr'
import { createReducer } from '@cheesecakelabs/boilerplate/utils'

import { GET_USER, GET_MEMBERS, GET_REPOS } from './actions'

export const INITIAL_STATE = new Map()
export const userSchema = new schema.Entity('user', {}, { idAttribute: 'login' })
export const repoSchema = new schema.Entity('repo')

export const user = createReducer(INITIAL_STATE, {
  [GET_USER.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload, userSchema).entities.user),
  [GET_MEMBERS.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload, [userSchema]).entities.user),
})

const getLogin = u => u.login
export const org = createReducer(INITIAL_STATE, {
  [GET_MEMBERS.FULFILLED]: (state, { payload, meta }) =>
    state.set(meta.org, fromJS(payload.map(getLogin))),
})

export const repos = createReducer(INITIAL_STATE, {
  [GET_REPOS.FULFILLED]: (state, { payload }) =>
    state.mergeDeep(normalize(payload.results, [repoSchema]).entities.repo),
})
