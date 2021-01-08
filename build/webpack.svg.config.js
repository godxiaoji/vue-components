const webpack = require('webpack')
const { resolve, relative } = require('path')
const { kebabCase2Pascalcase } = require('./util')

module.exports = {
  devtool: false,
  mode: 'production',
  entry: {
    'load-svg': './src/Icon/load-svg.js'
  },
  output: {
    path: resolve('./src/Icon'),
    filename: 'lib/[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('assets/icons')],
        options: {
          symbolId(filePath) {
            let paths = relative('assets/icons', filePath)
              .replace(/\\/g, '/')
              .split('/')

            const fileName = paths.pop().replace('.svg', '')

            return 'icon-' + kebabCase2Pascalcase([fileName].concat(paths).join('-'))
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '/* eslint-disable */', // 其值为字符串，将作为注释存在
      raw: true, // 如果值为 true，将直出，不会被作为注释
      entryOnly: false // 如果值为 true，将只在入口 chunks 文件中添加
    })
  ]
}
