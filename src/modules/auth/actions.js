import { defineAction } from '@cheesecakelabs/boilerplate/utils'

import * as authService from '_services/auth'

export const AUTH_LOGIN = defineAction('AUTH_LOGIN')

export const login = (username, password) => ({
  type: AUTH_LOGIN,
  payload: authService.login(username, password),
})
