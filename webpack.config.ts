import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

console.info(`[webpack.config] NODE_ENV: ${process.env.NODE_ENV}`);
const isDevelopment = process.env.NODE_ENV !== 'production';

const DIR_ROOT = path.join(__dirname);
const DIR_APP_SRC = path.join(DIR_ROOT, 'src');
const DIR_APP_DIST = path.join(DIR_ROOT, 'dist');

const PATH_TO_INDEX_FILE = path.join(DIR_APP_SRC, 'index.tsx');

const BUILD = {
  output: {
    path: DIR_APP_DIST,
  },
  htmlTemplateName: path.join(DIR_APP_SRC, 'html', 'index.hbs'),
};

const getPlugins = () => {
  const plugins = [
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      title: 'Time tracker',
      template: BUILD.htmlTemplateName,
      hash: true,
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ];

  if (isDevelopment) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    // some only prod
  }


  return plugins;
};

const devServer: DevServerConfiguration = {
  static: './dist',
  port: 80,
  hot: true,
};

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  node: {
    __filename: true,
    __dirname: true
  },
  devtool: isDevelopment ? 'eval' : false,
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'whatwg-fetch',
    PATH_TO_INDEX_FILE,
  ],
  output: {
    path: BUILD.output.path,
    filename: isDevelopment ? '[name].bundle.js' : 'app.[name].[contenthash].js',
  },
  devServer,
  resolve: {
    alias: {
      '~components': path.join(DIR_APP_SRC, 'components'),
      '~modules': path.join(DIR_APP_SRC, 'modules'),
      '~ui': path.join(DIR_APP_SRC, 'ui'),
      '~styles': path.join(DIR_APP_SRC, 'styles'),
      '~utils': path.join(DIR_APP_SRC, 'utils'),
    },
    extensions: [
      '.json',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  optimization: {
    noEmitOnErrors: true,
    usedExports: true,
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            },
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              esModule: false,
            }
          },
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: getPlugins(),
};
module.exports = config;
