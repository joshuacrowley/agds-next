import { forwardRef, ReactNode } from 'react';
import { Box } from '../box';

export type ProgressIndicatorListProps = {
	children: ReactNode;
};

export const ProgressIndicatorList = forwardRef<
	HTMLUListElement,
	ProgressIndicatorListProps
>(function ProgressIndicatorList({ children }, ref) {
	return (
		<Box ref={ref} as="ul" borderTop>
			{children}
		</Box>
	);
});
