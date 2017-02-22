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

app.get('*', (req, res) => {
  res.send(baseHTML())
})

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.warn(err)
    return
  }

  console.info(`Listening at http://localhost:${port}`)
})
