import { Text } from '@ag.ds-next/text';
import { Flex } from '@ag.ds-next/box';
import { ArrowRightIcon } from '@ag.ds-next/icon';
import { Button } from '@ag.ds-next/button';

export default {
	title: 'Quota/QuotaToken',
};

export type QuotaTokenProps = {
	market: string;
	quota?: string;
	quotaCode?: string;
	agreementCode?: string;
	periodEnd?: string;
	periodTerm?: string;
	shortHand?: boolean;
	size: 'sm' | 'lg';
	link?: string;
};

export const QuotaToken = ({
	market,
	quota,
	quotaCode,
	periodEnd,
	agreementCode,
	periodTerm,
	size,
	link,
}: QuotaToken) => (
	<>
		{quotaCode ? (
			<Flex gap={0.25} alignItems={'center'}>
				<Text fontSize={size} fontWeight={'bold'}>
					{market}
				</Text>
				<Text fontSize={size}>/</Text>
				<Text color={link ? 'action' : 'text'} fontSize={size}>
					{quotaCode}
				</Text>
				<Text fontSize={size}>/</Text>
				{agreementCode && (
					<>
						<Text color={link ? 'action' : 'text'} fontSize={size}>
							{agreementCode}
						</Text>
						<Text color={link ? 'action' : 'text'} fontSize={size}>
							/
						</Text>
					</>
				)}{' '}
				<Text color={link ? 'action' : 'text'} fontSize={size}>
					{periodEnd}
				</Text>
				{link && <ArrowRightIcon color={'action'} />}
			</Flex>
		) : (
			<Flex gap={0.25} alignItems={'center'}>
				<Text
					color={link ? 'action' : 'text'}
					fontSize={size}
					fontWeight={'bold'}
				>
					{market}
				</Text>

				<Text fontSize={size}>/</Text>

				<Text color={link ? 'action' : 'text'} fontSize={size}>
					{quota}
				</Text>
				<Text fontSize={size}>/</Text>
				{agreementCode && (
					<>
						<Text color={link ? 'action' : 'text'} fontSize={size}>
							{agreementCode}
						</Text>
						<Text color={link ? 'action' : 'text'} fontSize={size}>
							/
						</Text>
					</>
				)}
				<Text color={link ? 'action' : 'text'} fontSize={size}>
					<span style={{ fontWeight: 200 }}>{periodTerm}</span>
				</Text>
				{link && <ArrowRightIcon color="action" />}
			</Flex>
		)}
	</>
);

export const CodeSmall = () => (
	<QuotaToken size={'sm'} market={'EU'} quotaCode={'BUFFM'} periodEnd={'23'} />
);

export const CodeSmallLink = () => (
	<QuotaToken
		size={'sm'}
		link={'#'}
		market={'EU'}
		quotaCode={'BUFFM'}
		periodEnd={'23'}
	/>
);
export const CodeWithQuarterPeriod = () => (
	<QuotaToken
		size={'sm'}
		market={'EU'}
		quotaCode={'BUFFM'}
		periodEnd={'23Q2'}
		link={'#'}
	/>
);

export const AgreementSmall = () => (
	<QuotaToken
		size={'sm'}
		market={'EU'}
		quotaCode={'BUFFM'}
		periodEnd={'23Q2'}
		agreementCode={'FTA'}
	/>
);

export const Large = () => (
	<QuotaToken
		size={'lg'}
		market={'EU'}
		quota={'Buffalo Meat'}
		agreementCode={'FTA'}
		periodTerm={'JUL22–JUN23'}
	/>
);
