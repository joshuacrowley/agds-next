import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Fragment } from 'react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { Button, ButtonGroup } from '@ag.ds-next/button';
import { Modal } from '@ag.ds-next/modal';
import { Textarea } from '@ag.ds-next/textarea';
import { Select } from '@ag.ds-next/select';
import { Checkbox } from '../../docs/components/designSystemComponents';
import { useTernaryState } from '@ag.ds-next/core';
import { InfoIcon } from '@ag.ds-next/icon';
import { RuleSetCard } from './RuleSetCards';
import { Columns } from '@ag.ds-next/columns';

export default {
	title: 'Quota/MatchedModal',
};

export const MatchedModal = ({ ruleSetNum }) => {
	const [isModalOpen, openModal, closeModal] = useTernaryState(false);

	return (
		<div>
			<Button onClick={openModal} variant={'text'}>
				#{ruleSetNum}
			</Button>
			<Modal
				isOpen={isModalOpen}
				onDismiss={closeModal}
				title="Why was this matched?"
				actions={
					<ButtonGroup>
						<Button variant="secondary" onClick={closeModal}>
							Dismiss
						</Button>
					</ButtonGroup>
				}
			>
				<Stack gap={1} paddingTop={1}>
					<RuleSetCard
						linkToEdit={'#'}
						ruleSetNumber={ruleSetNum}
						label={'Oranges'}
						market={'ID'}
						commodity={'G'}
						productTypes={['Oran']}
					/>
				</Stack>
			</Modal>
		</div>
	);
};
