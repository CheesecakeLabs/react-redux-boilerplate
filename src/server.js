import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import expressStaticGzip from 'express-static-gzip'
import { serverStatus, getStatus } from '@cheesecakelabs/boilerplate/utils'

import { assetsPaths } from '_utils/server'

import './bootstrap'
import baseHTML from './index.html'
import routes from './routes'
import configureStore from './store/configure-store.prod'

const port = process.env.PORT || 3000
const app = express()

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
        const appHtml = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>,
        )
        res.status(getStatus(err, props)).send(baseHTML(appHtml, assetsPaths))
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

app.listen(port, err => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] App is running on port', port)
})
