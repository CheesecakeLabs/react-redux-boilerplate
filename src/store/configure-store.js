/* eslint global-require: 0 */
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  module.exports = require('./configure-store.prod')
} else {
  module.exports = require('./configure-store.dev')
}
