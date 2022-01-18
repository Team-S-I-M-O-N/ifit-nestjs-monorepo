module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/?(*.)+(test).ts', '<rootDir>/src/**/?(*.)+(ext-test).ts']
}
