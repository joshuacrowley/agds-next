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
	<Column columnSpan={{ xs: 2, sm: 3, md: 2, lg: 4, xl: 4 }}>
		<Card>
			<CardHeader>
				<Flex alignItems={'center'} gap={1}>
					<NotificationBadge
						tone={quotaCount ? 'action' : 'neutral'}
						value={quotaCount}
					/>
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
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
		<MarketNavCard market={'United States of America'} quotaCount={0} />
		<MarketNavCard market={'United States of America'} quotaCount={8} />
		<MarketNavCard market={'United States of America'} quotaCount={16} />
		<MarketNavCard market={'United States of America'} quotaCount={16} />
	</Columns>
);
