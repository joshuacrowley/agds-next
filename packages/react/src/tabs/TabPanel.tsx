import { PropsWithChildren } from 'react';
import { Box } from '../box';
import { tokens } from '../core';
import { useTabPanelsContext } from './TabPanelsContext';
import { useTabsContext } from './TabsContext';
import { useTabIds } from './utils';
import { localPalette } from './localPalette';

export type TabPanelProps = PropsWithChildren<{}>;

export function TabPanel({ children }: TabPanelProps) {
	const { tabsId, activeIndex, contained } = useTabsContext();
	const { panelIndex } = useTabPanelsContext();
	const { tabButtonId, panelId } = useTabIds(tabsId, panelIndex);
	const isSelected = activeIndex === panelIndex;
	return (
		<Box
			aria-labelledby={tabButtonId}
			border
			css={{
				background: localPalette.panelBg,
				color: localPalette.panelFg,
				// Border styles
				borderTopWidth: 0,
				borderRadius: `0 0 ${tokens.borderRadius}px ${tokens.borderRadius}px`,
				[tokens.mediaQuery.min.sm]: {
					borderTopWidth: tokens.borderWidth.sm,
					...(contained
						? {
								borderRadius: `0 ${tokens.borderRadius}px ${tokens.borderRadius}px`,
						  }
						: {
								paddingLeft: 0,
								paddingRight: 0,
								borderLeftWidth: 0,
								borderRightWidth: 0,
								borderRadius: 0,
						  }),
				},
			}}
			display={isSelected ? undefined : 'none'}
			focusRingFor="keyboard"
			id={panelId}
			paddingX={{ xs: 0.75, md: 1.5 }}
			paddingY={1.5}
			role="tabpanel"
			tabIndex={isSelected ? 0 : -1}
		>
			{children}
		</Box>
	);
}
