import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

import vendorStats from '../../dist/vendor.stats.json' // eslint-disable-line import/no-unresolved
import clientStats from '../../dist/production.stats.json' // eslint-disable-line import/no-unresolved

const checksum = (str, algorithm = 'sha384', encoding = 'base64') =>
  crypto
    .createHash(algorithm)
    .update(str, 'utf8')
    .digest(encoding)

const fileSum = (file, algorithm) => checksum(fs.readFileSync(file), algorithm)

const calculateSRI = (file, algorithm) =>
  `${algorithm}-${fileSum(path.join('.', 'dist', file), algorithm)}`

const getPathData = asset => ({ path: asset, sri: calculateSRI(asset, 'sha384') })

export const assetsPaths = {
  vendor: getPathData(vendorStats['vendor.js']),
  production: getPathData(clientStats['production.js']),
  styles: getPathData(clientStats['production.css']),
}

export const callGetData = (params, component) =>
  component && component.getData && component.getData(params)
