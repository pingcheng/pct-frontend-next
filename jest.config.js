const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/data",
    "<rootDir>/src/app/layout.tsx",
    "<rootDir>/src/components/icons/",
  ],
});
