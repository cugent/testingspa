1.a Setup Babel
We will be using Babel to compile our code.Install it and some additional dependencies using:

yarn add--dev @babel/core @babel/preset - env @babel/preset-react @babel/plugin - syntax - dynamic -import @babel/plugin-proposal-object-rest-spread

Copy
Next create a.babelrc file and paste in the following:

.babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    ["@babel/preset-react"]
  ],
    "plugins": [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-object-rest-spread"
    ]
}

Copy
Learn more about what each of these packages do by visiting the Babel docs.

1.b Setup Webpack
Note

It is important to point out that you do not have to use Webpack in order use single - spa.Learn more about Separating applications and the different ways you can use single - spa for your specific build.

Run the following commands to add Webpack, Webpack plugins, and loaders.

# Webpack core
yarn add webpack webpack - dev - server webpack - cli--dev
# Webpack plugins
yarn add clean - webpack - plugin--dev
# Webpack loaders
yarn add style - loader css - loader html - loader babel - loader--dev

Copy
Learn more about these Webpack plugins and loaders at their respective documentation pages.

  CleanWebpackPlugin
style - loader
css - loader
html - Loader
babel - Loader
In the root of your project create a new file name webpack.config.js and paste in the following code:

webpack.config.js
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'single-spa.config': './single-spa.config.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // Webpack style loader added so we can use materialize
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      }, {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};