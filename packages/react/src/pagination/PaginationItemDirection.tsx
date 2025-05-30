import {
	type ElementType,
	type MouseEventHandler,
	type PropsWithChildren,
} from 'react';
import { BaseButton, type BaseButtonProps } from '../button';
import { Box } from '../box';
import { type LinkProps, print } from '../core';
import { Flex } from '../flex';
import { ArrowRightIcon, ArrowLeftIcon } from '../icon';
import { scaleIconOnHover } from '../icon/Icon';
import { TextLink } from '../text-link';
import { BUTTON_SIZE_XS, BUTTON_SIZE_SM } from './utils';

type Direction = 'left' | 'right';

export type PaginationItemDirectionProps = Pick<LinkProps, 'href'> & {
	direction: Direction;
};

export function PaginationItemDirection({
	direction,
	href,
}: PaginationItemDirectionProps) {
	return (
		<PaginationItemDirectionListItem direction={direction}>
			<DirectionLink
				aria-label={`Go to ${direction == 'left' ? 'previous' : 'next'} page`}
				direction={direction}
				href={href}
			>
				{direction === 'left' ? 'Previous' : 'Next'}
			</DirectionLink>
		</PaginationItemDirectionListItem>
	);
}

export type PaginationItemDirectionButtonProps = {
	direction: Direction;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export function PaginationItemDirectionButton({
	direction,
	onClick,
}: PaginationItemDirectionButtonProps) {
	return (
		<PaginationItemDirectionListItem direction={direction}>
			<DirectionButton
				aria-label={`Go to ${direction == 'left' ? 'previous' : 'next'} page`}
				direction={direction}
				onClick={onClick}
			>
				{direction === 'left' ? 'Previous' : 'Next'}
			</DirectionButton>
		</PaginationItemDirectionListItem>
	);
}

export type PaginationItemDirectionListItemProps = LinkProps & {
	direction: Direction;
};

function PaginationItemDirectionListItem({
	children,
	direction,
}: PaginationItemDirectionListItemProps) {
	return (
		<Box
			as="li"
			paddingLeft={direction === 'right' ? { sm: 1 } : undefined}
			paddingRight={direction === 'left' ? { sm: 1 } : undefined}
		>
			{children}
		</Box>
	);
}

export type DirectionLinkProps = LinkProps & {
	direction: Direction;
};

const DirectionLink = ({ children, ...props }: DirectionLinkProps) => (
	<BaseDirectionLink as={TextLink} {...props}>
		{children}
	</BaseDirectionLink>
);

type DirectionButtonProps = BaseButtonProps & {
	direction: Direction;
};

const DirectionButton = ({ children, ...props }: DirectionButtonProps) => (
	<BaseDirectionLink as={BaseButton} {...props}>
		{children}
	</BaseDirectionLink>
);

type BaseDirectionLinkProps = PropsWithChildren<{
	as: ElementType;
	direction: Direction;
}>;

const BaseDirectionLink = ({
	as,
	children,
	direction,
	...props
}: BaseDirectionLinkProps) => {
	const scaleIconCSS = scaleIconOnHover('sm');
	return (
		<Flex
			alignItems="center"
			as={as}
			css={{
				alignSelf: 'flex-start',
				svg: {
					transition: scaleIconCSS.transition,
				},
				':hover svg': {
					transform: scaleIconCSS.transform,
				},
				...print.hideHref,
			}}
			focusRingFor="keyboard"
			fontFamily="body"
			fontWeight="normal"
			gap={0.5}
			height={{ xs: BUTTON_SIZE_XS, sm: BUTTON_SIZE_SM }}
			inline
			justifyContent="center"
			link
			width={{ xs: BUTTON_SIZE_XS, sm: 'auto' }}
			{...props}
		>
			{direction === 'left' ? <ArrowLeftIcon size="sm" /> : null}
			<Box as="span" display={['none', 'inline']}>
				{children}
			</Box>
			{direction === 'right' ? <ArrowRightIcon size="sm" /> : null}
		</Flex>
	);
};
