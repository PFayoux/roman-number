var path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    filename: 'app.bundle.js',
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  optimization: {
    runtimeChunk: {
      name: 'runtime' // necessary when using multiple entrypoints on the same page
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          fix: true,
          emitError: true,
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      generate: (seed, files) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)

        const entrypointFiles = files.filter(x => x.isInitial && !x.name.endsWith('.map')).map(x => x.path)

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 3001,
    hot: true,
    proxy: {
      '/event_arab_to_roman': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/query_arab_to_roman': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
