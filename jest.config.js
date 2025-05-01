export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/main.jsx", "!src/index.js", "!**/node_modules/**", "!**/vendor/**"],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  }
  