/* eslint no-console: 0 */
import React from 'react'
import ReactDOM from 'react-dom/server'
import express from 'express'
import webpack from 'webpack'
import config from './webpack.config.babel'
const port = process.env.PORT || 3000

import App from './app'

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}))

app.use(require('webpack-hot-middleware')(compiler))

const componentHTML = ReactDOM.renderToString(<App />)

const html = `
  <html>
    <head>
      <title>Quiz Wall</title>
      <link rel="stylesheet" href="http://localhost:8050/static/main.css">
      </head>
      <body>
          <div id="root">${componentHTML}</div>
           <script type="application/javascript" src="http://localhost:8050/static/bundle.js"></script>
      </body>
  </html>
`

app.get('*', (req, res) => {
  res.end(html)
})

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://localhost:${port}`)
})

