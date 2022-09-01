import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { Header } from '@ag.ds-next/header';
import { MainNav } from '@ag.ds-next/main-nav';
import { NotificationBadge } from '@ag.ds-next/badge';
import { AvatarIcon } from '@ag.ds-next/icon';

export default {
	title: 'Quota/InternalHeader',
};

const InternalHeader = ({
	market,
	quota,
	quotaCode,
	periodEnd,
	agreementCode,
	periodTerm,
	shortHand,
}) => (
	<>
		<Header background="bodyAlt" heading="Quota Adminstration" size="sm" />
		<MainNav
			background="shadeAlt"
			activePath={'#requests'}
			items={[
				{
					endElement: (
						<NotificationBadge tone="action" value={999} max={1000} />
					),
					href: '#requests',
					label: 'Requests',
				},
				{ href: '#quota', label: 'Quota' },
				{ href: '#entitlements', label: 'Entitlements' },
				{ href: '#settings', label: 'Settings' },
			]}
			secondaryItems={[
				{
					endElement: <AvatarIcon />,
					href: '#account',
					label: 'Account',
				},
			]}
		/>
	</>
);

export const Light = () => (
	<Box palette="light">
		<InternalHeader />
	</Box>
);
