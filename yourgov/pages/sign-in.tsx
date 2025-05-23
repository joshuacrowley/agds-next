import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ag.ds-next/react/button';
import { Column, Columns } from '@ag.ds-next/react/columns';
import { DirectionLink } from '@ag.ds-next/react/direction-link';
import { Divider } from '@ag.ds-next/react/divider';
import { FormStack } from '@ag.ds-next/react/form-stack';
import { LoadingBlanket } from '@ag.ds-next/react/loading';
import { PageAlert } from '@ag.ds-next/react/page-alert';
import { PageContent } from '@ag.ds-next/react/content';
import { PasswordInput } from '@ag.ds-next/react/password-input';
import { Stack } from '@ag.ds-next/react/stack';
import { Text } from '@ag.ds-next/react/text';
import { TextInput } from '@ag.ds-next/react/text-input';
import { TextLink } from '@ag.ds-next/react/text-link';
import { UnorderedList, ListItem } from '@ag.ds-next/react/list';
import { useScrollToField } from '@ag.ds-next/react/field';
import { DocumentTitle } from '../components/DocumentTitle';
import { mockUser } from '../data/mockUsers';
import { PageTitle } from '../components/PageTitle';
import { SiteLayout } from '../components/Layout/SiteLayout';
import { useAuth } from '../lib/useAuth';
import { zodString } from '../lib/zodUtils';

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { signIn } = useAuth();

	function onSubmit() {
		signIn(mockUser);
		const redirectTo = searchParams.get('redirectTo');
		router.push(redirectTo ? `/app?redirectTo=${redirectTo}` : '/app');
	}

	return (
		<Fragment>
			<DocumentTitle title="Sign in to yourGov" />
			<SiteLayout>
				<PageContent>
					<Columns>
						<Column columnSpan={{ xs: 12, md: 8 }}>
							<Stack gap={3}>
								<DirectionLink direction="left" href="/">
									Back
								</DirectionLink>
								<Stack gap={0.5}>
									<PageTitle
										introduction="Access government services, quickly and securely"
										title="Sign in to yourGov"
									/>
								</Stack>
								<SignInForm onSubmit={onSubmit} />
								<Divider />
								<Stack gap={1.5}>
									<Text as="p">
										Don’t have an account?{' '}
										<TextLink href="/not-found">Create account</TextLink>
									</Text>
									<Text as="p">
										Read our{' '}
										<TextLink href="/not-found">privacy policy</TextLink>
									</Text>
								</Stack>
							</Stack>
						</Column>
					</Columns>
				</PageContent>
			</SiteLayout>
		</Fragment>
	);
}

const formSchema = z.object({
	email: zodString('Enter your email').email('Enter a valid email'),
	password: zodString('Enter your password'),
});

type FormSchema = z.infer<typeof formSchema>;

function SignInForm(props: { onSubmit: (data: FormSchema) => void }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const clientErrorPageAlertRef = useRef<HTMLDivElement>(null);
	const [hasFocusedClientErrorRef, setHasFocusedClientErrorRef] =
		useState(false);

	const scrollToField = useScrollToField();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		mode: 'onSubmit',
		reValidateMode: 'onBlur',
	});

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		setIsSubmitting(true);
		setTimeout(() => {
			props.onSubmit(data);
			setIsSubmitting(false);
		}, 3000);
	};

	const onError: SubmitErrorHandler<FormSchema> = () => {
		setHasFocusedClientErrorRef(false);
	};

	// Only show the page alert if there is more than 1 error
	const hasClientErrors = Object.keys(errors).length > 1;

	useEffect(() => {
		if (!(hasClientErrors || hasFocusedClientErrorRef)) return;
		clientErrorPageAlertRef.current?.focus();
		setHasFocusedClientErrorRef(true);
	}, [hasFocusedClientErrorRef, hasClientErrors]);

	return (
		<Stack gap={3}>
			{hasClientErrors && (
				<PageAlert
					ref={clientErrorPageAlertRef}
					tabIndex={-1}
					title="There is a problem"
					tone="error"
				>
					<Text as="p">Please correct the following fields and try again</Text>
					<UnorderedList>
						{Object.entries(errors).map(([key, value]) => (
							<ListItem key={key}>
								<TextLink href={`#${key}`} onClick={scrollToField}>
									{value.message}
								</TextLink>
							</ListItem>
						))}
					</UnorderedList>
				</PageAlert>
			)}
			{isSubmitting && <LoadingBlanket fullScreen label="Signing in" />}
			<form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
				<FormStack>
					<TextInput
						{...register('email')}
						autoComplete="email"
						id="email"
						invalid={Boolean(errors.email?.message)}
						label="Email"
						maxWidth="xl"
						message={errors.email?.message}
						required
						type="email"
					/>
					<PasswordInput
						{...register('password')}
						autoComplete="current-password"
						id="password"
						invalid={Boolean(errors.password?.message)}
						label="Password"
						maxWidth="xl"
						message={errors.password?.message}
						required
					/>
					<div>
						<TextLink href="/not-found">Forgot password?</TextLink>
					</div>
					<div>
						<Button loading={isSubmitting} type="submit">
							Sign in
						</Button>
					</div>
				</FormStack>
			</form>
		</Stack>
	);
}
