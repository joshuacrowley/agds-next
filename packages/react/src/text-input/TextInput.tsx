import { forwardRef, InputHTMLAttributes } from 'react';
import { Field } from '../field';
import { packs, boxPalette, mapSpacing, tokens, FieldMaxWidth } from '../core';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

type BaseTextInputProps = {
	autoComplete?: NativeInputProps['autoComplete'];
	autoFocus?: NativeInputProps['autoFocus'];
	disabled?: NativeInputProps['disabled'];
	id?: NativeInputProps['id'];
	inputMode?: NativeInputProps['inputMode'];
	maxLength?: NativeInputProps['maxLength'];
	name?: NativeInputProps['name'];
	onBlur?: NativeInputProps['onBlur'];
	onChange?: NativeInputProps['onChange'];
	onFocus?: NativeInputProps['onFocus'];
	pattern?: NativeInputProps['pattern'];
	placeholder?: NativeInputProps['placeholder'];
	type?: NativeInputProps['type'];
	value?: NativeInputProps['value'];
};

export type TextInputProps = BaseTextInputProps & {
	/** Describes the purpose of the field. */
	label: string;
	/** If true, "(optional)" will never be appended to the label. */
	hideOptionalLabel?: boolean;
	/** If false, "(optional)" will be appended to the label. */
	required?: boolean;
	/** Provides extra information about the field. */
	hint?: string;
	/** Message to show when the field is invalid. */
	message?: string;
	/** If true, the invalid state will be rendered. */
	invalid?: boolean;
	/** If true, the field will stretch to the fill the width of its container. */
	block?: boolean;
	/** The maximum width of the field. */
	maxWidth?: FieldMaxWidth;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	function TextInput(
		{
			label,
			hideOptionalLabel,
			required,
			hint,
			message,
			invalid,
			block,
			maxWidth = 'md',
			id,
			type = 'text',
			...props
		},
		ref
	) {
		const styles = textInputStyles({ block, maxWidth });
		return (
			<Field
				hideOptionalLabel={hideOptionalLabel}
				hint={hint}
				id={id}
				invalid={invalid}
				label={label}
				maxWidth={maxWidth}
				message={message}
				required={required}
			>
				{(a11yProps) => (
					<input css={styles} ref={ref} {...a11yProps} type={type} {...props} />
				)}
			</Field>
		);
	}
);

export const textInputStyles = ({
	block,
	maxWidth,
	multiline,
}: {
	block?: boolean;
	maxWidth?: FieldMaxWidth;
	multiline?: boolean;
}) =>
	({
		appearance: 'none',
		boxSizing: 'border-box',
		paddingLeft: mapSpacing(1),
		paddingRight: mapSpacing(1),
		margin: 0,
		background: boxPalette.backgroundBody,
		borderWidth: tokens.borderWidth.lg,
		borderStyle: 'solid',
		borderColor: boxPalette.border,
		borderRadius: tokens.borderRadius,
		color: boxPalette.foregroundText,
		fontFamily: tokens.font.body,
		...packs.input.md,

		...(maxWidth && {
			maxWidth: tokens.maxWidth.field[maxWidth],
		}),

		...(block && {
			maxWidth: 'none',
			display: 'block',
			width: '100%',
		}),

		...(multiline && {
			paddingTop: mapSpacing(0.5),
			paddingBottom: mapSpacing(0.5),
			height: 'auto',
			minHeight: '6rem',
		}),

		'&[aria-invalid="true"]': {
			backgroundColor: boxPalette.systemErrorMuted,
			borderColor: boxPalette.systemError,
		},

		'&:disabled': {
			cursor: 'not-allowed',
			borderColor: boxPalette.borderMuted,
			backgroundColor: boxPalette.backgroundShade,
			color: boxPalette.foregroundMuted,
		},

		'&:focus': packs.outline,
	}) as const;
