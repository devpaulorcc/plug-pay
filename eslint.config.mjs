import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,
    {
        plugins: {
            prettier: prettier,
        },
        rules: {
            // Requires explicit return types on functions.
            '@typescript-eslint/explicit-function-return-type': 'error',

            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    // Requires explicit visibility modifiers (public, private, protected) for class members.
                    accessibility: 'explicit',
                    overrides: {
                        // Does not enforce 'public' visibility on constructors.
                        constructors: 'no-public',
                    },
                },
            ],

            // Disables the rule that enforces explicit return types for exported functions.
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // Disables the rule that requires a prefix (e.g., 'I') for interface names.
            '@typescript-eslint/interface-name-prefix': 'off',

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    // Enforces PascalCase naming for classes, interfaces, type aliases, and enums.
                    selector: ['class', 'interface', 'typeAlias', 'enum'],
                    format: ['PascalCase'],
                },
                {
                    // Enforces camelCase naming for class methods and functions.
                    selector: ['classMethod', 'function'],
                    format: ['camelCase'],
                },
                {
                    // Enforces camelCase naming for variables or UPPER_CASE (for constants).
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                },
            ],

            // Disables the rule that bans the use of the 'any' type.
            '@typescript-eslint/no-explicit-any': 'off',

            'prettier/prettier': [
                'error',
                {
                    printWidth: 80,
                    tabWidth: 4,
                    useTabs: false,
                    singleQuote: true,
                    trailingComma: 'all',
                    arrowParens: 'always',
                    semi: true,
                    endOfLine: 'auto',
                },
            ],
        },
    },
];