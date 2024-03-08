const { composePlugins, withNx } = require('@nx/rspack');
const path = require('path');
const Dotenv = require('rspack-plugin-dotenv');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = composePlugins(withNx(), async (config) => {
  config.plugins.push(
    new Dotenv({
      path: 'apps/backend/m2s2-server/.env',
      safe: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './tsconfig.app.json',
      },
    }),
  );
  config.builtins['define'] = {
    'process.env': JSON.stringify(process.env),
  };
  config.devServer['historyApiFallback'] = true;
  config.devServer['port'] = process.env.PORT;

  config.experiments = {
    rspackFuture: {
      disableTransformByDefault: true,
    },
  };
  config.resolve = {
    tsConfigPath: path.resolve(__dirname, '../../../tsconfig.base.json'),
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['module', 'main'],
  };
  config.mode = 'none';
  config.devtool = 'source-map';
  config.context = __dirname;
  config.optimization = {
    sideEffects: true,
    minimize: false,
    runtimeChunk: false,
    concatenateModules: true,
  };
  // config.module.rules = [
  //   {
  //     test: /\.ts$/,
  //     use: {
  //       loader: 'builtin:swc-loader',
  //       options: {
  //         jsc: {
  //           parser: {
  //             syntax: 'typescript',
  //             tsx: false,
  //             decorators: true,
  //             dynamicImport: true,
  //           },
  //           transform: {
  //             legacyDecorator: true,
  //             decoratorMetadata: true,
  //           },
  //           loose: true,
  //           target: 'es2017',
  //           keepClassNames: true,
  //         },
  //         module: {
  //           type: 'commonjs',
  //         },
  //       },
  //     },
  //   },
  // ];

  config.externals = [nodeExternals()];
  config.externalsType = 'commonjs';

  config.stats = {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false,
  };
  return config;
});
