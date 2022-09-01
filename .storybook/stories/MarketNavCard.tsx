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
	title: 'Quota/MarketNavCards',
};

const MarketNavCard = ({ market, quotaCount, linkToMarket }) => (
	<Column columnSpan={{ xs: 1, md: 2, lg: 4 }}>
		<Card>
			<CardHeader>
				<Flex alignItems={'center'} gap={1}>
					<NotificationBadge tone={'action'} value={4} />
					<Heading type="h3">{market}</Heading>
				</Flex>
			</CardHeader>
			<CardFooter
				borderTop
				borderColor="muted"
				background={'bodyAlt'}
				padding={1.5}
			>
				<Flex justifyContent={'space-between'}>
					<TextLink href="#">Edit Market</TextLink>
					<DirectionLink direction="right">View Quotas</DirectionLink>
				</Flex>
			</CardFooter>
		</Card>
	</Column>
);

export const Default = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<MarketNavCard market={'United States of America'} quotaCount={6} />
		<MarketNavCard market={'United States of America'} quotaCount={6} />
		<MarketNavCard market={'United States of America'} quotaCount={6} />
	</Columns>
);
