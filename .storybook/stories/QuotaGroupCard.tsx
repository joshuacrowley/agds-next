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
