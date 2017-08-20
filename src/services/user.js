import request from '_utils/request'

export const get = user => request.get(['users', user])
export const getOrgMembers = org => request.get(['orgs', org, 'members'])
