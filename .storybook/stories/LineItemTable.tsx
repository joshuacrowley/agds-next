import { Box, Flex, Stack } from '@ag.ds-next/box';
import { useTernaryState } from '@ag.ds-next/core';
import { Button } from '../../docs/components/designSystemComponents';
import {
	Table,
	TableBody,
	TableHeader,
	TableCell,
	TableHead,
} from '../../docs/components/designSystemComponents';

import { CutCode } from './CutCodeToken';
export default {
	title: 'Quota/LineItemTable - WIP',
};

export const LineItemTable = ({ rows, striped }) => (
	<Table striped={striped}>
		<TableHead>
			<tr>
				<TableHeader width="2%" scope="col">
					Line
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Cut Code
				</TableHeader>
				<TableHeader textAlign="left" scope="col">
					Products
				</TableHeader>
				<TableHeader textAlign="left" scope="col">
					Amount Requested
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Quantity Adjustment
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Equivalence
				</TableHeader>
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
						<TableCell textAlign="right">
							<CutCode
								code={row.cutcode.code}
								preservation={row.cutcode.preservation}
								suffix={row.cutcode.suffix}
							/>
						</TableCell>
						<TableCell textAlign="left">{row.productDescription}</TableCell>
						<TableCell textAlign="right">
							{row.amountRequested} {row.unit}
						</TableCell>
						<TableCell textAlign="right">
							{row.quantityAdjustment} {row.unit}
						</TableCell>
						<TableCell textAlign="right">{row.equivalenceRate} </TableCell>
						<TableCell textAlign="right">
							{row.amountForQuota} {row.unit}
						</TableCell>
					</tr>
				))}
		</TableBody>
	</Table>
);
