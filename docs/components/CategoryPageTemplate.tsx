import { ReactNode } from 'react';
import { SectionContent } from '@ag.ds-next/react/content';
import {
	HeroCategoryBanner,
	HeroCategoryBannerSubtitle,
	HeroCategoryBannerTitle,
} from '@ag.ds-next/react/hero-banner';
import { Flex, Stack } from '@ag.ds-next/react/box';
import { AppLayout } from './AppLayout';
import { EditPage } from './EditPage';

export const CategoryPageTemplate = ({
	title,
	description,
	children,
	editPath,
}: {
	title: string;
	description: string;
	children: ReactNode;
	editPath?: string;
}) => {
	return (
		<AppLayout>
			<HeroCategoryBanner>
				<HeroCategoryBannerTitle>{title}</HeroCategoryBannerTitle>
				<HeroCategoryBannerSubtitle>{description}</HeroCategoryBannerSubtitle>
			</HeroCategoryBanner>
			<SectionContent>
				<Stack flexGrow={1} gap={3}>
					{children}
					{editPath && (
						<Flex justifyContent="flex-start">
							<EditPage path={editPath} />
						</Flex>
					)}
				</Stack>
			</SectionContent>
		</AppLayout>
	);
};
