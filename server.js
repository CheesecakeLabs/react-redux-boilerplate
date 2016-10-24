/* eslint no-console: 0 */
import React from 'react'
import ReactDOM from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import express from 'express'
import webpack from 'webpack'
import config from './webpack.config.babel'

import configureStore from './src/store/configure-store'
import routes from './src/routes'

const port = process.env.PORT || 3000

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}))

app.use(require('webpack-hot-middleware')(compiler))

const renderHTML = ({ componentHTML, initialState }) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Redux Boilerplate</title>
    <link rel="stylesheet" href="http://localhost:8050/static/main.css"
  </head>
  <body>
    <div id="root">${componentHTML}</div>
      <script type="application/javascript">
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script
        type="application/javascript"
        src="http://localhost:8050/static/bundle.js"
      ></script>
  </body>
  </html>
`

app.get('*', (req, res) => {
  const store = configureStore()

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.send(500, error.message)
    }
    const componentHTML = ReactDOM.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )
    const initialState = store.getState()
    const html = renderHTML({
      componentHTML,
      initialState,
    })

    res.end(html)
  })
})

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://localhost:${port}`)
})

