import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Stack } from '@ag.ds-next/react/stack';
import { Button, ButtonGroup } from '@ag.ds-next/react/button';
import { useTernaryState } from '@ag.ds-next/react/core';
import { Drawer } from '@ag.ds-next/react/drawer';
import { ListItem, UnorderedList } from '@ag.ds-next/react/list';
import { TextLink } from '@ag.ds-next/react/text-link';
import { SectionAlert } from '@ag.ds-next/react/section-alert';
import { FileUpload, FileWithStatus } from '@ag.ds-next/react/file-upload';
import { Text } from '@ag.ds-next/react/text';
import { Box } from '@ag.ds-next/react/box';
import { H2 } from '@ag.ds-next/react/heading';
import { visuallyHiddenStyles } from '@ag.ds-next/react/a11y';
import { formatFileSize } from '@ag.ds-next/react/file-upload';
import { useIsEditingFromReviewStep } from '../../../lib/useIsEditingFromReviewStep';
import { useGlobalForm } from '../GlobalFormProvider';
import { UploadFileTable } from '../UploadFileTable';
import { useFormContext } from './FormProvider';
import { FormContainer } from './FormContainer';
import { Form } from './Form';
import { stepKeyToStepDataMap } from './stepsData';

const tableHeadingId = 'upload-documents-heading';
const tableId = 'upload-file-table';

const documentRows = [
	{
		documentType: 'RMS Vehicle registration',
		file: '',
		size: '',
		id: 'rms-vehicle-registration',
		error: false,
	},
	{
		documentType: 'Suggested menu or list of foods being sold',
		file: '',
		size: '',
		id: 'suggested-menu-or-list-of-foods-being-sold',
		error: false,
	},
] as const;

export const idToDocumentTypeMap: Record<
	Document['id'],
	Document['documentType']
> = {
	'rms-vehicle-registration': 'RMS Vehicle registration',
	'suggested-menu-or-list-of-foods-being-sold':
		'Suggested menu or list of foods being sold',
};

export type Document = Pick<
	(typeof documentRows)[number],
	'documentType' | 'id'
> & {
	file: string;
	size: string;
	error: boolean;
};

type SampleTableError = {
	documentType: Document['documentType'];
	href: string;
	message: string;
	name: string;
};

