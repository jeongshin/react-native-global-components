require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

global.ReanimatedDataMock = {
  now: () => Date.now(),
};
