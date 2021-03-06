const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-mixins');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const NODE_HOST = process.env.NODE_HOST || '0.0.0.0';
const NODE_PORT = process.env.NODE_PORT || 8090;

function getEntrySources(sources) {
  if (!isProd) {
    sources.unshift('react-hot-loader/patch');
    sources.unshift(`webpack-dev-server/client?http://${NODE_HOST}:${NODE_PORT}`);
    sources.unshift('webpack/hot/dev-server');
  }

  return sources;
}


module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  entry: {
    js: getEntrySources(['./src/main.js']),
    vendor: [
      'react',
      'react-dom',
      'react-tap-event-plugin',
      'react-router',
      'redux',
      'react-router-redux',
      'redux-thunk',
      'react-redux',
      'axios',
      'react-slick',
      'react-redux-spinner',
      'redux-localstorage',
      'json-loader'
    ]
  },
  output: {
    path: path.join(__dirname, '/public/build/'),
    publicPath: isProd ? './' : '/build/',
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  performance: {
    hints: isProd
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['eslint-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: isProd
                    ? ExtractTextPlugin.extract({ fallback: 'style-loader', loader: 'css-loader' })
                    : ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: isProd
                    ? ExtractTextPlugin.extract({ fallback: 'style-loader',
                      loader: ['css-loader', 'less-loader'] })
                    : ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          'file-loader?name=[sha512:hash:base64:7].[ext]',
          'image-webpack-loader?progressive=true&optimizationLevel=7&interlaced=true'
        ],
        exclude: [/node_modules/, /public/, /src\/fonts/]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader?name=[name].[ext]',
        exclude: [/node_modules/, /public/, /src\/img/]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { modules: false }],
                'react',
                'stage-2'
              ]
            }
          }
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    inline: false,
    contentBase: path.join(__dirname, '/public'),
    port: NODE_PORT,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      progress: true,
      timings: true,
      version: false,
      warnings: true,
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new webpack.NoErrorsPlugin()
  ]
};

if (isProd) {
  const productionPlugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      postcss: [
        mixins(),
        autoprefixer({
          browsers: 'last 10 versions'
        })
      ],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    })
  ];

  module.exports.plugins.push(...productionPlugins);
} else {
  const productionPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ];

  module.exports.plugins.push(...productionPlugins);
}
