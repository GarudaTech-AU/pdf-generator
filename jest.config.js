module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^configs$': '<rootDir>/src/configs',
    '^consts': '<rootDir>/src/consts',
  },
};
