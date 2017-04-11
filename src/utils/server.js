import vendorStats from '../../dist/vendor.stats.json' // eslint-disable-line import/no-unresolved
import clientStats from '../../dist/production.stats.json' // eslint-disable-line import/no-unresolved

export const assetsPaths = {
  vendor: vendorStats['vendor.js'],
  production: clientStats['production.js'],
  styles: clientStats['production.css'],
}
