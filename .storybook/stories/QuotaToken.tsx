import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@ag.ds-next/text';
import { Box, Flex, Stack } from '@ag.ds-next/box';

export default {
	title: 'Quota/QuotaToken',
};

const responsiveFontSizes = {
	sm: 'lg',
	xs: 'lg',
	md: 'xl',
	lg: 'xl',
	xl: 'xl',
};
const responsiveFontSizesAlt = {
	sm: 'md',
	xs: 'md',
	md: 'lg',
	lg: 'lg',
	xl: 'lg',
};

export const QuotaToken = ({
	market,
	quota,
	quotaCode,
	periodEnd,
	agreementCode,
	periodTerm,
	shortHand,
}) =>
	shortHand ? (
		<Flex gap={0.2} alignItems={'center'}>
			<Text fontSize={'sm'} fontWeight={'bold'}>
				{market}
			</Text>
			<Text fontSize={'xs'}>/</Text>
			<Text fontSize={'sm'}>{quotaCode}</Text>
			<Text fontSize={'xs'}>/</Text>
			{agreementCode && (
				<>
					<Text fontSize={'sm'}>{agreementCode}</Text>
					<Text fontSize={'xs'}>/</Text>
				</>
			)}
			<Text fontSize={'sm'}>{periodEnd}</Text>
		</Flex>
	) : (
		<Flex gap={0.25} alignItems={'center'}>
			<Text fontSize={responsiveFontSizes} fontWeight={'bold'}>
				{market}
			</Text>
			<Text fontSize={responsiveFontSizesAlt}>/</Text>
			<Text fontSize={responsiveFontSizes}>{quota}</Text>
			<Text fontSize={responsiveFontSizesAlt}>/</Text>
			{agreementCode && (
				<>
					<Text fontSize={responsiveFontSizes}>{agreementCode}</Text>
					<Text fontSize={responsiveFontSizesAlt}>/</Text>
				</>
			)}
			<Text fontSize={responsiveFontSizes}>
				<span style={{ fontWeight: 200 }}>{periodTerm}</span>
			</Text>
		</Flex>
	);

export const ShortHand = () => (
	<QuotaToken shortHand market={'EU'} quotaCode={'BUFFM'} periodEnd={'23'} />
);
export const ShortHandQuarters = () => (
	<QuotaToken shortHand market={'EU'} quotaCode={'BUFFM'} periodEnd={'23Q2'} />
);

export const ShortHandQuartersAgreement = () => (
	<QuotaToken
		shortHand
		market={'EU'}
		quotaCode={'BUFFM'}
		periodEnd={'23Q2'}
		agreementCode={'FTA'}
	/>
);

export const LongHand = () => (
	<QuotaToken
		market={'EU'}
		quota={'Buffalo Meat'}
		agreementCode={'FTA'}
		periodTerm={'JUL22–JUN23'}
	/>
);
