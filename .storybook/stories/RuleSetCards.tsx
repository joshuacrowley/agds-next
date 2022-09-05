import {
	Card,
	CardInner,
	CardFooter,
	CardHeader,
	Stack,
	Heading,
	Text,
	Flex,
	DirectionLink,
	Column,
	Columns,
	Table,
	TableBody,
	TableCell,
	TextLink,
	Button,
	TableHead,
} from '../../docs/components/designSystemComponents';

import { QuotaToken } from './QuotaToken';

export default {
	title: 'Quota/RuleSetCards',
};

const RuleSetTable = ({
	market,
	commodity,
	productTypes,
	cutCodes,
	equivalenceRate,
}) => (
	<Table>
		<TableBody>
			<tr>
				<TableCell>
					<Text as="span" fontWeight={'bold'}>
						Market
					</Text>
				</TableCell>
				<TableCell textAlign="right">
					<Text as="span">{market}</Text>
				</TableCell>
			</tr>
			<tr>
				<TableCell>
					<Text as="span" fontWeight={'bold'}>
						Commodity
					</Text>
				</TableCell>
				<TableCell textAlign="right">
					<Text as="span">{commodity}</Text>
				</TableCell>
			</tr>
			<tr>
				<TableCell>
					<Text as="span" fontWeight={'bold'}>
						{`Product Type${productTypes.length > 1 ? 's' : ''}`}
					</Text>
				</TableCell>
				<TableCell textAlign="right">
					<Text>
						{productTypes.length > 1 ? productTypes.join(', ') : productTypes}
					</Text>
				</TableCell>
			</tr>
			{cutCodes ? (
				<tr>
					<TableCell>
						<Text as="span" fontWeight={'bold'}>
							# of Cut Codes
						</Text>
					</TableCell>
					<TableCell textAlign="right">
						<Text as="span">{cutCodes}</Text>
					</TableCell>
				</tr>
			) : null}
			{equivalenceRate ? (
				<tr>
					<TableCell>
						<Text as="span" fontWeight={'bold'}>
							Equivalence rate
						</Text>
					</TableCell>
					<TableCell textAlign="right">
						<Text as="span">{equivalenceRate}</Text>
					</TableCell>
				</tr>
			) : null}
		</TableBody>
	</Table>
);

export const RuleSetCard = ({
	ruleSetNumber,
	label,
	market,
	commodity,
	productTypes,
	cutCodes,
	equivalenceRate,
	linkToEdit,
	editRules,
}) => (
	<Column columnSpan={{ xs: 1, md: 3, lg: 3 }}>
		<Card>
			<CardHeader>
				<Stack gap={1}>
					<Text fontSize={'xs'}>RULE SET #{ruleSetNumber}</Text>
					<Flex alignItems={'center'} gap={1}>
						<Heading type="h3">{label}</Heading>
					</Flex>
				</Stack>
			</CardHeader>
			<CardInner>
				<RuleSetTable
					market={market}
					commodity={commodity}
					productTypes={productTypes}
					cutCodes={cutCodes}
					equivalenceRate={equivalenceRate}
				/>
			</CardInner>

			<CardFooter
				borderTop
				borderColor="muted"
				background={'bodyAlt'}
				padding={1.5}
			>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					{!linkToEdit ? (
						<Button onClick={editRules} variant="text">
							Edit Eligibility Rule Set
						</Button>
					) : (
						<DirectionLink href={linkToEdit} direction="right">
							Edit Eligibility Rule Set
						</DirectionLink>
					)}
				</Flex>
			</CardFooter>
		</Card>
	</Column>
);

export const GroupOfCards = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<RuleSetCard
			ruleSetNumber={21}
			label={'Grain Fed, Beef'}
			market={'ID'}
			commodity={'M'}
			productTypes={[
				'Y',
				'YS',
				'AB',
				'B',
				'C',
				'D',
				'Y',
				'YS',
				'AB',
				'B',
				'C',
				'D',
			]}
			cutCodes={304}
			equivalenceRate={1.6}
			editRules={() => console.log('edit rules')}
		/>
		<RuleSetCard
			ruleSetNumber={36}
			label={'Oranges'}
			market={'ID'}
			commodity={'F'}
			productTypes={['ORA']}
			editRules={() => console.log('edit rules')}
		/>
		<RuleSetCard
			ruleSetNumber={39}
			label={'Steel'}
			market={'ID'}
			commodity={'Custom'}
			productTypes={['STEEL']}
			editRules={() => console.log('edit rules')}
		/>
		<RuleSetCard
			ruleSetNumber={39}
			label={'Steel'}
			market={'ID'}
			commodity={'Custom'}
			productTypes={['STEEL']}
			editRules={() => console.log('edit rules')}
		/>
	</Columns>
);

export const CutCodeCard = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<RuleSetCard
			ruleSetNumber={21}
			label={'Grain Fed, Beef'}
			market={'ID'}
			commodity={'M'}
			productTypes={[
				'Y',
				'YS',
				'AB',
				'B',
				'C',
				'D',
				'Y',
				'YS',
				'AB',
				'B',
				'C',
				'D',
			]}
			cutCodes={304}
			equivalenceRate={1.6}
		/>
	</Columns>
);

export const ProductCard = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<RuleSetCard
			ruleSetNumber={39}
			label={'Steel'}
			market={'ID'}
			commodity={'Custom'}
			productTypes={['STEEL']}
		/>
	</Columns>
);

export const GoToQuotaRuleSetPage = () => (
	<Columns cols={{ xs: 1, md: 3, lg: 12 }}>
		<RuleSetCard
			linkToEdit={'#'}
			ruleSetNumber={39}
			label={'Steel'}
			market={'ID'}
			commodity={'Custom'}
			productTypes={['STEEL']}
		/>
	</Columns>
);
