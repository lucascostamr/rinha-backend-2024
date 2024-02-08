const config = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src'],
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "jest-environment-node",
};

module.exports = config;
