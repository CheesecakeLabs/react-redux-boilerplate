import request from '_utils/request-auth'

export const login = (username, password) =>
  request.post(
    ['auth', 'login'],
    {},
    {
      username,
      password,
    }
  )
