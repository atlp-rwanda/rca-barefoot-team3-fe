module.exports = {
    testEnvironment: "jsdom",
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",
      "!src/index.js",
      "!**/node_modules/**"
    ],
    coverageReporters: ["lcov", "text", "cobertura"],
    coverageDirectory: "coverage",
    coverageThreshold: {
      global: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95
      }
    },
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: "test-results",
          outputName: "jest-results.xml"
        }
      ]
    ],
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"]
  };
  