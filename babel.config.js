module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
  ],
};