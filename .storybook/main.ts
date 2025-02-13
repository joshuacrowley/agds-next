import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
	addons: [
		'@storybook/addon-links',
		{ name: '@storybook/addon-essentials', options: { backgrounds: false } },
		'@storybook/addon-a11y',
		'@storybook/addon-postcss',
		'storybook-addon-next-router',
	],
	core: {
		builder: 'webpack5',
	},
	features: {
		/**
		 * Enable code splitting
		 * @see https://storybook.js.org/docs/react/builders/webpack#code-splitting
		 */
		storyStoreV7: true,
	},
	framework: '@storybook/react',
	staticDirs: ['../example-site/public'],
	stories: [
		'../packages/*/src/**/*.stories.@(ts|tsx)',
		'../example-site/**/*.stories.@(ts|tsx)',
		'./stories/*.@(ts|tsx)',
		'./stories/*/index.@(ts|tsx)',
	],
};

export default config;
