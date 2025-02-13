import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { Prose } from '@ag.ds-next/react/prose';
import {
	getPkgList,
	getPkg,
	Pkg,
	getPkgNavLinks,
	getPkgBreadcrumbs,
	getPkgDocsContent,
} from '../../../lib/mdx/packages';
import { mdxComponents } from '../../../components/mdxComponents';
import { AppLayout } from '../../../components/AppLayout';
import { DocumentTitle } from '../../../components/DocumentTitle';
import { PkgLayout } from '../../../components/PkgLayout';

export default function Packages({
	pkg,
	navLinks,
	breadcrumbs,
	content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<DocumentTitle title={pkg.title} description={pkg.description} />
			<AppLayout>
				<PkgLayout
					pkg={pkg}
					navLinks={navLinks}
					breadcrumbs={breadcrumbs}
					skipLinks={[
						{
							label: `Skip to ${pkg.title} overview`,
							href: '#pkg-content',
						},
					]}
					editPath={`/packages/${pkg.slug}/docs/overview.mdx`}
				>
					<Prose id="pkg-content">
						<MDXRemote {...content} components={mdxComponents} />
					</Prose>
				</PkgLayout>
			</AppLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps<
	{
		pkg: NonNullable<Pkg>;
		navLinks: Awaited<ReturnType<typeof getPkgNavLinks>>;
		breadcrumbs: Awaited<ReturnType<typeof getPkgBreadcrumbs>>;
		content: NonNullable<Awaited<ReturnType<typeof getPkgDocsContent>>>;
	},
	{ slug: string }
> = async ({ params }) => {
	const { slug } = params ?? {};
	const pkg = slug ? await getPkg(slug) : undefined;
	const content = pkg
		? await getPkgDocsContent(pkg.slug, 'overview.mdx')
		: null;

	if (!(slug && pkg && content)) {
		return { notFound: true };
	}

	const navLinks = await getPkgNavLinks();
	const breadcrumbs = await getPkgBreadcrumbs(slug);

	return {
		props: {
			pkg,
			navLinks,
			breadcrumbs,
			content,
		},
	};
};

export const getStaticPaths = async () => {
	const packages = await getPkgList();
	return {
		paths: packages.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: false,
	};
};
