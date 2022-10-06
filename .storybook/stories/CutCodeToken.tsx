import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { boxPalette, LinkProps } from '@ag.ds-next/core';
import { CloseIcon } from '@ag.ds-next/icon';

export const CutCode = ({ code, preservation, suffix, removable }) => (
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
			{removable && (
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

const Template: ComponentStory<typeof CutCode> = (args) => (
	<CutCode {...args} />
);

export const JustCode = Template.bind({});

JustCode.args = {
	code: '1000',
};

export const PreservationExample = Template.bind({});

PreservationExample.args = {
	code: '1002',
	preservation: 'C',
};

export const Suffix = Template.bind({});

Suffix.args = {
	code: '1001',
	suffix: 'G',
};

export const All = Template.bind({});

All.args = {
	code: '1000',
	suffix: 'G',
	preservation: 'F',
};

export const Removable = Template.bind({});

Removable.args = {
	code: '1000',
	suffix: 'G',
	preservation: 'F',
	removable: true,
};

export default {
	title: 'Quota/CutCode',
	component: CutCode,
	excludeStories: ['CutCode'],
	argTypes: {
		code: { control: 'text' },
		preservation: { control: 'text' },
		suffix: { control: 'text' },
		removable: { control: 'boolean' },
	},
} as ComponentMeta<typeof CutCode>;
