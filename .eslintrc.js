module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "prettier"],
  rules: {
    "prefer-const": "error",
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unsafe-optional-chaining": "off",
    "no-useless-escape": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  plugins: ["prettier"],
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.d.ts", "**/*.vue", "**/*.html"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
