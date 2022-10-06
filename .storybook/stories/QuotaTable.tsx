import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
	Table,
	TableBody,
	TableHeader,
	TableCell,
	TableHead,
} from '@ag.ds-next/table';

import { QuotaToken, QuotaTokenProps } from './QuotaToken';
import { Columns, Column } from '@ag.ds-next/columns';

type QuotaRow = {
	quota: QuotaTokenProps;
	status: 'active' | 'inactive';
	balance: number;
	accessAmount: number;
	left: number;
	unit: string;
};

type QuotaTableProps = {
	rows: QuotaRow[];
};

const percent = (amount: number, total: number): string =>
	((amount / total) * (100 / 1)).toLocaleString(undefined, {
		maximumFractionDigits: 2,
	});

export const QuotaTable = ({ rows, unit }: QuotaTableProps) => (
	<Column columnSpan={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<Table>
			<TableHead>
				<tr>
					<TableHeader scope="col">Quota</TableHeader>
					<TableHeader textAlign="right" scope="col">
						Access Amount
					</TableHeader>
					<TableHeader textAlign="right" scope="col">
						Balance
					</TableHeader>
					<TableHeader textAlign="right" scope="col">
						Left
					</TableHeader>
				</tr>
			</TableHead>
			<TableBody>
				{rows.map((row) => (
					<tr>
						<TableCell>
							<QuotaToken {...row.quota} />
						</TableCell>
						<TableCell textAlign="right">
							{row.accessAmount.toLocaleString()} {unit}
						</TableCell>
						<TableCell textAlign="right">
							{row.balance.toLocaleString()} {unit}
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

export const QuotaTableDefault = () => {
	const rows: QuotaRow[] = [
		{
			quota: {
				market: 'EU',
				quota: 'Buffalo Meat',
				agreementCode: 'FTA',
				periodTerm: 'JUL22–JUN23',
				link: '#',
			},
			status: 'active',
			balance: 10000,
			unit: 'TNs',
			accessAmount: 100000,
			left: 90000,
		},
		{
			quota: {
				market: 'EU',
				quota: 'Buffalo Meat',
				agreementCode: 'FTA',
				periodTerm: 'JUL22–JUN23',
				link: '#',
			},
			status: 'active',
			balance: 10000,
			unit: 'TNs',
			accessAmount: 100000,
			left: 90000,
		},
		{
			quota: {
				market: 'EU',
				quota: 'Buffalo Meat',
				agreementCode: 'FTA',
				periodTerm: 'JUL22–JUN23',
				link: '#',
			},
			status: 'active',
			balance: 10000,
			unit: 'TNs',
			accessAmount: 100000,
			left: 90000,
		},
		{
			quota: {
				market: 'EU',
				quota: 'Buffalo Meat',
				agreementCode: 'FTA',
				periodTerm: 'JUL22–JUN23',
				link: '#',
			},
			status: 'active',
			balance: 10000,
			unit: 'TNs',
			accessAmount: 100000,
			left: 90000,
		},
		{
			quota: {
				market: 'EU',
				quota: 'Buffalo Meat',
				agreementCode: 'FTA',
				periodTerm: 'JUL22–JUN23',
				link: '#',
			},
			status: 'active',
			balance: 10000,
			unit: 'TNs',
			accessAmount: 100000,
			left: 90000,
		},
		{
			quota: {
				market: 'EU',
				quota: 'Buffalo Meat',
				agreementCode: 'FTA',
				periodTerm: 'JUL22–JUN23',
				link: '#',
			},
			status: 'active',
			balance: 10000,
			unit: 'TNs',
			accessAmount: 100000,
			left: 90000,
		},
	];

	return (
		<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
			<QuotaTable rows={rows} />
		</Columns>
	);
};

export default {
	title: 'Quota/QuotaTable',
	component: QuotaTable,
	excludeStories: ['QuotaTable'],
} as ComponentMeta<typeof QuotaTable>;
