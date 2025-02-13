import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
} from '@ag.ds-next/react/accordion';
import { Avatar } from '@ag.ds-next/react/avatar';
import { Details } from '@ag.ds-next/react/details';
import {
	SearchBox,
	SearchBoxButton,
	SearchBoxInput,
} from '@ag.ds-next/react/search-box';
import { Box, Flex, Stack } from '@ag.ds-next/react/box';
import { Breadcrumbs } from '@ag.ds-next/react/breadcrumbs';
import { Button, ButtonGroup } from '@ag.ds-next/react/button';
import { Callout } from '@ag.ds-next/react/callout';
import { CallToActionLink } from '@ag.ds-next/react/call-to-action';
import { Card, CardInner } from '@ag.ds-next/react/card';
import { Columns, Column } from '@ag.ds-next/react/columns';
import { PageContent } from '@ag.ds-next/react/content';
import { Switch } from '@ag.ds-next/react/switch';
import { ControlGroup, Checkbox, Radio } from '@ag.ds-next/react/control-input';
import { DirectionLink } from '@ag.ds-next/react/direction-link';
import { Heading, H1, H2 } from '@ag.ds-next/react/heading';
import { InpageNav } from '@ag.ds-next/react/inpage-nav';
import { FormStack } from '@ag.ds-next/react/form-stack';
import { FileUpload } from '@ag.ds-next/react/file-upload';
import { FileInput } from '@ag.ds-next/react/file-input';
import { ProgressIndicator } from '@ag.ds-next/react/progress-indicator';
import { PageAlert } from '@ag.ds-next/react/page-alert';
import { Select } from '@ag.ds-next/react/select';
import { SubNav } from '@ag.ds-next/react/sub-nav';
import {
	StatusBadge,
	NotificationBadge,
	IndicatorDot,
} from '@ag.ds-next/react/badge';
import { SideNav } from '@ag.ds-next/react/side-nav';
import { Text } from '@ag.ds-next/react/text';
import { Textarea } from '@ag.ds-next/react/textarea';
import { TextInput } from '@ag.ds-next/react/text-input';
import { DatePicker } from '@ag.ds-next/react/date-picker';
import { Header } from '@ag.ds-next/react/header';
import { Logo } from '@ag.ds-next/react/ag-branding';
import { MainNav } from '@ag.ds-next/react/main-nav';
import { Footer, FooterDivider } from '@ag.ds-next/react/footer';
import { LinkList } from '@ag.ds-next/react/link-list';
import { tokens } from '@ag.ds-next/react/core';
import {
	HeroBanner,
	HeroBannerSubtitle,
	HeroBannerTitle,
	HeroBannerTitleContainer,
} from '@ag.ds-next/react/hero-banner';
import { SkeletonHeading, SkeletonText } from '@ag.ds-next/react/skeleton';
import {
	Table,
	TableCaption,
	TableCell,
	TableHeader,
	TableHead,
	TableBody,
} from '@ag.ds-next/react/table';
import { TextLink } from '@ag.ds-next/react/text-link';
import { AvatarIcon } from '@ag.ds-next/react/icon';
import { Autocomplete } from '@ag.ds-next/react/src/autocomplete/Autocomplete';
import { Combobox } from '@ag.ds-next/react/src/combobox';
import {
	SummaryList,
	SummaryListItem,
	SummaryListItemDescription,
	SummaryListItemTerm,
} from '@ag.ds-next/react/summary-list';
import { SearchInput } from '@ag.ds-next/react/search-input';

export default {
	title: 'Testing/Kitchen sink',
	parameters: {
		layout: 'fullscreen',
	},
};

const sideNavItems = [
	{
		href: '#one',
		label: 'Do you need to lodge a tax return?',
	},
	{
		href: '#two',
		label: 'Lodge online',
		items: [
			{
				href: '#three',
				label: 'Pre-filling your online tax return',
			},
		],
	},
	{ href: '#four', label: "What's new for individuals" },
	{ href: '#five', label: 'Why you may receive a tax bill' },
];

const backgroundMapper = {
	body: {
		shade: 'shade',
		opposite: 'bodyAlt',
	},
	bodyAlt: {
		shade: 'shadeAlt',
		opposite: 'body',
	},
} as const;

