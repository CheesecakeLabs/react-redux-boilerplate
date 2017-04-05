const express = require('express')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require('webpack-dev-middleware')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const baseHTML = require('./src/index.html')

const port = process.env.PORT || 3000
const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}))

app.use(webpackHotMiddleware(compiler))

// index.html links to 2 <script> files,
// one has to be ignored when developing (yarn dev)
// that's why we route one of them to 404
app.get('/static/404', (req, res) => {
  res.status(404).send('')
})

app.get('*', (req, res) => {
  res.send(baseHTML())
})

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.warn(err)
    return
  }

  console.info(`Listening at http://0.0.0.0:${port}`)
})
