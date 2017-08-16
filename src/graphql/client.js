import { ApolloClient, createNetworkInterface } from 'react-apollo'

import { GITHUB_TOKEN } from '../config/environment'

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      req.options.headers.Authorization = `bearer ${GITHUB_TOKEN}`
      next()
    },
  },
])

const options = {
  networkInterface,
  initialState: window.__APOLLO_STATE__,
  ssrMode: true,
  ssrForceFetchDelay: 100,
}

console.log(window.__APOLLO_STATE__)

export default new ApolloClient(options)
