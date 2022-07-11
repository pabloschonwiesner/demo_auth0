const { defineConfig } = require('@vue/cli-service');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './../demo_static_auth0/public/',
  publicPath: process.env.NODE_ENV === 'production' ? '/public' : '/',
  configureWebpack: {
    devServer: {
      historyApiFallback: true,
      server: {
        type: 'https',
        options: {
          key: fs.readFileSync(path.join(__dirname, './localhost.key')),
          cert: fs.readFileSync(path.join(__dirname, './localhost.pem')),
          passphrase: 'pigmento',
        },
      },
    },
    plugins: [
      new Dotenv({
        path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
        defaults: '.env.development',
      }),
    ],
  },
});
