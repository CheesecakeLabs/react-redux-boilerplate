const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const postCSSImport = require('postcss-import')
const postCSSNested = require('postcss-nested')
const postCssCssVariables = require('postcss-css-variables')()

const postCSSAutoprefixer = autoprefixer({ browsers: ['IE 9', 'iOS 7'] })

const postCssImport = postCSSImport({
  addDependencyTo: webpack,
})

module.exports = {
  plugins: [postCssImport, postCSSAutoprefixer, postCSSNested, postCssCssVariables],
}
