import { createSelector } from 'reselect'
import { Map, List } from 'immutable'

const getUsers = state => state.user
const getOrg = (state, org) => state.org.get(org)

export const getUsersFromOrg = createSelector(
  getUsers,
  getOrg,
  (users = new Map(), org = new List()) => org.map(login => users.get(login)),
)
