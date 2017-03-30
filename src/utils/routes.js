export const isLoggedIn = (user) => user && !!user.get('auth_token')

export const userLoginRequired = (store) => (nextState, replace) => {
  const user = store.getState().user
  if (!isLoggedIn(user)) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}
