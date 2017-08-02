import { defineAction } from '@cheesecakelabs/boilerplate/utils'

import { get, getOrgMembers } from '_services/user'

export const GET_USER = defineAction('GET_USER')
export const GET_MEMBERS = defineAction('GET_MEMBERS')

export const getUser = (user) => ({
  type: GET_USER,
  payload: get(user),
})

export const getMembers = (org) => ({
  type: GET_MEMBERS,
  payload: getOrgMembers(org),
  meta: { org },
})
