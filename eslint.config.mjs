import globals from "globals";

import path from "path";
import {fileURLToPath} from "node:url";

import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";

import etc from "eslint-plugin-etc";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const dynaObjectScan = (obj, cb, _parent, _propertyName, _path = '', _scanned = []) => {
  if (typeof obj === 'object' && obj !== null && _scanned.indexOf(obj) > -1)
    return;
  _scanned.push(obj);
  let skip = false;
  cb({
    value: obj,
    parent: _parent,
    propertyName: _propertyName,
    path: _path,
    skip: () => skip = true,
  });
  if (skip)
    return;
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      obj
        .forEach((itemValue, index) => dynaObjectScan(itemValue, cb, obj, index.toString(), `${_path}[${index.toString()}]`, _scanned));
    }
    else {
      Object.keys(obj)
        .forEach(propertyName => dynaObjectScan(obj[propertyName], cb, obj, propertyName, `${_path}.${propertyName}`, _scanned));
    }
  }
};

const plugins = {
  react,
  etc,
  jest,
  '@stylistic': stylistic,
};

if (false) dynaObjectScan(
  plugins,
  (
    {
      propertyName,
      parent,
    },
    )=>{
    if (propertyName?.includes("flow")) {
      console.debug(propertyName, 'deleted')
      delete parent[propertyName];
    }
  },
)

export default [
  ...compat.extends(
    "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ),

  {
    plugins,

    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
        ...jest.environments.globals.globals,
      },

      parser: tsParser,
    },
  }, {
    files: [
      "**/*.ts",
      "**/*.tsx",
    ],

    rules: {
      "no-debugger": ["warn"],

      // Disable this due to eslint version problem https://pretagteam.com/question/react-was-used-before-it-was-defined-eslint-warning
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "no-template-curly-in-string": "off",

      "no-console": ["warn", {
        allow: [
          "log",
          "warn",
          "error",
          "time",
          "timeEnd",
          // But not "debug"
        ],
      }],

      "no-case-declarations": "off",
      "@typescript-eslint/no-non-null-assertion": "off",

      "space-infix-ops":
        [
          "warn",
          {int32Hint: false},
        ],

      "eol-last": [
        "warn",
        "always",
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/prefer-namespace-keyword": "warn",

      "@typescript-eslint/naming-convention": ["warn", {
        selector: "interface",
        format: [],

        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      }, {
        selector: "enum",
        format: [
          "PascalCase",
          "UPPER_CASE",
        ],

        custom: {
          regex: "^E[A-Z]",
          match: true,
        },
      }],

      "@stylistic/semi": ["warn", "always"],
      "@stylistic/type-annotation-spacing": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "brace-style": ["warn", "stroustrup"],
      "no-extra-boolean-cast": ["warn"],
      "comma-dangle": ["warn", "always-multiline"],
      eqeqeq: [
        // https://eslint.org/docs/rules/eqeqeq
        "warn",
        "smart",
      ],

      "id-blacklist": [
        "warn",
        "any",
        "Number",
        "String",
        "string",
        "Boolean",
        "boolean",
        "Undefined",
        "undefined",
      ],

      "id-match": "warn",

      indent: [
        1,
        2,
        {
          ImportDeclaration: 1,
          SwitchCase: 1,
        },
      ],

      "no-eval": "warn",
      "no-mixed-operators": "warn",
      "no-trailing-spaces": "warn",
      "no-underscore-dangle": "off",
      "no-unsafe-finally": "warn",
      "no-var": "warn",
      semi: "warn",
      curly: ["warn", "multi-line"],

      "object-curly-newline": ["warn", {
        ImportDeclaration: {
          minProperties: 2,
          consistent: true,
          multiline: true,
        },

        ObjectExpression: {
          multiline: true,
          minProperties: 2,
        },

        ObjectPattern: {
          multiline: true,
          minProperties: 2,
        },

        ExportDeclaration: {
          multiline: true,
          minProperties: 1,
        },
      }],

      "object-curly-spacing": ["warn", "never"],

      "object-property-newline": ["warn", {
        allowAllPropertiesOnSameLine: false,
        allowMultiplePropertiesPerLine: false,
      }],

      "keyword-spacing": ["warn", {
        before: true,
        after: true,
      }],

      "space-before-blocks": ["warn", "always"],
      "array-bracket-spacing": ["warn", "never"],
      "computed-property-spacing": ["warn", "never"],

      "spaced-comment": [
        "warn",
        "always",
        {
          markers: ["/"],
        },
      ],

      "switch-colon-spacing": ["warn", {
        after: true,
        before: false,
      }],

      "function-call-argument-newline": "off",
      "function-paren-newline": "off",
      "newline-per-chained-call": "warn",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-pascal-case": ["warn", {}],
      "react/jsx-first-prop-new-line": ["warn", "multiline-multiprop"],

      "react/jsx-max-props-per-line": ["warn", {
        maximum: 2,
      }],

      "react/jsx-indent-props": ["warn", 2],
      '@stylistic/jsx-indent': 'error',
      "react/jsx-closing-bracket-location": "warn",
      "react/self-closing-comp": "warn",
      "etc/no-commented-out-code": "warn",
      "capitalized-comments": ["warn", "always"],
      "jest/no-conditional-expect": "off",
    },
  }, {
    files: ["**/*.stories.*"],

    rules: {
      "import/no-anonymous-default-export": "off",
    },
  }];
