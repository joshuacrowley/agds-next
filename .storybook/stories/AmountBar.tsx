import { SubNav } from '@ag.ds-next/sub-nav';
import { NotificationBadge } from '@ag.ds-next/badge';
import {
	SuccessFilledIcon,
	SuccessIcon,
	WarningFilledIcon,
	WarningIcon,
	AlertFilledIcon,
	AlertIcon,
} from '@ag.ds-next/icon';
import { Text } from '@ag.ds-next/text';
import { Stack, Box, Flex } from '@ag.ds-next/box';
import { Heading } from '@ag.ds-next/heading';

import { Button, ButtonGroup } from '@ag.ds-next/button';
import { Modal } from '@ag.ds-next/modal';
import { Textarea } from '@ag.ds-next/textarea';
import { Select } from '@ag.ds-next/select';
import { useTernaryState } from '@ag.ds-next/core';

export default {
	title: 'Quota/AmountBars',
};

export const Basic = () => {
	const [isModalOpen, openModal, closeModal] = useTernaryState(false);

	return (
		<div>
			<Flex>
				<Box background={'success'} color={'success'} width={'12%'}>
					J
				</Box>
			</Flex>
			<Button onClick={openModal}>Cancel Certificate</Button>
			<Modal
				isOpen={isModalOpen}
				onDismiss={closeModal}
				title="Cancel Certificate"
				actions={
					<ButtonGroup>
						<Button onClick={closeModal}>Proceed with Cancelation</Button>
						<Button variant="secondary" onClick={closeModal}>
							Dismiss
						</Button>
					</ButtonGroup>
				}
			>
				<Stack gap={1} paddingTop={1}>
					<Select
						label="Reason from Exporter"
						onBlur={() => {}}
						onChange={function noRefCheck() {}}
						onFocus={function noRefCheck() {}}
						block
						options={[
							{
								label: 'Exporter requested change',
								value: 'a',
							},
							{
								label: 'Exporter requested cancel',
								value: 'b',
							},
							{
								label: 'Importing country requested cancel',
								value: 'c',
							},
							{
								label: 'Incorrect exporter data',
								value: 'd',
							},
							{
								label: 'Incorrect certificate data',
								value: 'e',
							},
							{
								label: 'Billing error',
								value: 'f',
							},
							{
								label: 'Billing error',
								value: 'Quota Admin reason',
							},
						]}
						placeholder="Please select"
						required
					/>

					<Select
						block
						label="Balance adjustment"
						onBlur={() => {}}
						onChange={function noRefCheck() {}}
						onFocus={function noRefCheck() {}}
						options={[
							{
								label: 'Pending',
								value: 'a',
							},
							{
								label: 'Immediate balance adjustment',
								value: 'b',
							},
						]}
						placeholder="Please select"
						required
					/>

					<Textarea
						label="Comment"
						onBlur={() => {}}
						onChange={function noRefCheck() {}}
						onFocus={function noRefCheck() {}}
						required={false}
						block
					/>
				</Stack>
			</Modal>
		</div>
	);
};
