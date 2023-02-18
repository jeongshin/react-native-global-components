module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-export-namespace-from',
      // [
      //   'module-resolver',
      //   {
      //     extensions: ['.tsx', '.ts', '.js', '.json'],
      //     alias: {
      //       'react-native-global-components': './packages/src',
      //     },
      //   },
      // ],
    ],
  };
};
