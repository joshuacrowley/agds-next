import { SubNav } from '@ag.ds-next/sub-nav';
import { NotificationBadge } from '@ag.ds-next/badge';
import {
	SuccessFilledIcon,
	SuccessIcon,
	WarningFilledIcon,
	WarningIcon,
	AlertFilledIcon,
	AlertIcon,
} from '@ag.ds-next/icon';
import { Text } from '@ag.ds-next/text';
import { Stack } from '@ag.ds-next/box';
import { Heading } from '@ag.ds-next/heading';

export default {
	title: 'Quota/SettingsSubNav',
};

const SubNavConfig = [
	{
		label: 'Eligibility Rules',
		count: 3,
		status: null,
		id: 'rules',
	},
	{
		label: 'Certificate Settings',
		count: null,
		status: 'ALERT',
		id: 'certificate',
	},
	{
		label: 'Eligibility Rules',
		count: null,
		status: 'WARNING',
		id: 'billing',
	},
];

const ICONS_FILLED = {
	SUCCESS: <SuccessFilledIcon color={'success'} />,
	ALERT: <AlertFilledIcon color={'error'} />,
	WARNING: <WarningFilledIcon color={'warning'} />,
};

const ICONS = {
	SUCCESS: <SuccessIcon color={'success'} />,
	ALERT: <AlertIcon color={'error'} />,
	WARNING: <WarningIcon color={'warning'} />,
};

const subNavEndElement = ({ count, status, active }) =>
	count ? (
		<NotificationBadge tone="action" value={count} />
	) : active ? (
		ICONS_FILLED[status]
	) : (
		ICONS[status]
	);

const SubNavLinks = ({ config, activePath }) =>
	config.map((data) => ({
		label: data.label,
		href: data.id,
		endElement: subNavEndElement({
			count: data.count,
			status: data.status,
			active: activePath === data.id,
		}),
	}));

const SettingsSubNav = ({ activePath, children, SubNavLinksConfig }) => (
	<Stack gap={2}>
		<SubNav
			activePath={activePath}
			background="body"
			links={SubNavLinks({ config: SubNavLinksConfig, activePath })}
		/>
		<Heading as={'h4'}>{'Certificate Settings'}</Heading>
		{children}
	</Stack>
);

export const QuotaSetupRules = () => (
	<SettingsSubNav
		activePath={'rules'}
		SubNavLinksConfig={[
			{
				label: 'Eligibility Rules',
				count: 3,
				status: null,
				id: 'rules',
			},
			{
				label: 'Certificate Settings',
				count: null,
				status: 'ALERT',
				id: 'certificate',
			},
			{
				label: 'Billing Settings',
				count: null,
				status: 'WARNING',
				id: 'billing',
			},
		]}
	>
		<Text>TODO</Text>
	</SettingsSubNav>
);

export const QuotaSetupCertificate = () => (
	<SettingsSubNav
		activePath={'certificate'}
		SubNavLinksConfig={[
			{
				label: 'Eligibility Rules',
				count: 0,
				status: null,
				id: 'rules',
			},
			{
				label: 'Certificate Settings',
				count: null,
				status: 'SUCCESS',
				id: 'certificate',
			},
			{
				label: 'Billing Settings',
				count: null,
				status: 'SUCCESS',
				id: 'billing',
			},
		]}
	>
		<Text>TODO</Text>
	</SettingsSubNav>
);

export const Requests = () => (
	<SettingsSubNav
		activePath={'rules'}
		SubNavLinksConfig={[
			{
				label: 'Certificate',
				count: null,
				status: 'SUCCESS',
				id: 'rules',
			},
			{
				label: 'Delivery Status',
				count: null,
				status: 'SUCCESS',
				id: 'certificate',
			},
			{
				label: 'Notifications',
				count: null,
				status: 'SUCCESS',
				id: 'notifications',
			},
			{
				label: 'Invoice',
				count: null,
				status: 'SUCCESS',
				id: 'invoice',
			},
		]}
	>
		<Text>TODO</Text>
	</SettingsSubNav>
);