const KitchenSink = ({ background }: { background: 'body' | 'bodyAlt' }) => {
	const backgroundSet = backgroundMapper[background];
	return (
		<Box background={background}>
			<Stack palette="dark">
				<Header
					background="bodyAlt"
					logo={<Logo />}
					heading="Export Service"
					subline="Supporting Australian agricultural exports"
				/>
				<MainNav
					id="main-nav"
					activePath="#home"
					items={[
						{ label: 'Home', href: '#home' },
						{ label: 'Category', href: '#category' },
					]}
					secondaryItems={[
						{
							label: 'Sign in',
							href: '#sign-in',
							endElement: <AvatarIcon color="action" />,
						},
					]}
				/>
			</Stack>
			<HeroBanner background={backgroundSet.opposite}>
				<HeroBannerTitleContainer>
					<HeroBannerTitle>
						Website hero banner title - xxxl/display (H1)
					</HeroBannerTitle>
					<HeroBannerSubtitle>
						Short hero banner sentence - md/default (P)
					</HeroBannerSubtitle>
				</HeroBannerTitleContainer>
				<SearchBox onSubmit={() => {}}>
					<SearchBoxInput label="Search this website" />
					<SearchBoxButton iconOnly={{ xs: true, md: false }}>
						Search
					</SearchBoxButton>
				</SearchBox>
			</HeroBanner>

			<PageContent>
				<Columns>
					<Column columnSpan={{ xs: 12, md: 4 }}>
						<Stack gap={2}>
							<SideNav
								background={background}
								title="Lodging your tax return"
								titleLink="#"
								collapseTitle="In this section"
								items={sideNavItems}
								activePath="#in-detail/record-keeping/incorrect-amounts"
							/>
							<ProgressIndicator
								background={background}
								items={[
									{ href: '#', label: 'Introduction', status: 'doing' },
									{ href: '#', label: 'Business Contacts', status: 'todo' },
									{ href: '#', label: 'Case Studies', status: 'done' },
								]}
							/>
						</Stack>
					</Column>

					<Column columnSpan={{ xs: 12, md: 8 }}>
						<Stack gap={2}>
							<SubNav
								background={background}
								activePath="#usage"
								links={[
									{ href: '#usage', label: 'Usage' },
									{ href: '#code', label: 'Code' },
									{ href: '#content', label: 'Content' },
									{ href: '#accessibility', label: 'Accessibility' },
								]}
							/>

							<Stack gap={1}>
								<PageAlert tone="info" title="Notice">
									<Text as="p">
										All vacancies close on the advertised closing date unless
										otherwise specified.
									</Text>
								</PageAlert>

								<PageAlert tone="success" title="Submission successful">
									<Text as="p">
										Your application has been successfully submitted.
									</Text>
								</PageAlert>

								<PageAlert tone="error" title="There is a problem">
									<Text as="p">
										<TextLink href="#email">
											Full name must not be empty
										</TextLink>
									</Text>
								</PageAlert>

								<PageAlert tone="warning" title="Browser out of date">
									<Text as="p">Your web browser is out of date.</Text>
								</PageAlert>
							</Stack>

							<Breadcrumbs
								links={[
									{ href: '#', label: 'Home' },
									{ href: '#', label: 'Establishments' },
									{ label: 'Applications' },
								]}
							/>

							<InpageNav
								title="On this page"
								links={[
									{ href: '#section-1', label: 'Section 1' },
									{ href: '#section-2', label: 'Section 2' },
									{ href: '#section-3', label: 'Section 3' },
									{ href: '#section-4', label: 'Section 4' },
									{ href: '#section-5', label: 'Section 5' },
								]}
							/>
							<H1>Kitchen sink</H1>
							<Text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Pellentesque at arcu eleifend, varius enim non, eleifend nibh.
								Quisque ac lacinia elit. Orci varius natoque penatibus et magnis
								dis parturient montes, nascetur ridiculus mus. Integer
								scelerisque at ligula tempor eleifend. Vestibulum volutpat,
								dolor eu rutrum consequat, libero justo lacinia tortor, id
								varius tortor ante sit amet nisl. Aenean at dui diam. Cras a
								ligula a ante aliquam lacinia. Ut dolor quam, gravida eu dui
								quis, molestie lacinia dolor. Fusce lacus mi, pharetra molestie
								tortor eu, finibus lacinia libero.
							</Text>

							<Callout title="Callout heading" background={backgroundSet.shade}>
								<Text as="p">Description of the callout.</Text>
							</Callout>

							<Accordion>
								<AccordionItem title="Accordion One" background={background}>
									<AccordionItemContent>
										<Text as="p">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Pellentesque at arcu eleifend, varius enim non, eleifend
											nibh. Quisque ac lacinia elit. Orci varius natoque
											penatibus et magnis dis parturient montes, nascetur
											ridiculus mus. Integer scelerisque at ligula tempor
											eleifend. Vestibulum volutpat, dolor eu rutrum consequat,
											libero justo lacinia tortor, id varius tortor ante sit
											amet nisl. Aenean at dui diam. Cras a ligula a ante
											aliquam lacinia. Ut dolor quam, gravida eu dui quis,
											molestie lacinia dolor. Fusce lacus mi, pharetra molestie
											tortor eu, finibus lacinia libero.
										</Text>
									</AccordionItemContent>
								</AccordionItem>
								<AccordionItem title="Accordion Two" background={background}>
									<AccordionItemContent>
										<Text as="p">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Pellentesque at arcu eleifend, varius enim non, eleifend
											nibh. Quisque ac lacinia elit. Orci varius natoque
											penatibus et magnis dis parturient montes, nascetur
											ridiculus mus. Integer scelerisque at ligula tempor
											eleifend. Vestibulum volutpat, dolor eu rutrum consequat,
											libero justo lacinia tortor, id varius tortor ante sit
											amet nisl. Aenean at dui diam. Cras a ligula a ante
											aliquam lacinia. Ut dolor quam, gravida eu dui quis,
											molestie lacinia dolor. Fusce lacus mi, pharetra molestie
											tortor eu, finibus lacinia libero.
										</Text>
									</AccordionItemContent>
								</AccordionItem>
							</Accordion>

							<Details label="Details">
								<Text as="p">
									This is a small paragraph of text that is supplementary to the
									main page content.
								</Text>
							</Details>

							<Columns cols={2}>
								<Card background="body">
									<CardInner>
										<Stack gap={1}>
											<Heading type="h2">Card with body background</Heading>
											<Text as="p">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Cras non finibus leo, non rhoncus neque. Nunc et dui
												cursus, euismod felis eget, tristique augue. Praesent
												consequat mollis lorem id efficitur.
											</Text>
										</Stack>
									</CardInner>
								</Card>
								<Card background="bodyAlt">
									<CardInner>
										<Stack gap={1}>
											<Heading type="h2">Card with bodyAlt background</Heading>
											<Text as="p">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Cras non finibus leo, non rhoncus neque. Nunc et dui
												cursus, euismod felis eget, tristique augue. Praesent
												consequat mollis lorem id efficitur.
											</Text>
										</Stack>
									</CardInner>
								</Card>
								<Card>
									<CardInner>
										<Stack gap={1}>
											<SkeletonHeading type="h3" width="50%" />
											<SkeletonText fontSize="sm" width="25%" />
										</Stack>
									</CardInner>
								</Card>
								<Card background="bodyAlt">
									<CardInner>
										<Stack gap={1}>
											<SkeletonHeading type="h3" width="50%" />
											<SkeletonText fontSize="sm" width="25%" />
										</Stack>
									</CardInner>
								</Card>
							</Columns>

							<H2>Forms</H2>
							<FormStack>
								<SearchInput label="Search" />

								<TextInput label="Name" />
								<TextInput
									label="Email"
									invalid
									message="An email address is required"
									id="email"
								/>
								<DatePicker
									label="Birth date"
									value={new Date()}
									onChange={() => {}}
								/>
								<Select
									label="Example"
									placeholder="Please select"
									options={[
										{ value: 'a', label: 'Option A' },
										{ value: 'b', label: 'Option B' },
										{ value: 'c', label: 'Option C' },
									]}
								/>
								<FileInput label="Drivers licence" />
								<FileUpload
									label="Drivers licence"
									onChange={() => {}}
									value={[]}
								/>
								<Textarea label="Message" />
								<ControlGroup>
									<Radio checked={false}>Phone</Radio>
									<Radio checked={false}>Tablet</Radio>
									<Radio checked={true}>Laptop</Radio>
								</ControlGroup>
								<Checkbox checked={true}>Label</Checkbox>
								<Autocomplete
									label="Find your state"
									hint="Start typing to see results"
									loadOptions={async function loadOptions() {
										return [
											{ label: 'Australian Capital Territory', value: 'act' },
											{ label: 'New South Wales', value: 'nsw' },
											{ label: 'Northern Territory', value: 'nt' },
											{ label: 'Queensland', value: 'qld' },
											{ label: 'South Australia', value: 'sa' },
											{ label: 'Tasmania', value: 'tas' },
											{ label: 'Victoria', value: 'vic' },
											{ label: 'Western Australia', value: 'wa' },
										];
									}}
								/>
								<Combobox
									label="Select state"
									options={[
										{ label: 'Australian Capital Territory', value: 'act' },
										{ label: 'New South Wales', value: 'nsw' },
										{ label: 'Northern Territory', value: 'nt' },
										{ label: 'Queensland', value: 'qld' },
										{ label: 'South Australia', value: 'sa' },
										{ label: 'Tasmania', value: 'tas' },
										{ label: 'Victoria', value: 'vic' },
										{ label: 'Western Australia', value: 'wa' },
									]}
								/>
								<Switch
									label="Show establishments"
									checked={true}
									onChange={console.log}
								/>

								<ButtonGroup>
									<Button size="md">Primary</Button>
									<Button size="md" variant="secondary">
										Secondary
									</Button>
									<Button size="md" variant="tertiary">
										Tertiary
									</Button>
								</ButtonGroup>
							</FormStack>

							<DirectionLink
								children="Direction link"
								direction="left"
								href="#"
							/>

							<CallToActionLink href="#">Call to action</CallToActionLink>

							<Flex gap={0.5} flexWrap="wrap">
								<StatusBadge tone="info" label="In progress" />
								<StatusBadge tone="success" label="Resolved" />
								<StatusBadge tone="error" label="Rejected" />
								<StatusBadge tone="warning" label="Attention" />
								<StatusBadge tone="neutral" label="Draft" />
							</Flex>

							<Flex gap={0.5}>
								<NotificationBadge tone="neutral" value={16} />
								<NotificationBadge tone="action" value={8} />
							</Flex>

							<IndicatorDot />

							<Flex gap={0.5}>
								<Avatar name="William Mead" tone="neutral" />
								<Avatar name="William Mead" tone="action" />
							</Flex>

							<Stack gap={1.5}>
								<SummaryList>
									<SummaryListItem>
										<SummaryListItemTerm>First name</SummaryListItemTerm>
										<SummaryListItemDescription>
											Will
										</SummaryListItemDescription>
									</SummaryListItem>
									<SummaryListItem>
										<SummaryListItemTerm>Last name</SummaryListItemTerm>
										<SummaryListItemDescription>
											Power
										</SummaryListItemDescription>
									</SummaryListItem>
									<SummaryListItem>
										<SummaryListItemTerm>
											Contact information
										</SummaryListItemTerm>
										<SummaryListItemDescription>
											+61 9912 3456
											<br />
											will.power@example.com
										</SummaryListItemDescription>
									</SummaryListItem>
									<SummaryListItem>
										<SummaryListItemTerm>Date of birth</SummaryListItemTerm>
										<SummaryListItemDescription>
											09/06/1995
										</SummaryListItemDescription>
									</SummaryListItem>
								</SummaryList>
								<TextLink href="#">Change all</TextLink>
							</Stack>

							<Table striped>
								<TableCaption>
									Population of Australian states and territories, December 2015
								</TableCaption>
								<TableHead>
									<tr>
										<TableHeader scope="col">Location</TableHeader>
										<TableHeader textAlign="right" scope="col">
											Population
										</TableHeader>
									</tr>
								</TableHead>
								<TableBody>
									<tr>
										<TableCell>New South Wales</TableCell>
										<TableCell textAlign="right">7,670,700</TableCell>
									</tr>
									<tr>
										<TableCell>Victoria</TableCell>
										<TableCell textAlign="right">5,996,400</TableCell>
									</tr>
									<tr>
										<TableCell>Queensland</TableCell>
										<TableCell textAlign="right">4,808,800</TableCell>
									</tr>
									<tr>
										<TableCell>Western Australia</TableCell>
										<TableCell textAlign="right">2,603,900</TableCell>
									</tr>
									<tr>
										<TableCell>South Australia</TableCell>
										<TableCell textAlign="right">1,702,800</TableCell>
									</tr>
									<tr>
										<TableCell>Tasmania</TableCell>
										<TableCell textAlign="right">517,400</TableCell>
									</tr>
									<tr>
										<TableCell>Northern Territory</TableCell>
										<TableCell textAlign="right">244,400</TableCell>
									</tr>
									<tr>
										<TableCell>Australian Capital Territory</TableCell>
										<TableCell textAlign="right">393,000</TableCell>
									</tr>
								</TableBody>
							</Table>
						</Stack>
					</Column>
				</Columns>
			</PageContent>
			<Box palette="dark">
				<Footer background="bodyAlt">
					<nav aria-label="footer">
						<LinkList
							links={[
								{ label: 'Home', href: '/' },
								{
									label: 'Storybook',
									href: 'https://design-system.agriculture.gov.au/storybook/index.html',
								},
								{
									label: 'Playroom',
									href: 'https://design-system.agriculture.gov.au/playroom/index.html',
								},
								{
									label: 'Starter kit',
									href: 'https://github.com/steelthreads/agds-starter-kit',
								},
							]}
							horizontal
						/>
					</nav>
					<FooterDivider />
					<Text fontSize="xs" maxWidth={tokens.maxWidth.bodyText}>
						We acknowledge the traditional owners of country throughout
						Australia and recognise their continuing connection to land, waters
						and culture. We pay our respects to their Elders past, present and
						emerging.
					</Text>
					<Text fontSize="xs" maxWidth={tokens.maxWidth.bodyText}>
						&copy; 2022 Department of Agriculture, Fisheries and Forestry
					</Text>
				</Footer>
			</Box>
		</Box>
	);
};

export const BodyBackground = () => {
	return <KitchenSink background="body" />;
};

export const BodyAltBackground = () => {
	return <KitchenSink background="bodyAlt" />;
};
