import webpack from 'webpack';
import path from 'path';
import 'babel-polyfill';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default (env = 'development') => {
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';

  return {
    entry: {
      src: ['babel-polyfill', path.resolve('src')]
    },
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
      path: path.resolve('public'),
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        include: path.resolve('src'),
        loader: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        include: path.resolve('src'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: isProduction ?
                '[local]_[hash:base64:8]' :
                '[path][name]__[local]'
            }
          }, {
            loader: 'sass-loader'
          }]
        })
      }]
    },
    resolve: {
      alias: { src: path.resolve('src') },
      extensions: ['.js', '.json', '.jsx', '.css', '.scss']
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => /node_modules/.test(module.resource)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['src', 'vendor']
      }),
      new ExtractTextPlugin({
        disable: !isProduction,
        filename: 'css/[name].[chunkhash].css',
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('src/index.html')
      }),
      new CompressionPlugin({
        test: /\.css$|\.js$|\.html$/,
        threshold: isDevelopment ? Infinity : 0
      })
    ],
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-maps',
    performance: {
      hints: isDevelopment ? false : 'warning'
    },
    stats: { children: false },
    devServer: {
      contentBase: path.resolve('public'),
      publicPath: '/',
      historyApiFallback: true,
      stats: {
        assets: false,
        chunks: false,
        children: false,
        timings: true
      }
    }
  };
};
