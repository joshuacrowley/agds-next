import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { boxPalette, LinkProps } from '@ag.ds-next/core';
import { CloseIcon } from '@ag.ds-next/icon';

export default {
	title: 'Quota/CutCode',
};

export const CutCode = ({ code, preservation, suffix, removeable }) => (
	<Box
		as={'span'}
		display="inline-block"
		border
		rounded
		paddingX={0.5}
		fontSize="sm"
		title={`Cut Code ${code}; Suffix ${suffix || null}; preservation ${
			preservation || null
		}; `}
	>
		<Flex alignItems={'center'}>
			<Text fontSize={'xs'}>{code}</Text>
			<>
				{suffix && (
					<Text fontSize={'xs'} fontWeight={'bold'}>
						{suffix}
					</Text>
				)}
				{preservation && (
					<Text fontSize={'xs'} fontWeight={'bold'}>
						{preservation}
					</Text>
				)}
			</>
			{removeable && (
				<Stack
					paddingLeft={0.25}
					as={'span'}
					onClick={() => console.log('Boom')}
				>
					<CloseIcon size={'sm'} />
				</Stack>
			)}
		</Flex>
	</Box>
);

export const JustCode = () => <CutCode code={'1000'} />;

export const Preservation = () => <CutCode code={'1000'} preservation={'C'} />;

export const Suffix = () => <CutCode code={'1000'} suffix={'G'} />;

export const All = () => (
	<CutCode code={'1000'} suffix={'G'} preservation={'F'} />
);

export const Removeable = () => (
	<CutCode code={'1000'} suffix={'G'} preservation={'F'} removeable />
);
