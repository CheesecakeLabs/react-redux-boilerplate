export const isLoggedIn = (auth) => auth && !!auth.get('key')

export const userLoginRequired = (store) => (nextState, replace) => {
  const auth = store.getState().auth
  if (!isLoggedIn(auth)) {
    replace({
      pathname: '/login',
      state: {
        next: {
          pathname: nextState.location.pathname,
          query: nextState.location.query,
        },
      },
    })
  }
}
