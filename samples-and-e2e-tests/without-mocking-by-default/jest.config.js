module.exports = {
  transform: {
    "^.+\\.[j]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ['<rootDir>setupTests.js'],
};
