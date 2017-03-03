import isPromise from '../utils/is-promise'

export default function errorMiddleware() {
  return next => action => {
    const result = next(action)

    if (!isPromise(result)) {
      return action
    }

    return result.catch(() => {})
  }
}
