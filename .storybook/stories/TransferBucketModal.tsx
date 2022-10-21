import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTernaryState } from '@ag.ds-next/core';
import { Column, Columns } from '@ag.ds-next/columns';

import { Stack } from '@ag.ds-next/box';
import { Button, ButtonGroup } from '@ag.ds-next/button';
import { Modal } from '@ag.ds-next/modal';
import { TextInput } from '@ag.ds-next/text-input';
import { Select } from '@ag.ds-next/select';

export type BucketOptions = {
	label: string;
	value: string;
};

export type BucketList = {
	bucketId: number;
	bucketName: strong;
	balance: number;
};

export type TransferBucketModalProps = {
	validBuckets: BucketList[];
	unit: 'KGs';
	balance: number;
	bucketName: string;
};

export const TransferBucketModal = ({
	validBuckets,
	unit,
	balance,
	bucketName,
}: TransferBucketModalProps) => {
	const [isModalOpen, openModal, closeModal] = useTernaryState(false);
	const [requestedAmount, setRequestedAmount] = useState(null);
	const [selectedBucket, setSelectedBucket] = useState(null);

	const bucketList: BucketOptions[] = validBuckets.map((item) => {
		return {
			label: `#${item.bucketId} - ${
				item.bucketName
			} - ${item.balance.toLocaleString()} ${unit}`,
			value: item.bucketId.toString(),
		};
	});

	return (
		<Column key={bucketName} columnSpan={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3 }}>
			<Button block variant="secondary" onClick={openModal}>
				Transfer to another Bucket
			</Button>
			<Modal
				isOpen={isModalOpen}
				onDismiss={closeModal}
				title="Transfer to another Bucket"
				actions={
					<ButtonGroup>
						<Button
							disabled={balance - requestedAmount < 0}
							onClick={closeModal}
						>
							Proceed with Transfer
						</Button>
						<Button variant="secondary" onClick={closeModal}>
							Dismiss
						</Button>
					</ButtonGroup>
				}
			>
				<Stack gap={1} paddingTop={1}>
					<TextInput
						required
						label={`${bucketName} Current Balance`}
						disabled
						value={balance}
					/>

					<Select
						label="Recipient bucket"
						onBlur={() => {}}
						onChange={(event) => setSelectedBucket(event.target.value)}
						onFocus={function noRefCheck() {}}
						block
						options={bucketList}
						placeholder="Please select"
						required
						value={selectedBucket}
						required
					/>

					<TextInput
						label={`Transfer amount (${unit})`}
						type={'number'}
						required
						invalid={balance - requestedAmount < 0}
						message="There's not enough balance to transfer that amount."
						value={requestedAmount}
						onChange={(event) =>
							setRequestedAmount(parseInt(event.target.value))
						}
					/>

					{requestedAmount ? (
						<TextInput
							required
							label={`Sender's balance after transfer (${unit})`}
							type={'number'}
							value={balance - requestedAmount}
						/>
					) : null}
				</Stack>
			</Modal>
		</Column>
	);
};

const Template: ComponentStory<typeof TransferBucketModal> = (args) => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<TransferBucketModal {...args} />
	</Columns>
);

export const Common = Template.bind({});

Common.args = {
	bucketName: 'Josh 01 Pty Ltd',
	unit: 'KGs',
	balance: 10000,
	validBuckets: [
		{ bucketId: 41, bucketName: 'Josh Pty Ltd', balance: 1000 },
		{ bucketId: 42, bucketName: 'FCFS', balance: 100 },
		{ bucketId: 43, bucketName: 'Josh Pty Ltd', balance: 10 },
		{ bucketId: 44, bucketName: 'Josh Pty Ltd', balance: 1000 },
	],
};

export const NoBuckets = Template.bind({});

NoBuckets.args = {
	bucketName: 'Josh 02 Pty Ltd',
	unit: 'KGs',
	balance: 10000,
	validBuckets: [],
};

export const NoBalance = Template.bind({});

NoBalance.args = {
	bucketName: 'Josh 03 Pty Ltd',
	unit: 'KGs',
	balance: 0,
	validBuckets: [
		{ bucketId: 41, bucketName: 'Josh Pty Ltd', balance: 1000 },
		{ bucketId: 42, bucketName: 'FCFS', balance: 100 },
		{ bucketId: 43, bucketName: 'Josh Pty Ltd', balance: 10 },
		{ bucketId: 44, bucketName: 'Josh Pty Ltd', balance: 1000 },
	],
};

export default {
	title: 'Quota/TransferBucketModal',
	component: TransferBucketModal,
	excludeStories: ['TransferBucketModal'],
	argTypes: {},
} as ComponentMeta<typeof TransferBucketModal>;
