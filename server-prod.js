import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import baseHTML from './src/index.html'
import routes from './src/routes'
import configureStore from './src/store/configure-store.prod'

const store = configureStore()
const port = process.env.PORT || 3000
const app = express()

app.use('/static', express.static('dist'))
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      )
      res.send(baseHTML(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] Node app is running on port', port)
})
