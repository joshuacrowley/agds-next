import React, { MouseEventHandler, RefObject } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { Flex } from '@ag.ds-next/box';
import { CalendarIcon } from '@ag.ds-next/icon';
import { TextInputProps, textInputStyles } from '@ag.ds-next/text-input';
import { mapSpacing } from '@ag.ds-next/core';
import { Button } from '@ag.ds-next/button';
import { Field } from '@ag.ds-next/field';
import { formatDate, parseDate } from './utils';

export type DateInputProps = Omit<TextInputProps, 'onChange'> & {
	onChange: (value: string) => void;
	buttonRef: RefObject<HTMLButtonElement>;
	buttonOnClick: MouseEventHandler<HTMLButtonElement>;
};

export const DateInput = ({
	label,
	required,
	requiredLabel,
	hint,
	message,
	invalid,
	valid,
	block,
	id,
	buttonRef,
	maxWidth: maxWidthProp,
	buttonOnClick,
	disabled,
	value,
	onChange,
	...props
}: DateInputProps) => {
	const { maxWidth, ...styles } = {
		...textInputStyles({ block, invalid, maxWidth: maxWidthProp, valid }),
		width: '100%',
		borderRight: 'none',
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	};
	return (
		<Field
			label={label}
			required={Boolean(required)}
			requiredLabel={requiredLabel}
			hint={hint}
			message={message}
			invalid={invalid}
			valid={valid}
			id={id}
		>
			{(allyProps) => (
				<Flex alignItems="flex-end" css={{ maxWidth }}>
					<IMaskInput
						mask={Date}
						pattern="d{/}`m{/}`Y"
						format={(date) => formatDate(date)}
						parse={(value) => parseDate(value) || new Date()}
						value={value}
						onAccept={(value) => typeof value === 'string' && onChange(value)}
						unmask={false}
						lazy={false}
						blocks={{
							d: {
								mask: IMask.MaskedRange,
								placeholderChar: 'd',
								from: 1,
								to: 31,
								maxLength: 2,
							},
							m: {
								mask: IMask.MaskedRange,
								placeholderChar: 'm',
								from: 1,
								to: 12,
								maxLength: 2,
							},
							Y: {
								mask: IMask.MaskedRange,
								placeholderChar: 'y',
								from: 1,
								to: 9999,
								maxLength: 4,
							},
						}}
						css={{ ...styles, maxWidth: 'unset' }}
						{...props}
						{...allyProps}
					/>
					<Button
						type="button"
						ref={buttonRef}
						onClick={buttonOnClick}
						disabled={disabled}
						variant="secondary"
						aria-label="Choose date"
						css={{
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
							paddingLeft: mapSpacing(1),
							paddingRight: mapSpacing(1),
						}}
					>
						<CalendarIcon size="md" />
					</Button>
				</Flex>
			)}
		</Field>
	);
};
