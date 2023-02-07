// https://github.com/hagopj13/node-express-boilerplate/blob/master/jest.config.js
export default {
  testEnvironment: "jest-environment-node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "app/config",
    "app/index.js",
    "tests",
  ],
  coverageReporters: ["text", "lcov", "clover", "html"],
};
