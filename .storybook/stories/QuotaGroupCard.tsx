import {
	Card,
	CardInner,
	CardFooter,
	CardHeader,
	TextLink,
	Stack,
	Heading,
	Text,
	StatusBadge,
	Flex,
	DirectionLink,
	NotificationBadge,
	Column,
	Columns,
} from '../../docs/components/designSystemComponents';

import { QuotaToken } from './QuotaToken';

export default {
	title: 'Quota/QuotaGroupCards',
};

const QuotaGroupCard = ({
	quota,
	activeQuotaPeriod,
	linkToViewQuota,
	linkToAddNewPeriod,
	multipleActiveQuotasPeriods,
	noActiveQuotaPeriod,
}) => (
	<Column columnSpan={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<Card>
			<CardHeader>
				<Flex alignItems={'center'} gap={1}>
					<Heading type="h3">{quota}</Heading>
				</Flex>
			</CardHeader>
			<CardFooter
				borderTop
				borderColor="muted"
				background={'bodyAlt'}
				padding={1.5}
			>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Flex
						display={{
							xs: 'none',
							sm: 'none',
							md: 'flex',
							lg: 'flex',
							xl: 'flex',
						}}
					>
						{noActiveQuotaPeriod ? (
							<StatusBadge tone={'warning'} label={'No Active Quota'} />
						) : (
							<StatusBadge
								tone={'success'}
								label={
									<Flex alignItems={'center'} gap={0.3}>
										{multipleActiveQuotasPeriods} Active
										{!multipleActiveQuotasPeriods ? activeQuotaPeriod : null}
									</Flex>
								}
							/>
						)}
					</Flex>
					<Flex gap={1}>
						<TextLink href={linkToAddNewPeriod}>Add New Quota Period</TextLink>
						<DirectionLink href={linkToViewQuota} direction="right">
							View Quota
						</DirectionLink>
					</Flex>
				</Flex>
			</CardFooter>
		</Card>
	</Column>
);

export const Active = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<QuotaGroupCard
			quota={'Mandarins, clementines, Wilkings and similar citrus hybrids '}
			activeQuotaPeriod={
				<QuotaToken
					shortHand
					market={'EU'}
					quotaCode={'BUFFM'}
					periodEnd={'23Q2'}
					agreementCode={'FTA'}
				/>
			}
		/>
		<QuotaGroupCard
			quota={'Buffalo Meat'}
			activeQuotaPeriod={
				<QuotaToken
					shortHand
					market={'EU'}
					quotaCode={'BUFFM'}
					periodEnd={'23Q2'}
					agreementCode={'FTA'}
				/>
			}
		/>
		<QuotaGroupCard
			quota={'Buffalo Meat'}
			activeQuotaPeriod={
				<QuotaToken
					shortHand
					market={'EU'}
					quotaCode={'BUFFM'}
					periodEnd={'23Q2'}
					agreementCode={'FTA'}
				/>
			}
		/>
		<QuotaGroupCard
			quota={'Buffalo Meat'}
			activeQuotaPeriod={
				<QuotaToken
					shortHand
					market={'EU'}
					quotaCode={'BUFFM'}
					periodEnd={'23Q2'}
					agreementCode={'FTA'}
				/>
			}
		/>
		<QuotaGroupCard
			quota={'Buffalo Meat'}
			activeQuotaPeriod={
				<QuotaToken
					shortHand
					market={'EU'}
					quotaCode={'BUFFM'}
					periodEnd={'23Q2'}
					agreementCode={'FTA'}
				/>
			}
		/>
	</Columns>
);

export const MultipleActiveQuotas = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<QuotaGroupCard quota={'Buffalo Meat'} multipleActiveQuotasPeriods={2} />
		<QuotaGroupCard quota={'Buffalo Meat'} multipleActiveQuotasPeriods={2} />
		<QuotaGroupCard quota={'Buffalo Meat'} multipleActiveQuotasPeriods={2} />
		<QuotaGroupCard quota={'Buffalo Meat'} multipleActiveQuotasPeriods={2} />
		<QuotaGroupCard quota={'Buffalo Meat'} multipleActiveQuotasPeriods={2} />
		<QuotaGroupCard quota={'Buffalo Meat'} multipleActiveQuotasPeriods={2} />
	</Columns>
);

export const noActiveQuotaPeriod = () => (
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<QuotaGroupCard quota={'Buffalo Meat'} noActiveQuotaPeriod />
		<QuotaGroupCard quota={'Buffalo Meat'} noActiveQuotaPeriod />
		<QuotaGroupCard quota={'Buffalo Meat'} noActiveQuotaPeriod />
		<QuotaGroupCard quota={'Buffalo Meat'} noActiveQuotaPeriod />
		<QuotaGroupCard quota={'Buffalo Meat'} noActiveQuotaPeriod />
	</Columns>
);
