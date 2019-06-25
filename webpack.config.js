const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlMinifierPlugin = require('html-minifier-webpack-plugin');



module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  devServer: {
    overlay: true
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader},
          { loader: 'css-loader' },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          { test: /\.html$/, loaders: ['file-loader?name=[name].html', 'extract-loader', 'html-loader'] },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css'}),
    new HtmlMinifierPlugin({
      // HTMLMinifier options
  })
  ],
  devtool: 'cheap-eval-source-map'
};