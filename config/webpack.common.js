const path = require('path');
const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv-flow').config({
  path: path.join(paths.root),
});

module.exports = {
  entry: [
    // SCSS
    paths.src + '/styles/index.scss',
    // TSX
    paths.src + '/index.tsx',
  ],
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
  },
  resolve: {
    // alias: {
    //   src: paths.src,
    //   app: paths.src,
    // },
    extensions: ['', '.js', '.jsx', '.tsx', '.ts'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve('./config/tsconfig.json'),
        extensions: ['', '.js', '.jsx', '.tsx', '.ts'],
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static,
          to: '',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      favicon: paths.assets + '/favicon.ico',
      template: paths.assets + '/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve('./config/tsconfig.json'), // CORRECT
            },
          },
        ],

        exclude: /node_modules/,
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
};
