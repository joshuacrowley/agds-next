import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
} from '@ag.ds-next/accordion';
import {
	SearchBox,
	SearchBoxButton,
	SearchBoxInput,
} from '@ag.ds-next/search-box';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { Breadcrumbs } from '@ag.ds-next/breadcrumbs';
import { Button, ButtonGroup } from '@ag.ds-next/button';
import { Callout } from '@ag.ds-next/callout';
import { CallToActionLink } from '@ag.ds-next/call-to-action';
import { Card, CardInner } from '@ag.ds-next/card';
import { Columns, Column } from '@ag.ds-next/columns';
import { PageContent } from '@ag.ds-next/content';
import { ControlGroup, Checkbox, Radio } from '@ag.ds-next/control-input';
import { DirectionLink } from '@ag.ds-next/direction-link';
import { Heading, H1, H2 } from '@ag.ds-next/heading';
import { InpageNav } from '@ag.ds-next/inpage-nav';
import { FormStack } from '@ag.ds-next/form-stack';
import { FileUpload } from '@ag.ds-next/file-upload';
import { ProgressIndicator } from '@ag.ds-next/progress-indicator';
import { PageAlert } from '@ag.ds-next/page-alert';
import { Select } from '@ag.ds-next/select';
import { SubNav } from '@ag.ds-next/sub-nav';
import {
	StatusBadge,
	NotificationBadge,
	IndicatorDot,
} from '@ag.ds-next/badge';
import { SideNav } from '@ag.ds-next/side-nav';
import { Text } from '@ag.ds-next/text';
import { Textarea } from '@ag.ds-next/textarea';
import { TextInput } from '@ag.ds-next/text-input';
import { DatePicker } from '@ag.ds-next/date-picker';
import { Header } from '@ag.ds-next/header';
import { Logo } from '@ag.ds-next/ag-branding';
import { MainNav } from '@ag.ds-next/main-nav';
import { Footer, FooterDivider } from '@ag.ds-next/footer';
import { LinkList } from '@ag.ds-next/link-list';
import { tokens } from '@ag.ds-next/core';
import {
	HeroBanner,
	HeroBannerSubtitle,
	HeroBannerTitle,
	HeroBannerTitleContainer,
} from '@ag.ds-next/hero-banner';
import { SkeletonHeading, SkeletonText } from '@ag.ds-next/skeleton';
import {
	Table,
	TableCaption,
	TableCell,
	TableHeader,
	TableHead,
	TableBody,
} from '@ag.ds-next/table';
import { TextLink } from '@ag.ds-next/text-link';
import { AvatarIcon } from '@ag.ds-next/icon';

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
						{`Product Type${
							productTypes && productTypes.length > 1 ? 's' : ''
						}`}
					</Text>
				</TableCell>
				<TableCell textAlign="right">
					<Text>
						{productTypes && productTypes.length > 1
							? productTypes.join(', ')
							: productTypes}
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
	<Column columnSpan={{ xs: 2, sm: 3, md: 2, lg: 3, xl: 3 }}>
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
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
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
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
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
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
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
	<Columns cols={{ xs: 2, sm: 6, md: 6, lg: 12, xl: 12 }}>
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
