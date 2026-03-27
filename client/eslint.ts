const path = require("path");

module.exports = {
  overrides: [
    {
      files: ["client/**/*.{ts,tsx}"],
      parserOptions: {
        project: "./client/tsconfig.json",
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
    {
      files: ["server/**/*.ts"],
      parserOptions: {
        project: "./server/tsconfig.json",
        tsconfigRootDir: path.resolve(__dirname),
      },
    },
  ],
};
