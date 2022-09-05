import { Box, Flex, Stack } from '@ag.ds-next/box';
import { useTernaryState } from '@ag.ds-next/core';
import { LineItemTable } from './LineItemTable';
import { DirectionLink } from '@ag.ds-next/direction-link';
import { Columns, Column } from '@ag.ds-next/columns';
import { QuotaToken } from './QuotaToken';
import { InfoIcon } from '@ag.ds-next/icon';
import { Text } from '@ag.ds-next/text';
import { Button } from '@ag.ds-next/button';
import { CertificateIcon } from './CertificateIcon';

import React, { useState } from 'react';

export default {
	title: 'Quota/LineItemBox',
};

const CERT_STATUS = ['ISSUED', 'CANCELLED'];

const LineItemBox = ({
	rows,
	quotaToken,
	commodity,
	adjustment,
	certStatus,
}) => {
	const [seeMatch, toggleMatch] = useState(false);
	return (
		<Box display="block" border borderColor="muted" background={'body'} rounded>
			<Box padding={1.5}>
				<Stack gap={1} alignItems={'flex-start'}>
					{!quotaToken ? (
						<Text fontSize={'lg'}>No matching eligibility rules</Text>
					) : (
						<Flex justifyContent={'space-between'} width={'100%'}>
							<Flex gap={0.5}>
								{certStatus === 'ISSUED' ? <CertificateIcon /> : null}
								{quotaToken}
							</Flex>
							<Button
								onClick={() => toggleMatch(!seeMatch)}
								iconBefore={() => <InfoIcon />}
								variant={'text'}
							>
								Why was this matched?
							</Button>
						</Flex>
					)}

					<LineItemTable
						seeMatch={seeMatch}
						commodity={commodity}
						striped={false}
						rows={rows}
						adjustment={adjustment}
					/>
				</Stack>
			</Box>

			<Box borderTop borderColor="muted" background={'bodyAlt'} padding={1.5}>
				<Flex gap={1} justifyContent="space-between">
					<Flex gap={1}>
						<Button variant={'text'}>Edit Line Items</Button>
						<Button variant={'text'}>Change Quota</Button>
					</Flex>
					<DirectionLink href={'#'} direction="right">
						Process Certificate
					</DirectionLink>
				</Flex>
			</Box>
		</Box>
	);
};

const rowSampleMeat = [
	{
		line: 1,
		productCode: 'YP',
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 11.34,
		quantityAdjustment: 11.24,
		equivalenceRate: 1.67,
		amountForQuota: 11.24,
		unit: 'TN',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 2,
		productCode: 'YP',
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 11,
		quantityAdjustment: 11,
		equivalenceRate: 1.67,
		amountForQuota: 11,
		unit: 'TN',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
	{
		line: 3,
		productCode: 'YP',
		productDescription: 'LAMB TENDERLOIN BUTT OFF',
		amountRequested: 14,
		quantityAdjustment: 5,
		equivalenceRate: 1.67,
		amountForQuota: 5,
		unit: 'TN',
		cutcode: { code: '123', preservation: 'F', suffix: null },
	},
];

export const Meat = () => {
	return (
		<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
			<LineItemBox
				rows={rowSampleMeat}
				commodity={'M'}
				quotaToken={
					<QuotaToken
						market={'EU'}
						quota={'Lamb'}
						agreementCode={'FTA'}
						periodTerm={'JUL22–JUN23'}
					/>
				}
			/>
		</Column>
	);
};

export const MeatAdjustment = () => {
	return (
		<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
			<LineItemBox
				rows={rowSampleMeat}
				commodity={'M'}
				adjustment
				quotaToken={
					<QuotaToken
						market={'EU'}
						quota={'Lamb'}
						agreementCode={'FTA'}
						periodTerm={'JUL22–JUN23'}
					/>
				}
			/>
		</Column>
	);
};

const rowSampleFruit = [
	{
		line: 1,
		productCode: 'YP',
		productDescription: 'JUICY ORANGES',
		amountRequested: 11.34,
		quantityAdjustment: null,
		amountForQuota: 11.34,
		unit: 'TN',
	},
];

export const Oranges = () => {
	return (
		<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
			<LineItemBox
				rows={rowSampleFruit}
				commodity={'G'}
				quotaToken={
					<QuotaToken
						market={'ID'}
						quota={'Oranges'}
						periodTerm={'JUL22–JUN23'}
					/>
				}
			/>
		</Column>
	);
};

export const OrangesIssued = () => {
	return (
		<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
			<LineItemBox
				rows={rowSampleFruit}
				certStatus={'ISSUED'}
				commodity={'G'}
				quotaToken={
					<QuotaToken
						market={'ID'}
						quota={'Oranges'}
						periodTerm={'JUL22–JUN23'}
					/>
				}
			/>
		</Column>
	);
};

export const NoQuota = () => {
	return (
		<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
			<LineItemBox rows={rowSampleFruit} commodity={'G'} />
		</Column>
	);
};
