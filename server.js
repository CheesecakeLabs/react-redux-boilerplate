const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.warn(err)
    return
  }

  console.info(`Listening at http://localhost:${port}`)
})
