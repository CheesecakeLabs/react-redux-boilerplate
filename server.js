/* eslint no-console: 0 */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import config from './webpack.config'
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
    console.log(err)
    return
  }

  console.log(`Listening at http://localhost:${port}`)
})
