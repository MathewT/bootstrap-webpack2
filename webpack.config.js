var HtmlWebpackPlugin = require('html-webpack-plugin');
var package     = require('./package.json');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  mode: 'production',
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(css)$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              } 
          }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'app.bundle.css' }),
    new CommonsChunkPlugin({
        name: 'shared',
        minChunks: 2
    }),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Hello World',
        template: './src/index.html',
        chunks: ['vendor', 'shared', 'app'],
        path: path.join(__dirname, "../dist/"),
        filename: 'index.html' 
    }),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Settings',
        template: './src/index.html',
        chunks: ['vendor', 'shared', 'settings'],
        path: path.join(__dirname, "../dist/"),
        filename: 'settings.html'
    }),
    new CopyWebpackPlugin([   
        {from: 'src/images', to: 'images'}   
    ]),
  ]
};