module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-console": ["warn", { allow: ["error", "log"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],

    // ✅ Required for centralized error handler middleware
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
};
