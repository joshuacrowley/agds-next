import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { boxPalette, LinkProps } from '@ag.ds-next/core';
import { CloseIcon } from '@ag.ds-next/icon';

export default {
	title: 'Quota/ProductCode',
};

export const ProductCode = ({ code }) => (
	<Box
		as={'span'}
		display="inline-block"
		border
		rounded
		paddingX={0.5}
		fontSize="sm"
		background={'bodyAlt'}
		title={`Product Code ${code};`}
	>
		<Flex alignItems={'center'} gap={0.1}>
			<Text fontSize={'xs'}>{code}</Text>
		</Flex>
	</Box>
);

export const JustCode = () => <ProductCode code={'YP'} />;
