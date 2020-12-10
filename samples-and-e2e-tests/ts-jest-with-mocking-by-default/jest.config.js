module.exports = {
  preset: "ts-jest",
  testURL: "http://localhost/",
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ["<rootDir>setupTests.ts"],
};
