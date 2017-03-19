import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import expressStaticGzip from 'express-static-gzip'

import './bootstrap'
import './utils/server-status'
import { assetsPaths, getStatus } from './utils/server'
import baseHTML from './index.html'
import routes from './routes'
import configureStore from './store/configure-store.prod'
import InternalServerError from './views/internal-server-error'

const port = process.env.PORT || 3000
const app = express()

// Ideally, you'd have a proxy server (like nginx) serving /static files
app.use('/static', expressStaticGzip('dist'))

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (redirect && !err) {
      res.redirect(redirect.pathname + redirect.search)
    } else {
      const store = configureStore()
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
        const appHtml = renderToString(<Provider store={store}><InternalServerError /></Provider>)
        res.status(500).send(baseHTML(appHtml, assetsPaths))
      }
    }
  })
  console.info(
    `[${new Date().toLocaleString()}]`,
    `"${req.method} ${req.url} HTTP/${req.httpVersion}"`,
    res.statusCode,
  )
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] App is running on port', port)
})
