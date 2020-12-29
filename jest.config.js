module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    // tell Jest to handle *.vue files
    'vue'
  ],
  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': require.resolve('babel-jest')
  },
  transformIgnorePatterns: ['/node_modules/'],
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // testEnvironment: 'jest-environment-jsdom-fifteen',
  // serializer for snapshots
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/examples/**/*.spec.[jt]s?(x)'],
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/test/.jest/register-context.js']
}
