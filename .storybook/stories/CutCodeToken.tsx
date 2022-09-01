import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { boxPalette, LinkProps } from '@ag.ds-next/core';
import { CloseIcon } from '@ag.ds-next/icon';

export default {
	title: 'Quota/CutCode',
};

const CutCode = ({ code, presevation, suffix, removeable }) => (
	<Box
		as={'span'}
		display="inline-block"
		border
		rounded
		paddingX={0.5}
		fontSize="sm"
		title={`Cut Code ${code}; Presevation ${presevation || 'N/A'}; Suffix ${
			suffix || 'N/A'
		}`}
	>
		<Flex alignItems={'center'} gap={0.1}>
			<Text fontSize={'xs'}>{code}</Text>
			<>
				<Text fontSize={'xs'} fontWeight={'bold'}>
					{presevation}
				</Text>
				<Text fontSize={'xs'} fontWeight={'bold'}>
					{suffix}
				</Text>
			</>
			{removeable && (
				<Stack as={'span'} onClick={() => console.log('Boom')}>
					<CloseIcon size={'sm'} />
				</Stack>
			)}
		</Flex>
	</Box>
);

export const JustCode = () => <CutCode code={'1000'} />;

export const Presevation = () => <CutCode code={'1000'} presevation={'C'} />;

export const Suffix = () => <CutCode code={'1000'} suffix={'G'} />;

export const All = () => (
	<CutCode code={'1000'} suffix={'G'} presevation={'F'} />
);

export const Removeable = () => (
	<CutCode code={'1000'} suffix={'G'} presevation={'F'} removeable />
);
