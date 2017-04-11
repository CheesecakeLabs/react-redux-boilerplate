import { defineAction } from '@ckldeveloper/boilerplate/utils/define-action'

import { get, getOrgMembers } from '../../services/user'

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
