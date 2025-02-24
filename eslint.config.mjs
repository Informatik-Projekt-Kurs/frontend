import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ["src/components/ui/*"]
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs"],

    languageOptions: {
      globals: {},
      ecmaVersion: 2021,
      sourceType: "module"
    }
  },
  ...compat
    .extends(
      "plugin:@next/next/recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:react/recommended"
    )
    .map((config) => ({
      ...config,
      files: ["**/*.ts", "**/*.tsx", "**/*.jsx"]
    })),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],

    plugins: {
      "@typescript-eslint": typescriptEslint,
      react
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "C:\\Users\\boeck\\Desktop\\frontend\\tsconfig.json"
      }
    },

    rules: {
      "no-restricted-imports": "off",

      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: ["../*"]
        }
      ],

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],

      "@typescript-eslint/require-await": "off",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ],

      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-unused-vars": "warn",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-imports": "error",
      "no-unreachable": "error",
      "no-use-before-define": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "no-lonely-if": "error",
      "no-return-await": "error",
      "no-useless-catch": "error",
      "no-var": "error",
      "prefer-const": "error",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple"
        }
      ],

      "@typescript-eslint/no-empty-interface": "error",
      "consistent-return": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "object-shorthand": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-implicit-coercion": "error",
      "@typescript-eslint/return-await": "error",
      "no-unneeded-ternary": "error",
      "@typescript-eslint/no-confusing-void-expression": "warn",
      "@typescript-eslint/no-meaningless-void-operator": "warn",

      "no-plusplus": [
        "error",
        {
          allowForLoopAfterthoughts: true
        }
      ],

      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "no-shadow": "error",

      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",

          overrides: {
            accessors: "off",
            constructors: "no-public",
            methods: "explicit",
            properties: "explicit",
            parameterProperties: "explicit"
          }
        }
      ],

      "@typescript-eslint/consistent-type-exports": [
        "error",
        {
          fixMixedExportsWithInlineTypeSpecifier: true
        }
      ],

      "@typescript-eslint/consistent-generic-constructors": "error",
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",

      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowNullableEnum: false,
          allowAny: false,
          allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
        }
      ],

      "no-self-compare": "error",
      "react/prop-types": "off",
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/no-array-index-key": "warn",
      "react/no-deprecated": "warn",
      "react/no-unused-state": "error",
      "react/button-has-type": "error",
      "react/display-name": "error",
      "react/hook-use-state": "error",
      "react/jsx-fragments": ["error", "element"],
      "react/no-children-prop": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
];
