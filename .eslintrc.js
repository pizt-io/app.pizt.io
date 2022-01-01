module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "export" },
    ],
    "comma-spacing": "off",
    "dot-notation": "off",
    "lines-between-class-members": "off",
    "func-call-spacing": "off",
    "indent": "off",
    "no-redeclare": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    "no-return-await": "off",
    "semi": "off",
    "space-before-function-paren": "off",
    "space-infix-ops": "off",
    "quotes": "off",
    "object-curly-spacing": "off",
    "no-shadow": "off",
    "no-throw-literal": "off",

    "no-console": "warn",
    "no-debugger": "warn",
    "quote-props": [2, "consistent-as-needed"],
    "no-case-declarations": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "vue/no-v-for-template-key-on-child": "off",
    "vue/component-definition-name-casing": "error",
    "vue/array-bracket-spacing": "error",
    "vue/arrow-spacing": "error",
    "vue/block-spacing": "error",
    "vue/brace-style": "error",
    "vue/camelcase": "error",
    "vue/eqeqeq": [
      "error",
      "always",
      {
        null: "always",
      },
    ],
    "vue/key-spacing": "error",
    "vue/keyword-spacing": "error",
    "vue/no-boolean-default": ["error", "default-false"],
    "vue/no-deprecated-scope-attribute": "error",
    "vue/no-empty-pattern": "error",
    "vue/object-curly-spacing": ["error", "always"],
    "vue/padding-line-between-blocks": "error",
    "vue/space-infix-ops": "error",
    "vue/space-unary-ops": "error",
    "vue/v-on-function-call": "error",
    "vue/order-in-components": "error",
    "vue/v-slot-style": [
      "error",
      {
        atComponent: "v-slot",
        default: "v-slot",
        named: "longform",
      },
    ],
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true,
      },
    ],
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/no-side-effects-in-computed-properties": "off",
    "vue/v-on-event-hyphenation": ["error", "always"],
    "vue/attribute-hyphenation": ["error", "always"],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/dot-location": ["error", "property"],
    "vue/prop-name-casing": ["error", "camelCase"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
