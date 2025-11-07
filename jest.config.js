module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
 moduleNameMapper: {
  '^@/src/(.*)$': '<rootDir>/src/$1',
  '^@/app/(.*)$': '<rootDir>/src/app/$1',
  '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
},
  setupFilesAfterEnv: [],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};