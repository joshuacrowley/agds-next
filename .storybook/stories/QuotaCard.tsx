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
	title: 'Quota/QuotaCards',
};

const QuotaPeriodStates = {
	active: 'success',
	notSet: 'warning',
	expired: 'error',
};

const QuotaPeriodLabels = {
	active: 'Active',
	notSet: 'No active date',
	expired: 'Expired',
};

const QuotaCard = ({
	quotaToken,
	activeDate,
	linkToViewQuotaPeriod,
	quotaPeriodStatus,
}) => (
	<Column columnSpan={{ xs: 1, md: 3, lg: 12 }}>
		<Card>
			<CardHeader>
				<Flex alignItems={'center'} gap={1}>
					{quotaToken}
				</Flex>
			</CardHeader>
			<CardFooter
				borderTop
				borderColor="muted"
				background={'bodyAlt'}
				padding={1.5}
			>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<StatusBadge
						tone={QuotaPeriodStates[quotaPeriodStatus]}
						label={`${QuotaPeriodLabels[quotaPeriodStatus]} ${
							activeDate ? activeDate : ''
						}`}
					/>
					<DirectionLink href={linkToViewQuotaPeriod} direction="right">
						View Quota Period
					</DirectionLink>
				</Flex>
			</CardFooter>
		</Card>
	</Column>
);

export const Active = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<QuotaCard
			quotaPeriodStatus={'active'}
			activeDate={'01/01/2022'}
			quotaToken={
				<QuotaToken
					market={'EU'}
					quota={'Buffalo Meat'}
					agreementCode={'FTA'}
					periodTerm={'JUL22–JUN23'}
				/>
			}
		/>
	</Columns>
);

export const NoQuotaPeriods = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<QuotaCard
			quotaPeriodStatus={'notSet'}
			quotaToken={
				<QuotaToken
					market={'EU'}
					quota={'Buffalo Meat'}
					agreementCode={'FTA'}
					periodTerm={'JUL22–JUN23'}
				/>
			}
		/>
	</Columns>
);

export const noActiveQuotaPeriod = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<QuotaCard
			quotaPeriodStatus={'expired'}
			activeDate={'01/01/2021'}
			quotaToken={
				<QuotaToken
					market={'EU'}
					quota={'Buffalo Meat'}
					agreementCode={'FTA'}
					periodTerm={'JUL22–JUN23'}
				/>
			}
		/>
	</Columns>
);
