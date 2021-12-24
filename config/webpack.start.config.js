'use strict'

const open = require('open');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpackDevConfig = require('./webpack.dev.config')

const measureSpeed = process.env.MEASURE === 'true'
const smp = new SpeedMeasurePlugin({ disable: !measureSpeed });
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '3000'

const webpackServeConfig = {
  ...webpackDevConfig,
  stats: 'none',
  devServer: {
    client: {
      logging: 'none',
      overlay: {
        errors: true,
        warnings: false
      },
      progress: true,
      reconnect: true,
    },
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },

    host: HOST,
    port: PORT,

    hot: true,
    open: {
      app: {
        name: open.apps.chrome
      }
    },

    static: {
      publicPath: '/',
      serveIndex: false,
    },

    watchFiles: {
      options: {
        ignored: /node_modules/
      }
    }

  }
}

module.exports = smp.wrap(webpackServeConfig)
