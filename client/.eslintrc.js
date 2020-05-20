const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin').configs.recommended;

module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	files: ['**/*.ts', '**/*.tsx'],
	plugins: ['@typescript-eslint', 'prettier'],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {},
		},
	},
	rules: Object.assign(typescriptEslintRecommended.rules, {
		quotes: [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		semi: ['error', 'never'],
		indent: ['error', 'tab'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	}),
}
