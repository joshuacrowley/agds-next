import { PropsWithChildren } from 'react';
import { Box, Flex } from '@ag.ds-next/box';
import { ResponsiveProp } from '@ag.ds-next/core';
import { ChevronDownIcon, ChevronUpIcon } from '@ag.ds-next/icon';
import { BaseButton } from '@ag.ds-next/button';

export type TableHeaderWidthType =
	| '10%'
	| '15%'
	| '20%'
	| '25%'
	| '30%'
	| '33%'
	| '35%'
	| '40%'
	| '45%'
	| '50%'
	| '55%'
	| '60%'
	| '65%'
	| '66%'
	| '70%'
	| '75%'
	| '80%'
	| '85%'
	| '90%';

export type TableHeaderProps = PropsWithChildren<{
	/** Can be used to conditionally hide or show table cells at different breakpoints. */
	display?: ResponsiveProp<'none' | 'table-cell'>;
	/** Defines the cells that the header (defined in the <th>) element relates to. */
	scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
	/** Sets the horizontal alignment of the content. */
	textAlign?: 'left' | 'center' | 'right';
	/** Sets the width of the column. */
	width?: ResponsiveProp<TableHeaderWidthType>;
}>;

export const TableHeader = ({
	children,
	textAlign = 'left',
	width,
	...props
}: TableHeaderProps) => {
	return (
		<Box
			as="th"
			color="text"
			padding={0.75}
			fontWeight="bold"
			focus
			width={width}
			css={{
				textAlign,
			}}
			{...props}
		>
			{children}
		</Box>
	);
};

export type TableSortDirection = 'asc' | 'dsc';

export const SortableTableHeader = ({
	children,
	textAlign = 'left',
	width,
	onSortChange,
	isActivelySortedBy,
	sortDir,
	...props
}: TableHeaderProps & {
	sortDir?: TableSortDirection;
	isActivelySortedBy?: boolean;
	onSortChange?: (sortDirection: TableSortDirection) => void;
}) => {
	const Icon =
		isActivelySortedBy && sortDir === 'asc' ? ChevronUpIcon : ChevronDownIcon;
	return (
		<Box
			as="th"
			padding={0.75}
			focus
			width={width}
			css={{
				textAlign,
				textDecoration: 'underline',
			}}
			{...props}
		>
			<Flex
				as={BaseButton}
				color="action"
				onClick={() => onSortChange(sortDir === 'asc' ? 'dsc' : 'asc')}
				fontWeight="bold"
				gap={0.5}
				alignItems="center"
				lineHeight="nospace"
			>
				{children}
				{isActivelySortedBy && <Icon size="sm" weight="bold" color="action" />}
			</Flex>
		</Box>
	);
};
