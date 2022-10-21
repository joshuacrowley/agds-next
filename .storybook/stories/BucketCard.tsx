import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex, Stack } from '@ag.ds-next/box';

import { Button } from '@ag.ds-next/button';
import { Card, CardInner, CardHeader, CardFooter } from '@ag.ds-next/card';
import { Columns, Column } from '@ag.ds-next/columns';
import { Heading } from '@ag.ds-next/heading';

import { Text } from '@ag.ds-next/text';

import { SkeletonHeading, SkeletonText } from '@ag.ds-next/skeleton';
import { Table, TableCell, TableBody } from '@ag.ds-next/table';

export type BucketCardTableProps = {
	unit: string;
	balance: number;
	accessAmount?: number;
	exporterCount?: number;
	uncommitted?: boolean;
};

const BucketCardTable = ({
	unit,
	balance,
	accessAmount,
	exporterCount,
	uncommitted,
}: BucketCardTableProps) => (
	<Table>
		<TableBody>
			{!uncommitted && (
				<tr>
					<TableCell>
						<Text as="span" fontWeight={'bold'}>
							Access
						</Text>
					</TableCell>
					<TableCell textAlign="right">
						<Text as="span">
							{exporterCount === 0
								? 'Any exporter'
								: exporterCount > 1
								? `${exporterCount} specified exporters`
								: `${exporterCount} exporter`}
						</Text>
					</TableCell>
				</tr>
			)}
			<tr>
				<TableCell>
					<Text as="span" fontWeight={'bold'}>
						Balance
					</Text>
				</TableCell>
				<TableCell textAlign="right">
					<Text as="span">
						{balance.toLocaleString()} {unit}
					</Text>
				</TableCell>
			</tr>
			{!uncommitted && (
				<tr>
					<TableCell>
						<Text as="span" fontWeight={'bold'}>
							Access Amount
						</Text>
					</TableCell>
					<TableCell textAlign="right">
						<Text>
							{accessAmount.toLocaleString()} {unit}
						</Text>
					</TableCell>
				</tr>
			)}
		</TableBody>
	</Table>
);

export type BucketCardProps = {
	bucketId: number;
	bucketName: string;
	unit: string;
	balance: number;
	accessAmount: number;
	exporterCount: number;
	uncommitted?: boolean;
	editLink?: string;
};

export const BucketCard = ({
	bucketId,
	bucketName,
	unit,
	balance,
	accessAmount,
	exporterCount,
	uncommitted,
	editLink,
}: BucketCardProps) => (
	<Column
		key={`bucket${bucketId}`}
		columnSpan={{ xs: 2, sm: 3, md: 2, lg: 3, xl: 3 }}
	>
		<Card>
			<CardHeader>
				<Stack gap={1}>
					{!uncommitted ? (
						<Text fontSize={'xs'}>BUCKET #{bucketId}</Text>
					) : null}
					<Flex alignItems={'center'} gap={1}>
						<Heading type="h3" color={uncommitted ? 'warning' : 'text'}>
							{uncommitted ? 'Uncommitted' : bucketName}
						</Heading>
					</Flex>
				</Stack>
			</CardHeader>
			<CardInner>
				{!uncommitted ? (
					<BucketCardTable
						balance={balance}
						unit={unit}
						accessAmount={accessAmount}
						exporterCount={exporterCount}
					/>
				) : (
					<BucketCardTable balance={balance} uncommitted={true} unit={unit} />
				)}
			</CardInner>

			{!uncommitted && (
				<CardFooter
					borderTop
					borderColor="muted"
					background={'bodyAlt'}
					padding={1.5}
				>
					<Flex justifyContent={'space-between'} alignItems={'center'}>
						{editLink ? (
							<Button onClick={() => console.log(editLink)} variant="text">
								Edit Bucket
							</Button>
						) : null}
					</Flex>
				</CardFooter>
			)}
		</Card>
	</Column>
);

const Template: ComponentStory<typeof BucketCard> = (args) => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<BucketCard {...args} />
	</Columns>
);

export const AnyExporters = Template.bind({});

AnyExporters.args = {
	unit: 'KGs',
	accessAmount: 100000,
	balance: 10000,
	exporterCount: 0,
	bucketId: 40,
	bucketName: 'FCFS',
	editLink: '#',
};

export const OneExporter = Template.bind({});

OneExporter.args = {
	unit: 'KGs',
	accessAmount: 100000,
	balance: 10000,
	exporterCount: 1,
	bucketId: 41,
	bucketName: 'Josh Pty Ltd',
	editLink: '#',
};

export const ManyExporters = Template.bind({});

ManyExporters.args = {
	unit: 'KGs',
	accessAmount: 100000,
	balance: 10000,
	exporterCount: 6,
	bucketId: 43,
	bucketName: 'New Entrants',
	editLink: '#',
};

export const Uncommitted = Template.bind({});

Uncommitted.args = {
	unit: 'KGs',
	balance: 10000,
	uncommitted: true,
};

export default {
	title: 'Quota/BucketCard',
	component: BucketCard,
	excludeStories: ['BucketCard'],
	argTypes: {
		balance: { control: 'number' },
		accessAmount: { control: 'number' },
		exporterCount: { control: 'number' },
		bucketName: { control: 'text' },

		unit: {
			options: ['TNs', 'KGs', 'Lts', 'Head'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof BucketCard>;
