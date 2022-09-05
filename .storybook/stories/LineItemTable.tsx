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
				<TableHeader textAlign="right" scope="col">
					Amount Requested
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Quantity Adjustment
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Equivalence
				</TableHeader>
				<TableHeader textAlign="right" scope="col">
					Amount for quota
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
						<TableCell textAlign="right">{row.productDescription}</TableCell>
						<TableCell textAlign="right">{row.amountRequested}</TableCell>
						<TableCell textAlign="right">{row.quantityAdjustment}</TableCell>
						<TableCell textAlign="right">{row.equivalenceRate}</TableCell>
						<TableCell textAlign="right">{row.amountForQuota}</TableCell>
					</tr>
				))}
		</TableBody>
	</Table>
);
