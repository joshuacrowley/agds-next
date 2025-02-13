import { PropsWithChildren, useMemo } from 'react';
import { Box, Flex } from '@ag.ds-next/react/box';
import { SkipLinks } from '@ag.ds-next/react/skip-link';
import { TemplateBanner } from './TemplateBanner';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export const AppLayout = ({
	children,
	template,
	focusMode = false,
}: PropsWithChildren<{
	template?: { name: string; slug: string };
	focusMode?: boolean;
}>) => {
	const skipLinks = useMemo(() => {
		const items = [{ href: '#main-content', label: 'Skip to main content' }];
		if (!focusMode) {
			items.push({ href: '#main-nav', label: 'Skip to main navigation' });
		}
		return items;
	}, [focusMode]);

	return (
		<>
			<SkipLinks links={skipLinks} />
			<Flex
				flexDirection="column"
				fontFamily="body"
				palette="light"
				minHeight="100vh"
			>
				{template ? <TemplateBanner {...template} /> : null}
				<SiteHeader focusMode={focusMode} />
				<Box
					as="main"
					id="main-content"
					flexGrow={1}
					tabIndex={-1}
					css={{ '&:focus': { outline: 'none' } }}
				>
					{children}
				</Box>
				<SiteFooter />
			</Flex>
		</>
	);
};
