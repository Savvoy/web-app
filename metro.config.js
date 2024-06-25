/**
 * Metro configuration for React Native
 * https://facebook.github.io/metro/docs/configuration
 *
 * @format
 */

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-babel-transformer'),
  },
};
