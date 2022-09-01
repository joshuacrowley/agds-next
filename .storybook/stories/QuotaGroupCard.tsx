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


export default {
	title: 'Quota/QuotaGroupCards',
};

const QuotaGroupCard = ({ quota, activeQuotaTokens, linkToViewQuota linkToAddNewPeriod }) => (
	<Column columnSpan={{ xs: 1, md: 2, lg: 4 }}>
		<Card>
			<CardHeader>
				<Flex alignItems={'center'} gap={1}>
					<NotificationBadge tone={'action'} value={4} />
					<Heading type="h3">{quota}</Heading>
				</Flex>
			</CardHeader>
			<CardFooter
				borderTop
				borderColor="muted"
				background={'bodyAlt'}
				padding={1.5}
			>
				<Flex justifyContent={'space-between'}>
					<StatusBadge tone={'success'} label={activeQuotaTokens} />
					<Flex>
					<TextLink href={linkToAddNewPeriod}>Add New Quota Period</TextLink>
						<DirectionLink href={linkToViewQuota} direction="right">View Quota</DirectionLink>
					</Flex>
				</Flex>
			</CardFooter>
		</Card>
	</Column>
);

export const Default = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<QuotaGroupCard quota={'Buffalo Meat'} />
		<QuotaGroupCard quota={'United States of America'} />
		<QuotaGroupCard quota={'United States of America'} />
	</Columns>
);
