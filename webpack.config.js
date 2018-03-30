const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const at = pathname => path.resolve(__dirname, pathname)

module.exports = {
  entry: {
    app: at('src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: at('dist')
  },
  devServer: {
    contentBase: at('dist'),
    hot: true,
    inline: true
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: ['node_modules/', 'dist/'],
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Shadow DOM - INEHEALTH TALKS',
      template: at('src/index.html')
    }),
    new CopyWebpackPlugin([{
      from: at('src/assets'),
      to: 'assets'
    }])
  ]
}
