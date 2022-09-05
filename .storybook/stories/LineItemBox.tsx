import { Box, Flex, Stack } from '@ag.ds-next/box';
import { useTernaryState } from '@ag.ds-next/core';
import { LineItemTable } from './LineItemTable';
import { DirectionLink } from '@ag.ds-next/direction-link';
import { Columns, Column } from '@ag.ds-next/columns';
import { QuotaToken } from './QuotaToken';
import { InfoIcon } from '@ag.ds-next/icon';
import { Text } from '@ag.ds-next/text';
import { Button } from '@ag.ds-next/button';

export default {
	title: 'Quota/LineItemBox - WIP',
};

export const Example = () => {
	const [isModalOpen, openModal, closeModal] = useTernaryState(false);

	return (
		<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
			<Box
				display="block"
				border
				borderColor="muted"
				background={'body'}
				rounded
			>
				<Box padding={1.5}>
					<Stack gap={1} alignItems={'flex-start'}>
						<QuotaToken
							market={'EU'}
							quota={'Buffalo Meat'}
							agreementCode={'FTA'}
							periodTerm={'JUL22–JUN23'}
						/>

						<Button iconBefore={() => <InfoIcon />} variant={'text'}>
							Why was this matched?
						</Button>

						<LineItemTable
							striped={false}
							rows={[
								{
									line: 1,
									productDescription: 'LAMB TENDERLOIN BUTT OFF',
									amountRequested: 11.34,
									quantityAdjustment: 11.34,
									equivalenceRate: 1.67,
									amountForQuota: 11.34,
									unit: 'TN',
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
									cutcode: { code: '123', preservation: 'F', suffix: null },
								},
							]}
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
		</Column>
	);
};
