import { defineAction } from '@cheesecakelabs/boilerplate/utils'

import { get, getOrgMembers, getReposFromUser } from '_services/user'

export const GET_USER = defineAction('GET_USER')
export const GET_MEMBERS = defineAction('GET_MEMBERS')
export const GET_REPOS = defineAction('GET_REPOS')

export const getUser = user => ({
  type: GET_USER,
  payload: get(user),
})

export const getMembers = org => ({
  type: GET_MEMBERS,
  payload: getOrgMembers(org),
  meta: { org },
})

export const getRepos = (user, params = {}) => ({
  type: GET_REPOS,
  payload: getReposFromUser(user, params).then(data => ({
    results: data,
  })),
  meta: { user, page: { user, ...params } },
})
