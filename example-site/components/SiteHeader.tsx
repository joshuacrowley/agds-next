import { useRouter } from 'next/router';
import { Logo } from '@ag.ds-next/ag-branding';
import { Stack } from '@ag.ds-next/box';
import { Header } from '@ag.ds-next/header';
import { MainNav, MainNavLink } from '@ag.ds-next/main-nav';
import { SiteHeaderSearch } from './SiteHeaderSearch';
import { AvatarIcon } from '@ag.ds-next/icon';

const NAV_LINKS = [
	{ label: 'Home', href: '/' },
	{ label: 'Content', href: '/content' },
	{ label: 'Form example', href: '/form' },
];

export const SiteHeader = () => {
	const router = useRouter();

	return (
		<Stack>
			<Header
				variant="dark"
				logo={<Logo />}
				heading="Export Service"
				subline="Supporting Australian agricultural exports"
				rightContent={<SiteHeaderSearch />}
			/>
			<MainNav
				variant="agriculture"
				links={NAV_LINKS}
				activePath={router.asPath}
				rightContent={
					<MainNavLink
						label="Sign in"
						href="/sign-in"
						icon={<AvatarIcon size={1.5} />}
					/>
				}
			/>
		</Stack>
	);
};
