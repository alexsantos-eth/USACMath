module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
	rules: {
		'no-use-before-define': 'off',
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
		'jsx-a11y/label-has-for': [
			'error',
			{
				required: {
					some: ['nesting', 'id'],
				},
			},
		],
		'@typescript-eslint/no-use-before-define': ['error'],
		'jsx-a11y/href-no-hash': ['off'],
		'react/jsx-props-no-spreading': ['off'],
		'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'no-console': [
			'error',
			{
				allow: ['warn', 'error'],
			},
		],
		'multiline-ternary': 0,
		'no-unused-vars': 'off',
		'no-shadow': 1,
		'@typescript-eslint/no-unused-vars': 'error',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-closing-bracket-location': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/prop-types': 0,
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'max-len': [
			'warn',
			{
				code: 100,
				tabWidth: 2,
				comments: 100,
				ignoreComments: false,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
	},
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
}
