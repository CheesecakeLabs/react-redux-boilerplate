import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import baseHTML from './index.html'
import routes from './routes'
import configureStore from './store/configure-store.prod'

const port = process.env.PORT || 3000

const store = configureStore()
const app = express()

// Ideally, you'd have a proxy server (like nginx) serving /static files
app.use('/static', express.static('dist'))

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      // TODO: Improve 500 by rendering a custom react-router route
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>,
      )
      res.send(baseHTML(appHtml))
    } else {
      // TODO: Improve 404 by rendering a custom react-router route
      res.status(404).send('Not Found')
    }
  })
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] App is running on port', port)
})
