import { ReactNode, useEffect, useRef } from 'react';
import { Stack } from '@ag.ds-next/react/box';
import { PageAlert } from '@ag.ds-next/react/page-alert';
import { Text } from '@ag.ds-next/react/text';
import { FormStepTitle } from '../FormStepTitle';
import { useFormExampleMultiStep } from './FormExampleMultiStep';

export const FormExampleMultiStepContainer = ({
	children,
	title,
	introduction,
	callToAction,
}: {
	children: ReactNode;
	title: string;
	introduction: string;
	callToAction?: ReactNode;
}) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const { hasCompletedPreviousStep, currentStep } = useFormExampleMultiStep();

	// Focus the title of the current step as the user navigates between form steps
	useEffect(() => {
		titleRef.current?.focus();
	}, [currentStep]);

	return (
		<Stack gap={3}>
			<FormStepTitle
				titleRef={titleRef}
				formTitle="Title of multi-page form"
				stepTitle={title}
				introduction={introduction}
				callToAction={callToAction}
			/>
			{hasCompletedPreviousStep ? (
				children
			) : (
				<PageAlert
					tone="warning"
					title="This section of the form is not ready to be completed"
				>
					<Text as="p">
						Before starting this part of the form, you will need to go back and
						complete all of the previous sections.
					</Text>
				</PageAlert>
			)}
		</Stack>
	);
};
