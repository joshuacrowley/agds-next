import { ComponentMeta, Story } from '@storybook/react';
import { Box } from '../../box';
import {
	HeroCategoryBanner,
	HeroCategoryBannerProps,
} from './HeroCategoryBanner';
import {
	HeroCategoryBannerSubtitle,
	HeroCategoryBannerTitle,
} from './HeroCategoryBannerTitle';

export default {
	title: 'layout/HeroBanner/HeroCategoryBanner',
	component: HeroCategoryBanner,
	subcomponents: {
		HeroCategoryBannerTitle,
		HeroCategoryBannerSubtitle,
	},
	argTypes: {
		title: { control: 'text' },
		subtitle: { control: 'text' },
	},
} as ComponentMeta<typeof HeroCategoryBanner>;

type HeroCategoryBannerStoryProps = HeroCategoryBannerProps & {
	title: string;
	subtitle: string;
};

const Template: Story<HeroCategoryBannerStoryProps> = (args) => (
	<HeroCategoryBanner {...args}>
		<HeroCategoryBannerTitle>{args.title}</HeroCategoryBannerTitle>
		<HeroCategoryBannerSubtitle>{args.subtitle}</HeroCategoryBannerSubtitle>
	</HeroCategoryBanner>
);

const commonArgs = {
	title: 'Website hero banner title - xxl/display (H1)',
	subtitle: 'Short hero banner sentence - md/default (P)',
	image: (
		<img
			src="https://design-system.agriculture.gov.au/img/placeholder/hero-banner.jpeg"
			role="presentation"
			alt=""
		/>
	),
};

export const Basic = Template.bind({});
Basic.args = {
	...commonArgs,
};

export const OnBodyAlt: Story<HeroCategoryBannerStoryProps> = (args) => (
	<Box paddingY={3} background="bodyAlt">
		<Template {...args} />
	</Box>
);
OnBodyAlt.storyName = 'On bodyAlt background';
OnBodyAlt.args = {
	...commonArgs,
	background: 'body',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
	...commonArgs,
	image: undefined,
};
