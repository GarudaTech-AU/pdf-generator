module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['.', 'node_modules'],
      },
    },
  },
  rules: {
    semi: 'off',
    quotes: 'off',
    indent: 'off',
    'padded-blocks': 'off',
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'no-tabs': 'off',
    'jsx-quotes': 'off',
    'implicit-arrow-linebreak': 'off',
    'max-len': 'off',
    'no-console': 'error',
    // For some reasons import .. from 'types' and './types` throw an errror
    'import/no-duplicates': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'import/no-self-import': 0,
    'no-irregular-whitespace': 0,
    'import/no-mutable-exports': 0,
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    'prefer-promise-reject-errors': 0,
    // Disallows providing the 10 radix by default.
    radix: ['error', 'as-needed'],
    // Forces using all curly braces.
    curly: ['error', 'all'],
    // 'require' is used only in config files (e.g. rollup).
    'global-require': 'off',
    // Disable linebreak style to prevent conflicts different environments.
    'linebreak-style': 'off',
    // Keep line between class members except of simple class properties
    // e.g. class variables or component state.
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    // There is no difference except `allowTernary` option.
    // We prefer to use `if shorthands` for logic operations.
    // @example condition ? method1() : method2()
    'no-unused-expressions': ['error', { allowTernary: true }],
    // Forbid empty if-else blocks, but allow empty `try {...} catch(e) {}`.
    'no-empty': ['error', { allowEmptyCatch: true }],
    // Extend airbnb rule to remove eslint warning for immer usage also.
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'context', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
          'draft', // for immer
        ],
      },
    ],
    // Negated conditions are more difficult to understand. - turn off for a while
    'no-negated-condition': 'off',
    // It's important to stick to readable imports so this rule is must have here.
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    // No need to specify extensions if files are named correctly.
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
    // Allow dev dependencies import for config, test, storybook files.
    // Also ignore `src/setupTests` file for jest setup.
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
  overrides: [
    {
      // Extend config for ts files.
      files: ['**/*.ts'],
      // Default eslint parser for TypeScript.
      // https://github.com/palantir/tslint/issues/4534
      parser: '@typescript-eslint/parser',
      // Extend config with typescript and typescript import in right order.
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
      // TypeScript specific rules.
      rules: {
        'no-restricted-exports': 0,
        camelcase: 'off',
        // Override again because we extend `prettier` after `baseConfig`.
        curly: ['error', 'all'],
        // Do not warn on `d.ts` references.
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        // Typescript is used for type checking.
        'consistent-return': 'off',
        // TypeScript is used for type checking.
        // Do not throw error because we prefer to use type inheritance.
        '@typescript-eslint/explicit-function-return-type': 'off',
        // Ignore unused vars for edge case (rest props)
        // e.g. { className, ...rest }
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        // We prefer not to use classes so this rule is useless.
        '@typescript-eslint/unbound-method': 'off',
        // Any is the only option in some cases.
        '@typescript-eslint/no-explicit-any': 'off',
        // Nothing bad in empty function.
        '@typescript-eslint/no-empty-function': [
          'error',
          { allow: ['arrowFunctions', 'functions', 'methods'] },
        ],
        // Disable for compatibility with `@typescript-eslint/no-use-before-define`.
        'no-use-before-define': 'off',
        // Extend `no-use-before-define` to support TypeScript.
        '@typescript-eslint/no-use-before-define': 'error',
        // There is no need to enforce double typing because of type inheritance.
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // Disable for compatibility with `@typescript-eslint/no-shadow`.
        'no-shadow': 'off',
        // Nothing bad in type parameter shadow.
        '@typescript-eslint/no-shadow': [
          'error',
          {
            ignoreFunctionTypeParameterNameValueShadow: true,
          },
        ],
        // We prefer to use interface in most cases.
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      },
    },
  ],
}
