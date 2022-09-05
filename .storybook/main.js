module.exports = {
	stories: [
		'../packages/*/src/**/*.stories.@(ts|tsx)',
		'./stories/*.@(ts|tsx)',
	],
	addons: [
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					test: [/\.tsx?$/],
				},

				loaderOptions: {
					prettierConfig: { printWidth: 80, singleQuote: false },
					injectStoryParameters: false,
				},
			},
		},
		'@storybook/addon-links',
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false,
			},
		},
		'@storybook/addon-a11y',
	],
	framework: '@storybook/react',
	staticDirs: ['../example-site/public'],
};
