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
import { Columns, Column } from '@ag.ds-next/columns';
import { text } from 'node:stream/consumers';

export default {
	title: 'Quota/AmountBars',
};

//https://www.magicpattern.design/tools/css-backgrounds

// Styles

const colours = {
	success: '#0B996C',
	successShade: '#046F4D',
	warning: '#F69900',
	altShade: '#E0E0E0',
};

const Diagonal = {
	'background-color': 'rgba(229,229,247,0)',
	background:
		'repeating-linear-gradient( -45deg, #a76800, #a76800 1.5px, rgba(229,229,247,0) 1.5px, rgba(229,229,247,0) 10px )',
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
	'background-image':
		'radial-gradient( ellipse farthest-corner at 8px 8px , #FFF, #FFF 50%, rgba(159, 159, 171, 0.12) 50%)',
	'background-size': '8px 8px',
};

const BAR_COLOUR_TEXTURE = {
	used: { colour: colours.success, texture: {} },
	usedAlt: { colour: colours.successShade, texture: Dots },
	uncommited: { colour: colours.warning, texture: Diagonal },
	closed: { colour: colours.altShade },
	left: { colour: 'none', texture: {} },
};

const BAR_HEIGHT = {
	quota: 48,
	bucket: 24,
};

const LABEL_FORMAT = {
	used: { colour: 'success', weight: 'bold', text: 'Used' },
	usedAlt: { colour: 'success', weight: 'bold', text: 'Used' },
	uncommited: { colour: 'warning', weight: 'bold', text: 'Uncommited' },
	closed: { colour: colours.altShade, weight: undefined, text: 'Used' },
	left: {
		colour: undefined,
		weight: undefined,
		text: 'Remains after processing',
	},
};

type barChartData = {
	amount: number;
	label: 'used' | 'uncommited' | 'left' | 'closed';
};

type unit = 'kgs' | 'tns';

type quotaToken = {
	market: string;
	quotaCode: string;
	periodEnd: number;
	agreementCode: string;
};

type AmoutBarProps = {
	data: barChartData[];
	total: number;
	unit: unit;
	quota: quotaToken;
	amountType: 'bucket' | 'quota';
	bucketName: string;
	swappable: boolean;
};

type BarData = {
	data: barChartData[];
	height: number;
	amountType: 'bucket' | 'quota';
};

const exampleQuota = {
	market: 'EU',
	quotaCode: 'BUFFM',
	periodEnd: '23',
	agreementCode: 'FTA',
};

const AmountBars = ({
	data,
	total,
	unit,
	quota,
	amountType,
	bucketName,
	swappable,
}: AmoutBarProps) => {
	let percent = (amount: number): string =>
		((amount / total) * (100 / 1)).toLocaleString(undefined, {
			maximumFractionDigits: 2,
		});

	let quotaTotalUsedAmount = data
		.filter((item: barChartData) => item.label === 'used')
		.reduce(
			(accumulator: number, item: barChartData) => accumulator + item.amount,
			0
		);

	let quotaFilterAmounts = data.filter(
		(item: barChartData) => item.label != 'used'
	);

	let quotaSummarisedData = [
		{ amount: quotaTotalUsedAmount, label: 'used' },
		...quotaFilterAmounts,
	];

	const Bar = ({ data, height, amountType }: BarData) => {
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
				{data.map((bar, index) => {
					let texture = BAR_COLOUR_TEXTURE[bar.label].texture;
					let colour = BAR_COLOUR_TEXTURE[bar.label].colour;

					if (
						amountType === 'quota' &&
						bar.label === 'used' &&
						index % 2 === 0
					) {
						colour = colours.successShade;
					}

					return (
						<div
							style={{
								...texture,
								backgroundColor: colour,
								flexBasis: `${percent(bar.amount)}%`,
							}}
						></div>
					);
				})}
			</Flex>
		);
	};

	return (
		<Column columnSpan={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
			<Box
				padding={1}
				display="block"
				border
				borderColor="muted"
				background={'body'}
				rounded
			>
				<Stack gap={0.5} alignItems={'flex-start'}>
					<Flex
						width={'100%'}
						justifyContent={'space-between'}
						alignItems={'baseline'}
					>
						<Flex alignItems={'baseline'} flexDirection={'row'}>
							<QuotaToken shortHand {...quota} />{' '}
							{amountType === 'bucket' && (
								<Text>
									{`: `}
									{bucketName}
								</Text>
							)}
						</Flex>
						{swappable && <Button variant="text">Change bucket</Button>}
					</Flex>
					<Bar
						height={BAR_HEIGHT[amountType]}
						data={data}
						amountType={amountType}
					></Bar>
					<Flex
						flexDirection={'row'}
						width={'100%'}
						justifyContent={'space-between'}
					>
						<Flex flexDirection={'row'} gap={1}>
							{amountType === 'quota' &&
								quotaSummarisedData.map((item, index) => (
									<Text
										fontWeight={LABEL_FORMAT[item.label].weight}
										color={LABEL_FORMAT[item.label].colour}
									>
										{item.amount.toLocaleString()} {unit}
										{` (${percent(item.amount)}%)`}{' '}
										{LABEL_FORMAT[item.label].text}
									</Text>
								))}

							{amountType === 'bucket' &&
								data.map((item, index) => (
									<Text
										fontWeight={LABEL_FORMAT[item.label].weight}
										color={LABEL_FORMAT[item.label].colour}
									>
										{item.amount.toLocaleString()} {unit}
										{` (${percent(item.amount)}%)`}{' '}
										{LABEL_FORMAT[item.label].text}
									</Text>
								))}
						</Flex>
						<Text>
							Total available: {total.toLocaleString()} {unit}
						</Text>
					</Flex>
				</Stack>
			</Box>
		</Column>
	);
};

export const BucketStandard = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			data={[
				{ amount: 20511, label: 'used' },
				{
					amount: 20000,
					label: 'uncommited',
				},
				{ amount: 60000, label: 'left' },
			]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			buckets={['']}
			bucketName={'Josh Pty Ltd'}
		/>
	</Columns>
);

export const BucketsMultiple = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			data={[
				{ amount: 20511, label: 'used' },
				{
					amount: 20000,
					label: 'uncommited',
				},
				{ amount: 60000, label: 'left' },
			]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
			swappable
		/>
		<AmountBars
			data={[
				{ amount: 10000, label: 'used' },
				{
					amount: 20000,
					label: 'uncommited',
				},
				{ amount: 60000, label: 'left' },
			]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'FCFS'}
			swappable
		/>
	</Columns>
);

export const BucketFull = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			data={[
				{ amount: 100000, label: 'used' },
				{ amount: 0, label: 'left' },
			]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
	</Columns>
);

export const BucketClosed = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			data={[
				{ amount: 50000, label: 'closed' },
				{ amount: 0, label: 'left' },
			]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
	</Columns>
);

export const QuotaSetup = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			data={[
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 60000, label: 'uncommited' },
			]}
			amountType={'quota'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
		/>
	</Columns>
);
