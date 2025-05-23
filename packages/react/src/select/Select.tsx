import {
	Fragment,
	forwardRef,
	PropsWithChildren,
	SelectHTMLAttributes,
} from 'react';
import { Field } from '../field';
import { packs, boxPalette, mapSpacing, tokens, FieldMaxWidth } from '../core';
import { ChevronDownIcon } from '../icon';

export type Option = {
	label: string;
	value: string;
	disabled?: boolean;
};
export type OptionGroup = {
	label: string;
	disabled?: boolean;
	options: Option[];
};
export type Options = (Option | OptionGroup)[];

type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

type BaseSelectProps = {
	autoComplete?: NativeSelectProps['autoComplete'];
	autoFocus?: NativeSelectProps['autoFocus'];
	disabled?: NativeSelectProps['disabled'];
	id?: NativeSelectProps['id'];
	name?: NativeSelectProps['name'];
	onBlur?: NativeSelectProps['onBlur'];
	onChange?: NativeSelectProps['onChange'];
	onFocus?: NativeSelectProps['onFocus'];
	placeholder?: NativeSelectProps['placeholder'];
	value?: NativeSelectProps['value'];
};

type SelectMaxWidth = Extract<FieldMaxWidth, 'sm' | 'md' | 'lg' | 'xl'>;

export type SelectProps = BaseSelectProps & {
	/** Describes the purpose of the field. */
	label: string;
	/** If true, "(optional)" will never be appended to the label. */
	hideOptionalLabel?: boolean;
	/** The list of options to display in the drop-down list. */
	options: Options;
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
	maxWidth?: SelectMaxWidth;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	function Select(
		{
			label,
			hideOptionalLabel,
			required,
			hint,
			message,
			invalid,
			block,
			maxWidth = 'md',
			options,
			placeholder,
			id,
			...props
		},
		ref
	) {
		const styles = selectStyles({ block });
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
					<SelectContainer block={block} maxWidth={maxWidth}>
						<select css={styles} ref={ref} {...a11yProps} {...props}>
							<SelectOptions options={options} placeholder={placeholder} />
						</select>
						<SelectIcon disabled={props.disabled} />
					</SelectContainer>
				)}
			</Field>
		);
	}
);

const SelectContainer = ({
	children,
	block,
	maxWidth,
}: PropsWithChildren<{
	block?: boolean;
	maxWidth: SelectMaxWidth;
}>) => (
	<div
		css={{
			position: 'relative',
			...(!block && {
				maxWidth: tokens.maxWidth.field[maxWidth],
			}),
		}}
	>
		{children}
	</div>
);

const SelectOptions = ({
	options,
	placeholder,
}: {
	options: Options;
	placeholder?: string;
}) => {
	return (
		<Fragment>
			{placeholder ? <option value="">{placeholder}</option> : null}
			{options.map((opt) => {
				if ('options' in opt) {
					return (
						<optgroup disabled={opt.disabled} key={opt.label} label={opt.label}>
							{opt.options.map(({ value, label, disabled }) => (
								<option disabled={disabled} key={value} value={value}>
									{label}
								</option>
							))}
						</optgroup>
					);
				}
				return (
					<option disabled={opt.disabled} key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				);
			})}
		</Fragment>
	);
};

const SelectIcon = ({ disabled }: { disabled?: boolean }) => (
	<ChevronDownIcon
		css={{
			position: 'absolute',
			top: '50%',
			right: mapSpacing(0.75),
			transform: 'translateY(-50%)',
			opacity: disabled ? 0.3 : undefined,
			pointerEvents: 'none',
			color: boxPalette.foregroundAction,
		}}
	/>
);

const selectStyles = ({ block }: { block?: boolean }) =>
	({
		position: 'relative',
		appearance: 'none',
		boxSizing: 'border-box',
		paddingLeft: mapSpacing(1),
		// border width + icon size + desired padding
		paddingRight: `calc(${tokens.borderWidth.lg}px + 2.5rem)`,
		margin: 0,
		background: boxPalette.backgroundBody,
		borderWidth: tokens.borderWidth.lg,
		borderStyle: 'solid',
		borderColor: boxPalette.border,
		borderRadius: tokens.borderRadius,
		color: boxPalette.foregroundText,
		width: '100%',
		fontFamily: tokens.font.body,
		...packs.input.md,
		lineHeight: tokens.lineHeight.default,
		...packs.truncate,

		...(block && {
			maxWidth: 'none',
			display: 'block',
		}),

		'&[aria-invalid="true"]': {
			backgroundColor: boxPalette.systemErrorMuted,
			borderColor: boxPalette.systemError,
		},

		'&:disabled': {
			opacity: 1, // Overwrites default browser styles
			cursor: 'not-allowed',
			borderColor: boxPalette.borderMuted,
			backgroundColor: boxPalette.backgroundShade,
			color: boxPalette.foregroundMuted,
		},

		'&:focus': packs.outline,
	}) as const;