export function StepUploadDocumentsForm() {
	const {
		stepUploadDocumentsGetState,
		stepUploadDocumentsSetState,
		isSavingBeforeExiting,
	} = useGlobalForm();
	const { submitStep } = useFormContext();

	const editingStep = useIsEditingFromReviewStep();

	const errorMessageRef = useRef<HTMLDivElement>(null);
	const successMessageRef = useRef<HTMLDivElement>(null);

	const { files = {} } = stepUploadDocumentsGetState() || {};

	// Table data
	const [documents, setDocuments] = useState<Document[]>(
		documentRows.map((documentRow) => ({
			...documentRow,
			file: files?.[documentRow.id]?.file || '',
			size: files?.[documentRow.id]?.size || '',
		}))
	);
	const [currentDocument, setCurrentDocument] = useState<Document>();

	// Errors
	const [tableErrors, setTableErrors] = useState<SampleTableError[]>([]);

	// Drawer state
	const [isDrawerOpen, openDrawer, closeDrawer] = useTernaryState(false);
	const [uploadedFile, setUploadedFile] = useState<FileWithStatus[]>([]);
	const [fileUploadInvalid, setFileUploadInvalid] = useState(false);
	const fileUploadRef = useRef<HTMLButtonElement>(null);

	// Action handlers
	const closeDrawerAndClearForm = () => {
		setUploadedFile([]);
		closeDrawer();
		setFileUploadInvalid(false);
	};

	// Focus management
	useEffect(() => {
		if (!uploadedFile.length && !currentDocument) return;

		// Ensure the message is focused after all table updates
		setTimeout(() => {
			successMessageRef.current?.focus();
		}, 500);
	}, [uploadedFile, currentDocument]);

	const uploadFile = () => {
		if (!uploadedFile.length) {
			setFileUploadInvalid(true);
			fileUploadRef.current?.focus();
			return;
		}

		const documentsWithNewFile = documents.map((prevDocument) =>
			currentDocument?.documentType === prevDocument.documentType
				? {
						...prevDocument,
						file: uploadedFile[0]?.name || '',
						size: uploadedFile[0]
							? `${formatFileSize(uploadedFile[0].size)}`
							: '',
						error: false,
				  }
				: prevDocument
		);
		setDocuments(documentsWithNewFile);

		closeDrawerAndClearForm();
	};

	const removeFile = (document: Document) => {
		setTableErrors([]);
		setDocuments((prevDocuments) =>
			prevDocuments.map((prevDocument) =>
				document?.documentType === prevDocument.documentType
					? {
							...prevDocument,
							file: '',
							size: '',
					  }
					: prevDocument
			)
		);
		setCurrentDocument(document);
	};

	const onSaveAndContinue = () => {
		const documentsWithErrors = documents.map((document) =>
			document.file
				? document
				: {
						...document,
						error: true,
				  }
		);
		const tableErrors = documentsWithErrors.reduce<SampleTableError[]>(
			(acc, document) =>
				document.file
					? acc
					: [
							...acc,
							{
								documentType: document.documentType,
								href: `#${document.id}`,
								message: `${document.documentType} is required`,
								name: 'files',
							},
					  ],
			[]
		);

		setCurrentDocument(undefined);
		setDocuments(documentsWithErrors);
		setTableErrors(tableErrors);

		return {
			hasErrors: documentsWithErrors.some(({ error }) => error),
		};
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event?.preventDefault();
		if (isSavingBeforeExiting) {
			return;
		}
		const { hasErrors } = onSaveAndContinue();
		if (hasErrors) return;

		await submitStep();

		stepUploadDocumentsSetState({
			files: Object.fromEntries(
				documents.map(({ file, id, size }) => [id, { file, size }])
			) as Record<Document['id'], { file: string; size: string }>,
			completed: !isSavingBeforeExiting,
		});
	};

	const isSuccessMessageVisible = currentDocument && !isDrawerOpen;

	return (
		<FormContainer
			formIntroduction="Upload all documents listed in the table below."
			formTitle={
				stepKeyToStepDataMap.stepUploadDocuments[
					editingStep?.match ? 'changeLabel' : 'label'
				]
			}
			hideRequiredFieldsMessage
		>
			<Stack gap={2}>
				<Stack gap={1}>
					<Box css={tableErrors.length ? undefined : { display: 'none' }}>
						<SectionAlert
							focusOnUpdate={tableErrors}
							onClose={() => setTableErrors([])}
							ref={errorMessageRef}
							tabIndex={-1}
							title="You must provide all documents in the table below"
							tone="errorHigh"
						>
							<Stack alignItems="flex-start" gap={0.5}>
								<UnorderedList>
									{tableErrors.map(({ href, message }) => (
										<ListItem key={href}>
											<TextLink href={href}>{message}</TextLink>
										</ListItem>
									))}
								</UnorderedList>
							</Stack>
						</SectionAlert>
					</Box>

					<Box css={isSuccessMessageVisible ? undefined : { display: 'none' }}>
						<SectionAlert
							onClose={() => setCurrentDocument(undefined)}
							ref={successMessageRef}
							tabIndex={-1}
							title={`${currentDocument?.documentType} updated`}
							tone="successHigh"
						>
							<Text as="p" breakWords>
								{documents.find(
									(document) => document.id === currentDocument?.id
								)?.file || 'Your file'}{' '}
								has been{' '}
								{documents.find(
									(document) => document.id === currentDocument?.id
								)?.file
									? 'added'
									: 'removed'}
								.
							</Text>
						</SectionAlert>
					</Box>

					<H2 css={visuallyHiddenStyles} id={tableHeadingId}>
						Upload documents
					</H2>

					<UploadFileTable
						ariaLabelledby={tableHeadingId}
						documents={documents}
						openDrawer={(document: Document) => {
							setTableErrors([]);
							openDrawer();
							setCurrentDocument(document);
						}}
						removeFile={removeFile}
						tableId={tableId}
					/>
				</Stack>

				<Drawer
					actions={
						<ButtonGroup>
							<Button form="upload-document-form" onClick={uploadFile}>
								Upload file
							</Button>

							<Button
								onClick={() => {
									setCurrentDocument(undefined);
									closeDrawerAndClearForm();
								}}
								variant="secondary"
							>
								Cancel
							</Button>
						</ButtonGroup>
					}
					elementToFocusOnClose={
						tableErrors.length
							? errorMessageRef.current
							: isSuccessMessageVisible
							? successMessageRef.current
							: undefined
					}
					isOpen={isDrawerOpen}
					onClose={() => {
						setCurrentDocument(undefined);
						closeDrawerAndClearForm();
					}}
					title="Upload documents"
				>
					<Stack as="form" id="upload-document-form">
						<FileUpload
							accept={['image/jpeg', 'application/pdf', 'image/png']}
							buttonRef={fileUploadRef}
							hideOptionalLabel
							invalid={fileUploadInvalid}
							label={`Upload ${currentDocument?.documentType}`}
							maxSize={2000}
							message={`${currentDocument?.documentType} is required`}
							onChange={(file) => {
								setUploadedFile(file);
								if (file.length) {
									setFileUploadInvalid(false);
								}
							}}
							required
							value={uploadedFile}
						/>
					</Stack>
				</Drawer>
			</Stack>

			<Form onSubmit={onSubmit} />
		</FormContainer>
	);
}
