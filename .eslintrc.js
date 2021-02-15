module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    // 'react'
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
  },
  "no-unused-vars-experimental": "off",
  // react version check
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  // },
};
