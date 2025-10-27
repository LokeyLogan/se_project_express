module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-console": ["warn", { allow: ["error", "log"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
