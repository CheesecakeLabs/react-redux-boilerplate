import vendorStats from '../../dist/vendor.stats.json' // eslint-disable-line import/no-unresolved
import clientStats from '../../dist/production.stats.json' // eslint-disable-line import/no-unresolved

export const assetsPaths = {
  vendor: vendorStats['vendor.js'],
  production: clientStats['production.js'],
  styles: clientStats['production.css'],
}

export const getStatus = (err, props) => {
  if (err) {
    return 500
  }

  const isNotFound = props.routes.find((route) => route.path === '*')
  if (props && !isNotFound) {
    return 200
  }

  return 404
}
