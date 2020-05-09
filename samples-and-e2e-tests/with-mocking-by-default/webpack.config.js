const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    entry: ['@hot-loader/react-dom', './src/index.jsx'],
    output: {
      filename: '[name].[hash].js',
      path: __dirname + '/dist',
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: env === 'production' ? false : 'source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({ template: './src/index.html', favicon: "./src/favicon.ico" })
    ],
    devServer: {
      contentBase: './dist',
      hot: true,
    },
  };
};
