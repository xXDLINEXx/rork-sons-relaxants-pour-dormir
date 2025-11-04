module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      // laisse ceci si tu utilises les chemins relatifs type "@/components"
      ['module-resolver', {
        alias: {
          '@': './',
        },
      }],
    ],
  };
};
