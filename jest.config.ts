const config = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/'],
  globals: {
    'ts-jest': { tsconfig: 'tsconfig.build.json' },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-native-reanimated|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*)',
  ],
  coveragePathIgnorePatterns: ['stories', 'node_modules'],
  setupFiles: [
    './jest-setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};

export default config;
