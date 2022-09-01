import { Box, Flex, Stack } from '@ag.ds-next/box';
import { useTernaryState } from '@ag.ds-next/core';
import { Button } from '../../docs/components/designSystemComponents';

export default {
	title: 'Quota/LineItemBox',
};

export const Example = () => {
	const [isModalOpen, openModal, closeModal] = useTernaryState(false);

	return (
		<Box display="block" border borderColor="muted" background={'body'} rounded>
			<Box padding={1.5}></Box>

			<Box borderTop borderColor="muted" background={'bodyAlt'} padding={1.5}>
				<Button>Josh</Button>
			</Box>
		</Box>
	);
};
