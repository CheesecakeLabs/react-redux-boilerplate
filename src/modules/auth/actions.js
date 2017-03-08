import { defineAction } from '../../utils/define-action'
import * as authService from '../../services/auth'

export const AUTH_LOGIN = defineAction('AUTH_LOGIN')

export const login = (username, password) => ({
  type: AUTH_LOGIN,
  payload: authService.login(username, password),
})
