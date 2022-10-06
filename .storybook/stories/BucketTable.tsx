import {
	Table,
	TableBody,
	TableHeader,
	TableCell,
	TableHead,
} from '@ag.ds-next/table';

import { Columns, Column } from '@ag.ds-next/columns';

type BucketRow = {
	name: string;
	id: number;
	access: 'anyone' | 'listed exporters' | 'single exporter';
	balance: number;
	accessAmount: number;
	left: number;
};

type BucketTable = {
	rows: BucketRow[];
	unit: string;
};

const percent = (amount: number, total: number): string =>
	((amount / total) * (100 / 1)).toLocaleString(undefined, {
		maximumFractionDigits: 2,
	});

export const BucketTable = ({ rows, unit }: BucketTable) => (
	<Column columnSpan={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<Table>
			<TableHead>
				<tr>
					<TableHeader scope="col">Name</TableHeader>

					<TableHeader textAlign="left" scope="col">
						ID
					</TableHeader>

					<TableHeader textAlign="left" scope="col">
						Access
					</TableHeader>
					<TableHeader textAlign="right" scope="col">
						Balance{' '}
					</TableHeader>

					<TableHeader textAlign="right" scope="col">
						Access Amount
					</TableHeader>
					<TableHeader textAlign="right" scope="col">
						Left
					</TableHeader>
				</tr>
			</TableHead>
			<TableBody>
				{rows.map((row) => (
					<tr>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.id}</TableCell>
						<TableCell>{row.access} </TableCell>
						<TableCell textAlign="right">
							{row.balance.toLocaleString()} {unit}
						</TableCell>
						<TableCell textAlign="right">
							{row.accessAmount.toLocaleString()} {unit}
						</TableCell>
						<TableCell textAlign="right">
							{row.left.toLocaleString()} {unit}{' '}
							{`(${percent(row.balance, row.accessAmount)}%)`}
						</TableCell>
					</tr>
				))}
			</TableBody>
		</Table>
	</Column>
);

export const BucketTableDefault = () => {
	const buckets = [
		{
			transcations: [
				{ amount: 10000, label: 'used' },
				{ amount: 10000, label: 'requested' },
				{ amount: 40000, label: 'remain' },
			],
			amountType: 'bucket',
			total: 30000,
			unit: 'kgs',
			bucketName: 'FCFS',
			swappable: true,
		},
		{
			transcations: [
				{ amount: 20000, label: 'used' },
				{
					amount: 10000,
					label: 'requested',
				},
				{ amount: 60000, label: 'remain' },
			],
			amountType: 'bucket',
			total: 30000,
			unit: 'kgs',
			bucketName: 'Josh Pty Ltd',
			swappable: false,
		},
		{
			transcations: [
				{ amount: 0, label: 'used' },
				{ amount: 10000, label: 'requested' },
				{ amount: 30000, label: 'remain' },
			],
			amountType: 'bucket',
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
			<BucketTable rows={sampleRows} unit={'TN'} />
		</Columns>
	);
};

export default {
	title: 'Quota/BucketTable',
	excludeStories: ['BucketTable'],
};
