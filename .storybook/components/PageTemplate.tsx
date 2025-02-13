import { ReactNode } from 'react';
import { Logo } from '@ag.ds-next/react/ag-branding';
import { Box, Stack } from '@ag.ds-next/react/box';
import { tokens } from '@ag.ds-next/react/core';
import { Footer, FooterDivider } from '@ag.ds-next/react/footer';
import { Header } from '@ag.ds-next/react/header';
import { AvatarIcon } from '@ag.ds-next/react/icon';
import { LinkList } from '@ag.ds-next/react/link-list';
import { MainNav } from '@ag.ds-next/react/main-nav';
import { Text } from '@ag.ds-next/react/text';

export const PageTemplate = ({
	background,
	children,
}: {
	background?: 'body' | 'bodyAlt';
	children: ReactNode;
}) => {
	return (
		<Box background={background}>
			<Stack palette="dark">
				<Header
					background="bodyAlt"
					logo={<Logo />}
					heading="Export Service"
					subline="Supporting Australian agricultural exports"
				/>
				<MainNav
					id="main-nav"
					activePath="#home"
					items={[
						{ label: 'Home', href: '#home' },
						{ label: 'Category', href: '#category' },
					]}
					secondaryItems={[
						{
							label: 'Sign in',
							href: '#sign-in',
							endElement: <AvatarIcon color="action" />,
						},
					]}
				/>
			</Stack>
			{children}
			<Box palette="dark">
				<Footer background="bodyAlt">
					<nav aria-label="footer">
						<LinkList
							links={[
								{ label: 'Home', href: '/' },
								{
									label: 'Storybook',
									href: 'https://design-system.agriculture.gov.au/storybook/index.html',
								},
								{
									label: 'Playroom',
									href: 'https://design-system.agriculture.gov.au/playroom/index.html',
								},
								{
									label: 'Starter kit',
									href: 'https://github.com/steelthreads/agds-starter-kit',
								},
							]}
							horizontal
						/>
					</nav>
					<FooterDivider />
					<Text fontSize="xs" maxWidth={tokens.maxWidth.bodyText}>
						We acknowledge the traditional owners of country throughout
						Australia and recognise their continuing connection to land, waters
						and culture. We pay our respects to their Elders past, present and
						emerging.
					</Text>
					<Text fontSize="xs" maxWidth={tokens.maxWidth.bodyText}>
						&copy; 2022 Department of Agriculture, Fisheries and Forestry
					</Text>
				</Footer>
			</Box>
		</Box>
	);
};
