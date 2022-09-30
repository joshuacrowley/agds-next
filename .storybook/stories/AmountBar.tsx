import { SubNav } from '@ag.ds-next/sub-nav';
import { NotificationBadge } from '@ag.ds-next/badge';
import {
	SuccessFilledIcon,
	SuccessIcon,
	WarningFilledIcon,
	WarningIcon,
	AlertFilledIcon,
	AlertIcon,
} from '@ag.ds-next/icon';
import { Text } from '@ag.ds-next/text';
import { Stack, Box, Flex } from '@ag.ds-next/box';
import { Heading } from '@ag.ds-next/heading';

import { Button, ButtonGroup } from '@ag.ds-next/button';
import { Modal } from '@ag.ds-next/modal';
import { Textarea } from '@ag.ds-next/textarea';
import { Select } from '@ag.ds-next/select';
import { useTernaryState } from '@ag.ds-next/core';
import { QuotaToken } from './QuotaToken';

export default {
	title: 'Quota/AmountBars',
};

//https://www.magicpattern.design/tools/css-backgrounds

const colours = {
	success: '#0B996C',
	successShade: '#046F4D',
	warning: '#F69900',
	altShade: '#E0E0E0',
};

const Diagonal = {
	'background-color': 'rgba(159, 159, 171, 0.12)',
	opacity: '0.5',
	'background-size': '7px 7px',
	'background-image':
		'repeating-linear-gradient(45deg, #000000 0, #000000 0.7000000000000001px, rgba(159, 159, 171, 0.12) 0, rgba(159, 159, 171, 0.12) 50%)',
};

const Dots = {
	'background-color': 'rgba(159, 159, 171, 0.12)',
	opacity: 0.5,
	'background-image':
		'radial-gradient(#000000 0.9px, rgba(159, 159, 171, 0.12) 0.9px)',
	'background-size': '18px 18px',
};

const Moon = {
	'background-color': 'rgba(159, 159, 171, 0.12)',
	opacity: 0.4,
	'background-image':
		'radial-gradient( ellipse farthest-corner at 8px 8px , #000000, #000000 50%, rgba(159, 159, 171, 0.12) 50%)',
	'background-size': '8px 8px',
};

const LABEL_COLOUR_TEXTURE = {
	assigned: { colour: colours.success, texture: Moon },
	assignedAlt: { colour: colours.successShade, texture: Dots },
	uncommited: { colour: colours.warning, texture: Diagonal },
	closed: { colour: colours.altShade, texture: Moon },
};

const Bar = ({ data, height }) => {
	console.log(data);
	return (
		<Flex
			justifyContent={'flex-start'}
			alignItems={'stretch'}
			flexDirection={'row'}
			flexGrow={1}
			width={'100%'}
			height={`${height}px`}
			background={'shade'}
		>
			{data.map((bar) => {
				let texture = LABEL_COLOUR_TEXTURE[bar.label].texture;
				let colour = LABEL_COLOUR_TEXTURE[bar.label].colour;
				return (
					<div
						style={{
							...texture,
							backgroundColor: colour,
							flexBasis: `${bar.amount}%`,
						}}
					></div>
				);
			})}
		</Flex>
	);
};

const AmountBars = ({ data, total, unit, quota, context }) => {
	let percentages = data.map((item) => {
		return { amount: (item.amount / total) * (100 / 1), label: item.label };
	});

	return (
		<div>
			<Box
				padding={1}
				display="block"
				border
				borderColor="muted"
				background={'body'}
				rounded
			>
				<Stack gap={0.5} alignItems={'flex-start'}>
					<Flex>
						<QuotaToken shortHand {...quota} />
					</Flex>
					<Bar height={context === 'bucket' ? 24 : 48} data={percentages}></Bar>
					<Flex
						flexDirection={'row'}
						width={'100%'}
						justifyContent={'space-between'}
					>
						<Flex flexDirection={'row'} gap={1}>
							{data.map((item) => (
								<Text>
									{item.amount.toLocaleString()} {unit} {item.label}
								</Text>
							))}
						</Flex>
						<Text>
							Total available : {total.toLocaleString()} {unit}
						</Text>
					</Flex>
				</Stack>
			</Box>
		</div>
	);
};

const exampleQuota = {
	market: 'EU',
	quotaCode: 'BUFFM',
	periodEnd: '23',
	agreementCode: 'FTA',
};

export const BucketStandard = () => (
	<AmountBars
		data={[
			{ amount: 50000, label: 'assigned' },
			{ amount: 50000, label: 'uncommited' },
		]}
		context={'bucket'}
		quota={exampleQuota}
		total={100000}
		unit={'kgs'}
	/>
);
