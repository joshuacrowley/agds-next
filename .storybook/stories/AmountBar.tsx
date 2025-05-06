import React, { useState } from 'react';
import { Text } from '@ag.ds-next/text';
import { Stack, Box, Flex } from '@ag.ds-next/box';
import { Button } from '@ag.ds-next/button';

import { QuotaToken, QuotaTokenProps } from './QuotaToken';
import { Columns, Column } from '@ag.ds-next/columns';
import { Select } from '@ag.ds-next/select';
import { ArrowRightIcon, ChevronDownIcon } from '@ag.ds-next/icon';

import { BucketTable } from './BucketTable';

type barChartTransactions = {
	amount: number;
	label: 'used' | 'uncommitted' | 'left' | 'closed' | 'remain' | 'requested';
};

type unit = 'kgs' | 'TNs' | 'head';

type BucketListItem = {
	label: string;
	value: string;
	disabled?: boolean;
};

type AmoutBarProps = {
	/**
     Are you expressing a bucket or quota
     */
	amountType: 'bucket' | 'quota';
	/** Total access amount for the bucket or quota */
	total: number;
	/** what unit are the amounts in? */
	unit: unit;
	/** The quota token props */
	quota: QuotaTokenProps;
	/** If it's a bucket, what is it's name */
	bucketName?: string;
	/** The transactions that we will display in the chart  */
	transactions?: barChartTransactions[];
	/** If the Quota has expired and this Quota or Bucket is now closed */
	closed?: boolean;
	/** If this is a bucket, and you're viewing on the certificate screen, you can swap this bucket for another eligible bucket  */
	swappable?: boolean;
	/** If this is a bucket, and you're viewing on the certificate screen, you can swap this bucket for another eligible bucket  */
	swapped?: Function;
	/** If this is a bucket, and you're viewing on the certificate screen, you can swap this bucket for another eligible bucket  */
	swapping?: boolean;
	/** If this is a bucket, and you're viewing on the certificate screen, you can swap this bucket for another eligible bucket  */
	bucketList?: BucketListItem[];
	/** List of buckets to swap against  */
	startSwap?: Function;
	/** Currently selected Bucket */
	currentBucket?: number;
};

type BarTransactions = {
	transactions: barChartTransactions[];
	height: number;
	amountType: 'bucket' | 'quota';
	closed: boolean;
};

