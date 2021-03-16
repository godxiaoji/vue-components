const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const { getSymbolId } = require('./util')

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    vfox: './src/index.ts'
  },
  output: {
    path: resolve('./dist'),
    filename: 'index.js',
    library: 'vfox',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@': resolve('./src')
    }
  },
  externals: {
    vue: 'vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-typescript', // 引用Typescript插件
              {
                allExtensions: true // ?支持所有文件扩展名
              }
            ]
          ]
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-sprite-loader',
      //   include: [resolve('assets/icons')],
      //   options: {
      //     symbolId(filePath) {
      //       return getSymbolId(filePath, 'assets/icons')
      //     }
      //   }
      // },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: 'imgs/[name].[hash:7].[ext]'
      //   },
      //   exclude: [resolve('assets/icons')]
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
            normalizeUnicode: false
          }
        ]
      },
      canPrint: false
    })
  ]
}
