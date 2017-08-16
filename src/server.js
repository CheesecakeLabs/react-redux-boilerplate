import express from 'express'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import {
  ApolloProvider,
  renderToStringWithData,
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo'
import expressStaticGzip from 'express-static-gzip'
import { serverStatus } from '@cheesecakelabs/boilerplate/utils'
import cors from 'cors'
import fetch from 'node-fetch'

import './bootstrap'
import { assetsPaths } from './utils/server'
import baseHTML from './index.html'
import routes from './routes'
import configureStore from './store/configure-store.prod'
import { GITHUB_TOKEN } from './config/environment'
import { Html } from './html'

const port = process.env.PORT || 3000
const app = express()

global.fetch = fetch

serverStatus()

// Ideally, you'd have a proxy server (like nginx) serving /static files
app.use('/static', expressStaticGzip('dist'))

app.get('*', (req, res) => {
  const store = configureStore()
  match({ routes: routes(store), location: req.url }, (err, redirect, props) => {
    if (redirect && !err) {
      res.redirect(redirect.pathname + redirect.search)
    } else {
      try {
        const networkInterface = createNetworkInterface({
          uri: 'https://api.github.com/graphql',
          opts: {
            headers: {
              cookie: req.header('Cookie'),
            },
          },
        })

        networkInterface.use([
          {
            applyMiddleware(r, next) {
              if (!r.options.headers) {
                r.options.headers = {}
              }
              r.options.headers.Authorization = `bearer ${GITHUB_TOKEN}`
              next()
            },
          },
        ])

        const options = {
          networkInterface,
        }

        console.log('props', props)

        const clientSSR = new ApolloClient({
          ...options,
          ssrMode: true,
        })

        const appHtml = (
          <ApolloProvider client={clientSSR}>
            <RouterContext {...props} />
          </ApolloProvider>
        )

        renderToStringWithData(appHtml)
          .then((content) => {
            const initialState = clientSSR.getInitialState()

            const html = <Html content={content} paths={assetsPaths} state={initialState} />

            res.status(200)

            res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`)
            res.end()
          })
          .catch(console.error)
      } catch (e) {
        // We should dump this error to a logging service (like Sentry)
        console.warn('render error:\n', e, '\n\n')
        res.status(500).send(baseHTML('', {}, assetsPaths))
      }
    }
  })
  console.info(
    `[${new Date().toLocaleString()}]`,
    `"${req.method} ${req.url} HTTP/${req.httpVersion}"`,
    res.statusCode,
  )
})

const corsOptions = {
  origin: 'localhost',
  credentials: true, // <-- REQUIRED backend setting
}
app.use(cors(corsOptions))

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] App is running on port', port)
})
