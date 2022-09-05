import { Box, Flex, Stack } from '@ag.ds-next/box';
import { useTernaryState } from '@ag.ds-next/core';
import { Button } from '../../docs/components/designSystemComponents';
import { LineItemTable } from './LineItemTable';

export default {
	title: 'Quota/LineItemBox - WIP',
};

export const Example = () => {
	const [isModalOpen, openModal, closeModal] = useTernaryState(false);

	return (
		<Box display="block" border borderColor="muted" background={'body'} rounded>
			<Box padding={1.5}>
				<LineItemTable
					striped={false}
					rows={[
						{
							line: 1,
							productDescription: 'LAMB TENDERLOIN BUTT OFF',
							amountRequested: 1,
							quantityAdjustment: null,
							equivalenceRate: null,
							amountForQuota: null,
							cutcode: { code: '123', preservation: 'F', suffix: null },
						},
						{
							line: 1,
							productDescription: 'LAMB TENDERLOIN BUTT OFF',
							amountRequested: 1,
							quantityAdjustment: null,
							equivalenceRate: null,
							amountForQuota: null,
							cutcode: { code: '123', preservation: 'F', suffix: null },
						},
						{
							line: 1,
							productDescription: 'LAMB TENDERLOIN BUTT OFF',
							amountRequested: 1,
							quantityAdjustment: null,
							equivalenceRate: null,
							amountForQuota: null,
							cutcode: { code: '123', preservation: 'F', suffix: null },
						},
					]}
				/>
			</Box>

			<Box borderTop borderColor="muted" background={'bodyAlt'} padding={1.5}>
				<Button>Josh</Button>
			</Box>
		</Box>
	);
};
