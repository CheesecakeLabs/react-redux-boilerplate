import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import expressStaticGzip from 'express-static-gzip'
import { serverStatus, getStatus } from '@cheesecakelabs/boilerplate/utils'
import Helmet from 'react-helmet'
import flatten from 'lodash.flatten'
import { Map } from 'immutable'

import { assetsPaths, callGetData } from '_utils/server'

import appPackage from '../package.json'

import './bootstrap'
import baseHTML from './index.html'
import routes from './routes'
import configureStore from './store/configure-store.prod'

const port = process.env.PORT || 3000
const app = express()

serverStatus()

// Ideally, you'd have a proxy server (like nginx) serving /static files
app.use('/static', expressStaticGzip('dist'))
app.get('/version', (req, res) => res.status(200).send(appPackage.version))

app.get('*', (req, res) => {
  const initialState = {} // here goes anything that has to be done with cookies/whatever
  match({ routes: routes(initialState), location: req.url }, (err, redirect, props) => {
    if (redirect && !err) {
      res.redirect(redirect.pathname + redirect.search)
    } else {
      try {
        const promises = props.components.map(callGetData.bind(null, props.params)).filter(Boolean)
        Promise.all(flatten(promises))
          .then((data = []) => {
            const preloadedState = new Map().withMutations(newMap => {
              data.forEach(getData => {
                newMap.mergeDeep(getData)
              })
            })
            const store = configureStore(preloadedState.toObject())
            const appHtml = renderToString(
              <Provider store={store}>
                <RouterContext {...props} />
              </Provider>
            )
            res
              .status(getStatus(err, props))
              .send(baseHTML(appHtml, preloadedState, assetsPaths, Helmet.rewind()))
          })
          .catch(e => {
            console.warn('pre-fetch error:\n', e, '\n\n')
            res.status(500).send(baseHTML('', {}, assetsPaths))
          })
      } catch (e) {
        console.warn('render error:\n', e, '\n\n')
        res.status(500).send(baseHTML('', {}, assetsPaths))
      }
    }
  })
  console.info(
    `[${new Date().toLocaleString()}]`,
    `"${req.method} ${req.url} HTTP/${req.httpVersion}"`,
    res.statusCode
  )
})

app.listen(port, err => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] App is running on port', port)
})