const AmountBars = ({
	transactions,
	total,
	unit,
	quota,
	amountType,
	bucketName,
	swappable,
	closed,
	swapping,
	swapped,
	startSwap,
	bucketList,
	currentBucket,
}: AmoutBarProps) => {
	//Helper function to express amounts as percentages, using LocaleString for formatting

	let percent = (amount: number): string =>
		((amount / total) * (100 / 1)).toLocaleString(undefined, {
			maximumFractionDigits: 2,
		});

	let quotaTotalUsedAmount: number = 0;
	let quotaFilterAmounts,
		fixedtransactions: barChartTransactions[] = [];

	if (amountType === 'quota') {
		// When we're showing a Quota Amount Type, we sum all the bucket 'Used' amounts into a single total amount so it's easier to read.

		quotaTotalUsedAmount = transactions
			.filter((item: barChartTransactions) => item.label === 'used')
			.reduce(
				(accumulator: number, item: barChartTransactions) =>
					accumulator + item.amount,
				0
			);

		// Get all the amounts for the other categories

		quotaFilterAmounts = transactions.filter(
			(item: barChartTransactions) => item.label != 'used'
		);

		// transactions object to be used for the Quota AmountType

		fixedtransactions = [
			{ amount: quotaTotalUsedAmount, label: 'used' },
			...quotaFilterAmounts,
		];
	} else {
		//If it just a bucket amount type, then we can use the transactions as is;

		fixedtransactions = transactions;
	}

	const Bar = ({
		transactions,
		height,
		amountType,
		closed,
	}: BarTransactions) => (
		<Flex
			justifyContent={'flex-start'}
			alignItems={'stretch'}
			flexDirection={'row'}
			flexGrow={1}
			width={'100%'}
			height={`${height}px`}
			background={'shade'}
			border
			borderColor="black"
		>
			{transactions.map((bar, index) => {
				//Grab design  tokens using index keys

				let texture = BAR_COLOUR_TEXTURE[bar.label].texture;
				let colour = BAR_COLOUR_TEXTURE[bar.label].colour;

				//When reviewing a Quota Amount, we shade the buckets in alternating greens for some visual differentiation

				if (amountType === 'quota' && bar.label === 'used' && index % 2 === 0) {
					colour = BAR_COLOUR_TEXTURE['usedAlt'].colour;
					texture = BAR_COLOUR_TEXTURE['usedAlt'].texture;
				}

				//finally create a style object to help express the state of that bar item

				return (
					<div
						style={{
							...texture,
							backgroundColor: colour,
							flexBasis: `${percent(bar.amount)}%`,
							filter: `grayscale(${closed ? 1 : 0})`,
							borderRight: `${
								transactions.length === index + 1 ? '0' : '1'
							}px black solid`,
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
						alignItems={'center'}
					>
						{amountType === 'bucket' && (
							<Flex alignItems={'baseline'} flexDirection={'row'}>
								{swapping ? (
									<Select
										maxWidth="xl"
										required
										autoFocus
										onChange={(event) => swapped(event.currentTarget.value)}
										onBlur={(event) => swapped(event.currentTarget.value)}
										options={bucketList}
										value={currentBucket}
									/>
								) : (
									<Button variant={'text'} onClick={startSwap}>
										<Text color={swappable ? 'action' : 'text'} fontSize={'md'}>
											{bucketName}
										</Text>
										{swappable && <ChevronDownIcon />}
									</Button>
								)}
							</Flex>
						)}
						<QuotaToken
							size={amountType === 'bucket' ? 'sm' : 'lg'}
							{...quota}
						/>
					</Flex>
					{transactions ? (
						<Bar
							height={BAR_HEIGHT[amountType]}
							transactions={transactions}
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
							{transactions &&
								fixedtransactions.map((item) => (
									<Text
										fontSize={'xs'}
										fontWeight={LABEL_FORMAT[item.label].weight}
										color={closed ? null : LABEL_FORMAT[item.label].colour}
									>
										{item.amount.toLocaleString()} {unit}
										{` (${percent(item.amount)}%)`}{' '}
										{LABEL_FORMAT[item.label].text}
									</Text>
								))}
						</Flex>
						<Text fontSize={'xs'}>
							Total: {total.toLocaleString()} {unit}
						</Text>
					</Flex>
				</Stack>
			</Box>
		</Column>
	);
};

const exampleQuota = {
	market: 'EU',
	quotaCode: 'BUFFM',
	periodEnd: '23',
	agreementCode: 'FTA',
};

export const BucketStandardConfigurable = (args) => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars {...args} amountType={'bucket'} />
	</Columns>
);

BucketStandardConfigurable.args = {
	transactions: [
		{ amount: 40000, label: 'used' },
		{ amount: 60000, label: 'left' },
	],
	quota: exampleQuota,
	total: 100000,
	unit: 'kgs',
	bucketName: 'Josh Pty Ltd',
	closed: false,
};

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

export const BucketsCertificate = () => {
	const [bucketIndex, setBucketIndex] = useState(0);
	const [showBucketList, setBucketList] = useState(false);

	const buckets = [
		{
			transactions: [
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'requested' },
				{ amount: 40000, label: 'remain' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 60000,
			unit: 'kgs',
			bucketName: 'FCFS',
			swappable: true,
		},
		{
			transactions: [
				{ amount: 20000, label: 'used' },
				{
					amount: 10000,
					label: 'requested',
				},
				{ amount: 60000, label: 'remain' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 100000,
			unit: 'kgs',
			bucketName: 'Josh Pty Ltd',
			swappable: false,
		},
		{
			transactions: [
				{ amount: 0, label: 'used' },
				{ amount: 10000, label: 'requested' },
				{ amount: 30000, label: 'remain' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 40000,
			unit: 'kgs',
			bucketName: 'Peter Pty Ltd',
			swappable: true,
		},
	];

	const bucketListTransactions: BucketListItem = buckets.map(
		(bucket, index) => {
			return {
				label: ` ${bucket.bucketName} ${
					bucket.swappable ? '' : '(Unavailable)'
				}`,
				value: index,
				disabled: !bucket.swappable,
			};
		}
	);

	return (
		<Columns
			cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}
			alignItems={'flex-start'}
		>
			<AmountBars
				{...buckets[bucketIndex]}
				bucketList={bucketListTransactions}
				swapping={showBucketList}
				startSwap={() => setBucketList(!showBucketList)}
				currentBucket={bucketIndex}
				swapped={(index: number) => {
					setBucketIndex(index);
					setBucketList(false);
				}}
			/>
		</Columns>
	);
};

export const BucketFull = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			transactions={[{ amount: 100000, label: 'used' }]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
	</Columns>
);

export const BucketEmpty = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			transactions={[{ amount: 100000, label: 'left' }]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
	</Columns>
);

export const BucketFlipped = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			transactions={[{ amount: 90000, label: 'used' }]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
		<AmountBars
			transactions={[{ amount: 75000, label: 'used' }]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
		<AmountBars
			transactions={[{ amount: 30000, label: 'used' }]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>
		<AmountBars
			transactions={[{ amount: 0, label: 'used' }]}
			amountType={'bucket'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
			bucketName={'Josh Pty Ltd'}
		/>

		<AmountBars
			transactions={[
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
		/>

		<AmountBars
			transactions={[
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'used' },
				{ amount: 60000, label: 'uncommitted' },
			]}
			amountType={'quota'}
			quota={exampleQuota}
			total={100000}
			unit={'kgs'}
		/>
	</Columns>
);

export const BucketClosed = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			transactions={[
				{ amount: 50000, label: 'used' },
				{ amount: 50000, label: 'left' },
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

export const QuotaSetupConfigurable = (args) => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars {...args} amountType={'quota'} />
	</Columns>
);

QuotaSetupConfigurable.args = {
	transactions: [
		{ amount: 10000, label: 'used' },
		{ amount: 10000, label: 'used' },
		{ amount: 10000, label: 'used' },
		{ amount: 10000, label: 'used' },
		{ amount: 60000, label: 'uncommitted' },
	],
	quota: {
		market: 'EU',
		quota: 'Buffalo Meat',
		agreementCode: 'FTA',
		periodTerm: 'JUL22-JUN23',
	},
	total: 100000,
	unit: 'kgs',
};

export const QuotaClosed = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			transactions={[
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

export const QuotaTable = () => {
	const buckets = [
		{
			transactions: [
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'requested' },
				{ amount: 40000, label: 'remain' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 30000,
			unit: 'kgs',
			bucketName: 'FCFS',
			swappable: true,
		},
		{
			transactions: [
				{ amount: 20000, label: 'used' },
				{
					amount: 10000,
					label: 'requested',
				},
				{ amount: 60000, label: 'remain' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 30000,
			unit: 'kgs',
			bucketName: 'Josh Pty Ltd',
			swappable: false,
		},
		{
			transactions: [
				{ amount: 0, label: 'used' },
				{ amount: 10000, label: 'requested' },
				{ amount: 30000, label: 'remain' },
			],
			amountType: 'bucket',
			quota: exampleQuota,
			total: 30000,
			unit: 'kgs',
			bucketName: 'Peter Pty Ltd',
			swappable: true,
		},
	];

	const sampleRows = buckets.map((bucket, index) => {
		return {
			name: bucket.bucketName,
			id: index,
			access: 'Single Exporter',
			accessAmount: bucket.total,
			balance: 10000,
			left: 20000,
		};
	});

	return (
		<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
			<AmountBars
				transactions={[
					{ amount: 10000, label: 'used' },
					{ amount: 10000, label: 'used' },
					{ amount: 10000, label: 'used' },
					{ amount: 60000, label: 'left' },
				]}
				amountType={'quota'}
				quota={exampleQuota}
				total={90000}
				unit={'kgs'}
			/>
			<BucketTable rows={sampleRows} unit={'TN'} />
		</Columns>
	);
};

export const QuotaRealWorldExamples = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<AmountBars
			transactions={[
				//for mock up purposes, just dividing these amounts
				{ amount: 2 * 10783, label: 'used' },
				{ amount: 3 * 10783, label: 'used' },
				{ amount: 3 * 10783, label: 'used' },
				{ amount: 4 * 10783, label: 'used' },
				{ amount: 0.5 * 10783, label: 'used' },
				{ amount: 0.5 * 10783, label: 'used' },
				{ amount: 3 * 10783 + 100, label: 'used' },

				{ amount: 449292, label: 'left' },
			]}
			amountType={'quota'}
			quota={{
				market: 'ID',
				quotaCode: 'LIVEC',
				periodEnd: '23',
				agreementCode: 'IAC',
			}}
			total={621920}
			unit={'head'}
		/>
		<AmountBars
			transactions={[
				{ amount: 1990, label: 'used' },
				{ amount: 8010, label: 'left' },
			]}
			amountType={'quota'}
			quota={{
				market: 'ID',
				quotaCode: 'POTAT',
				periodEnd: '23',
				agreementCode: 'IAC',
			}}
			total={10000}
			unit={'TN'}
		/>
		<AmountBars
			transactions={[{ amount: 5000, label: 'left' }]}
			amountType={'quota'}
			quota={{
				market: 'ID',
				quotaCode: 'CARRO',
				periodEnd: '23',
				agreementCode: 'IAC',
			}}
			total={5000}
			unit={'TN'}
		/>
		<AmountBars
			transactions={[
				{ amount: 1816, label: 'used' },
				{ amount: 9209, label: 'left' },
			]}
			amountType={'quota'}
			quota={{
				market: 'ID',
				quotaCode: 'ORANG',
				periodEnd: '23',
				agreementCode: 'IAC',
			}}
			total={11025}
			unit={'TN'}
		/>
		<AmountBars
			transactions={[{ amount: 551250, label: 'uncommitted' }]}
			amountType={'quota'}
			quota={{
				market: 'ID',
				quotaCode: 'FEEDG',
				periodEnd: '23',
				agreementCode: 'IAC',
			}}
			total={551250}
			unit={'TN'}
		/>
	</Columns>
);

// Example QuotaToken props

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

const DiagonalAlt = {
	'background-color': 'rgba(229,229,247,0)',
	background:
		'repeating-linear-gradient( 45deg, #026846, #026846 1.5px, rgba(229,229,247,0) 1.5px, rgba(229,229,247,0) 10px )',
};

const DiagonalSuccessAlt = {
	'background-color': 'rgba(229,229,247,0)',
	background:
		'repeating-linear-gradient( 45deg, #1bc88e, #1bc88e 1.5px, rgba(229,229,247,0) 1.5px, rgba(229,229,247,0) 10px )',
};

const Dots = {
	'background-color': 'rgba(159, 159, 171, 0.12)',
	'background-image':
		'radial-gradient(#000000 0.5px, rgba(159, 159, 171, 0.12) 0.75px)',
	'background-size': '4px 4px',
};

const Moon = {
	'background-color': 'rgba(159, 159, 171, 0.12)',
	'background-image':
		'radial-gradient( ellipse farthest-corner at 8px 8px , #FFF, #FFF 50%, rgba(159, 159, 171, 0.12) 50%)',
	'background-size': '8px 8px',
};

const BAR_COLOUR_TEXTURE = {
	used: { colour: colours.success, texture: DiagonalAlt },
	usedAlt: { colour: colours.success, texture: DiagonalSuccessAlt },
	uncommitted: { colour: colours.warning, texture: Dots },
	closed: { colour: colours.altShade },
	left: { colour: 'none', texture: {} },
	remain: { colour: 'none', texture: {} },
	requested: { colour: colours.warning, texture: Dots },
};

// The Amount Bar comes in two sizes, the smaller size is only used for buckets, the taller is used for Quota which represents many buckets

const BAR_HEIGHT = {
	quota: 48,
	bucket: 24,
};

// We have different text styles for each of the possible bar states

const LABEL_FORMAT = {
	used: { colour: 'success', weight: 'bold', text: 'Left' },
	assigned: { colour: 'success', weight: 'bold', text: 'Assigned' },
	assignedAlt: { colour: 'success', weight: 'bold', text: 'Assigned' },
	usedAlt: { colour: 'success', weight: 'bold', text: 'Used' },
	uncommitted: { colour: 'warning', weight: 'bold', text: 'Uncommitted' },
	closed: { colour: colours.altShade, weight: 'normal', text: 'Used' },
	left: {
		colour: 'normal',
		weight: 'normal',
		text: 'Used',
	},
	remain: {
		colour: 'normal',
		weight: 'normal',
		text: 'Remaining after processing',
	},
	requested: { colour: 'warning', weight: 'bold', text: 'Requested' },
};

export default {
	title: 'Quota/AmountBars',
	component: AmountBars,
	excludeStories: ['AmountBars'],
	argTypes: {
		amountType: { controls: { type: 'radio', options: ['bucket', 'quota'] } },
		total: { control: { type: 'number' } },
		unit: {
			control: { type: 'radio', options: ['kgs', 'head', 'tns', 'ltrs'] },
		},
		quota: { control: 'object' },
		bucketName: { control: 'text' },
		transactions: { control: 'object' },
		closed: { control: 'boolean' },
		swappable: { control: 'boolean' },
		swapping: { control: 'boolean' },
		bucketList: { control: 'object' },
	},
} as ComponentMeta<typeof AmountBars>;
