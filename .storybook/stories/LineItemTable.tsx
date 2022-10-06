import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from '@ag.ds-next/box';

import {
	Table,
	TableBody,
	TableHeader,
	TableCell,
	TableHead,
} from '@ag.ds-next/table';

import { CutCode } from './CutCodeToken';
import { ProductCode } from './ProductCodeToken';
import { MatchedModal } from './MatchedModal';

export const LineItemTable = ({
	seeMatch,
	rows,
	striped,
	commodity,
	adjustment,
}) => (
	<Table striped={striped}>
		<TableHead>
			<tr>
				<TableHeader width="2%" scope="col">
					Line
				</TableHeader>
				{seeMatch ? (
					<TableHeader textAlign="left" scope="col">
						Rule Set
					</TableHeader>
				) : null}

				<TableHeader textAlign="left" scope="col">
					Codes
				</TableHeader>

				<TableHeader textAlign="left" scope="col">
					Products
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Amount Requested
				</TableHeader>
				{adjustment ? (
					<TableHeader textAlign="right" scope="col">
						Quantity Adjustment
					</TableHeader>
				) : null}
				{commodity === 'M' ? (
					<TableHeader textAlign="right" scope="col">
						Equivalence
					</TableHeader>
				) : null}
				<TableHeader textAlign="right" scope="col">
					Amount for Quota
				</TableHeader>
			</tr>
		</TableHead>
		<TableBody>
			{rows &&
				rows.map((row) => (
					<tr>
						<TableCell>{row.line}</TableCell>
						{seeMatch ? (
							<TableCell textAlign="left">
								<MatchedModal ruleSetNum={54} />
							</TableCell>
						) : null}

						{commodity === 'M' ? (
							<TableCell textAlign="left">
								<Flex gap={0.25}>
									<ProductCode code={row.productCode} />
									<CutCode
										code={row.cutcode.code}
										preservation={row.cutcode.preservation}
										suffix={row.cutcode.suffix}
									/>
								</Flex>
							</TableCell>
						) : (
							<TableCell textAlign="left">
								<ProductCode code={row.productCode} />
							</TableCell>
						)}
						<TableCell textAlign="left">{row.productDescription}</TableCell>
						<TableCell textAlign="right">
							{row.amountRequested} {row.unit}
						</TableCell>
						{adjustment ? (
							<TableCell textAlign="right">
								{row.quantityAdjustment} {row.unit}
							</TableCell>
						) : null}
						{commodity === 'M' ? (
							<TableCell textAlign="right">{row.equivalenceRate} </TableCell>
						) : null}
						<TableCell textAlign="right">
							{row.amountForQuota} {row.unit}
						</TableCell>
					</tr>
				))}
		</TableBody>
	</Table>
);

const rowSampleMeat = [
	{
		line: 1,
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 11.34,
		quantityAdjustment: 11.34,
		equivalenceRate: 1.67,
		amountForQuota: 11.34,
		unit: 'TN',
		productCode: 'YP',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 2,
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 1,
		quantityAdjustment: null,
		equivalenceRate: null,
		amountForQuota: null,
		unit: 'TN',
		productCode: 'YP',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 3,
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 1,
		quantityAdjustment: null,
		equivalenceRate: null,
		amountForQuota: null,
		unit: 'TN',
		productCode: 'YP',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 4,
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 1,
		quantityAdjustment: null,
		equivalenceRate: null,
		amountForQuota: null,
		unit: 'TN',
		productCode: 'YP',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 5,
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 1,
		quantityAdjustment: null,
		equivalenceRate: null,
		amountForQuota: null,
		unit: 'TN',
		productCode: 'YP',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 6,
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 1,
		quantityAdjustment: null,
		equivalenceRate: null,
		amountForQuota: null,
		unit: 'TN',
		productCode: 'YP',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
];

export const Meat = () => (
	<LineItemTable
		commodity={'M'}
		rows={rowSampleMeat}
		striped={rowSampleMeat.length > 5}
	/>
);

const rowSampleFruit = [
	{
		line: 1,
		productDescription: 'JUICY ORANGES',
		productCode: 'ORA',
		amountRequested: 11.34,
		quantityAdjustment: null,
		amountForQuota: 11.34,
		unit: 'TN',
	},
	{
		line: 2,
		productDescription: 'JUICY ORANGES',
		productCode: 'ORA',
		amountRequested: 11.34,
		quantityAdjustment: null,
		amountForQuota: 11.34,
		unit: 'TN',
	},
	{
		line: 3,
		productCode: 'ORA',
		productDescription: 'JUICY ORANGES',
		amountRequested: 11.34,
		quantityAdjustment: null,
		amountForQuota: 11.34,
		unit: 'TN',
	},
];

export const Other = () => (
	<LineItemTable
		commodity={'G'}
		rows={rowSampleFruit}
		striped={rowSampleFruit.length > 5}
	/>
);

export default {
	title: 'Quota/LineItemTable',
	component: LineItemTable,
	excludeStories: ['LineItemTable'],
} as ComponentMeta<typeof LineItemTable>;
