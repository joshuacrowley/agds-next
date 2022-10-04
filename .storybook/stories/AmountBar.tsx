import React, { useState } from 'react';
import { Text } from '@ag.ds-next/text';
import { Stack, Box, Flex } from '@ag.ds-next/box';
import { Button } from '@ag.ds-next/button';
import { Modal } from '@ag.ds-next/modal';
import { QuotaToken } from './QuotaToken';
import { Columns, Column } from '@ag.ds-next/columns';
import {
	ArrowRightIcon,
	ProgressDoneIcon,
	ProgressTodoIcon,
} from '@ag.ds-next/icon';

export default {
	title: 'Quota/AmountBars',
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
	data?: barChartData[];
	total: number;
	unit: unit;
	quota: quotaToken;
	amountType: 'bucket' | 'quota';
	bucketName: string;
	closed?: boolean;
	swappable?: boolean;
	swapped?: Function;
	swapping?: boolean;
};

type BarData = {
	data: barChartData[];
	height: number;
	amountType: 'bucket' | 'quota';
	closed: boolean;
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
	closed,
	swapping,
	swapped,
}: AmoutBarProps) => {
	//Helper function to express amounts as percentages, using LocaleString for formatting

	let percent = (amount: number): string =>
		((amount / total) * (100 / 1)).toLocaleString(undefined, {
			maximumFractionDigits: 2,
		});

	let quotaTotalUsedAmount: number = 0;
	let quotaFilterAmounts,
		fixedData: barChartData[] = [];

	if (amountType === 'quota') {
		// When we're showing a Quota Amount Type, we sum all the bucket 'Used' amounts into a single total amount so it's easier to read.

		quotaTotalUsedAmount = data
			.filter((item: barChartData) => item.label === 'used')
			.reduce(
				(accumulator: number, item: barChartData) => accumulator + item.amount,
				0
			);

		// Get all the amounts for the other categories

		quotaFilterAmounts = data.filter(
			(item: barChartData) => item.label != 'used'
		);

		// Data object to be used for the Quota AmountType

		fixedData = [
			{ amount: quotaTotalUsedAmount, label: 'used' },
			...quotaFilterAmounts,
		];
	} else {
		//If it just a bucket amount type, then we can use the data as is;

		fixedData = data;
	}

	const Bar = ({ data, height, amountType, closed }: BarData) => (
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
				//Grab design  tokens using index keys

				let texture = BAR_COLOUR_TEXTURE[bar.label].texture;
				let colour = BAR_COLOUR_TEXTURE[bar.label].colour;

				//When reviewing a Quota Amount, we shade the buckets in alternating greens for some visual differentiation

				if (amountType === 'quota' && bar.label === 'used' && index % 2 === 0) {
					colour = colours.successShade;
				}

				//finally create a style object to help express the state of that bar item

				return (
					<div
						style={{
							...texture,
							backgroundColor: colour,
							flexBasis: `${percent(bar.amount)}%`,
							filter: `grayscale(${closed ? 1 : 0})`,
						}}
					></div>
				);
			})}
		</Flex>
	);

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
						{swappable && (
							<Button
								iconAfter={swapping ? ProgressTodoIcon : ProgressDoneIcon}
								onClick={() => swapped()}
								variant="text"
								disabled={!swapping}
							>
								{swapping ? 'Select' : 'Selected'}
							</Button>
						)}
					</Flex>
					{data ? (
						<Bar
							height={BAR_HEIGHT[amountType]}
							data={data}
							amountType={amountType}
							closed={closed}
						></Bar>
					) : (
						<Flex
							flexDirection={'row'}
							width={'100%'}
							justifyContent="center"
							background="shade"
						>
							<Button
								iconAfter={ArrowRightIcon}
								variant="tertiary"
								onClick={() => console.log('goto bucket')}
							>
								Create a bucket for this exporter
							</Button>
						</Flex>
					)}

					<Flex
						flexDirection={'row'}
						width={'100%'}
						justifyContent={'space-between'}
					>
						<Flex flexDirection={'row'} gap={1}>
							{data &&
								fixedData.map((item) => (
									<Text
										fontWeight={LABEL_FORMAT[item.label].weight}
										color={closed ? null : LABEL_FORMAT[item.label].colour}
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
			bucketName={'Josh Pty Ltd'}
		/>
	</Columns>
);

export const BucketNoAccount = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
		/>
	</Columns>
);

export const BucketsMultiple = () => {
	const [bucketIndex, setBucketIndex] = useState(0);
	const [showBucketList, setBucketList] = useState(false);

	const buckets = [
		{
			data: [
				{ amount: 20000, label: 'used' },
				{
					amount: 20000,
					label: 'uncommited',
				},
				{ amount: 60000, label: 'left' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 100000,
			unit: 'kgs',
			bucketName: 'Josh Pty Ltd',
			swappable: true,
		},
		{
			data: [
				{ amount: 10000, label: 'used' },
				{ amount: 40000, label: 'left' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 50000,
			unit: 'kgs',
			bucketName: 'FCFS',
			swappable: true,
		},
	];

	return (
		<Columns
			cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}
			alignItems={'flex-start'}
		>
			<Box
				width={'100%'}
				flexDirection={'row'}
				justifyContent={'flex-end'}
				display="block"
			>
				<Button variant="text" onClick={() => setBucketList(!showBucketList)}>
					{showBucketList ? 'Cancel' : 'Change Selection'}
				</Button>
			</Box>
			{showBucketList &&
				buckets.map((bucket, index) => (
					<AmountBars
						{...bucket}
						swapped={() => {
							setBucketIndex(index);
							setBucketList(false);
						}}
						swapping={showBucketList}
					/>
				))}

			{!showBucketList && <AmountBars {...buckets[bucketIndex]} />}
		</Columns>
	);
};

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
				{ amount: 50000, label: 'used' },
				{ amount: 0, label: 'left' },
			]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
			closed
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

export const QuotaClosed = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			data={[
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 60000, label: 'left' },
			]}
			amountType={'quota'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			closed
		/>
	</Columns>
);

// STYLE TOKENS

// These are colours from the design system

const colours = {
	success: '#0B996C',
	successShade: '#046F4D',
	warning: '#F69900',
	altShade: '#E0E0E0',
};

//https://www.magicpattern.design/tools/css-backgrounds

// Textures for bar charts, so they're not reliant on colour for meaning

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

// The Amount Bar comes in two sizes, the smaller size is only used for buckets, the taller is used for Quota which represents many buckets

const BAR_HEIGHT = {
	quota: 48,
	bucket: 24,
};

// We have different text styles for each of the possible bar states

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
