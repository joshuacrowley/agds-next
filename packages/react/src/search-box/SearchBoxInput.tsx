import { InputHTMLAttributes, forwardRef } from 'react';
import { textInputStyles } from '../text-input';
import { Stack } from '../stack';
import { globalPalette, useId } from '../core';
import { SearchBoxLabel } from './SearchBoxLabel';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

type BaseSearchBoxInputProps = {
	id?: NativeInputProps['id'];
	name?: NativeInputProps['name'];
	onBlur?: NativeInputProps['onBlur'];
	onChange?: NativeInputProps['onChange'];
	onFocus?: NativeInputProps['onFocus'];
	placeholder?: NativeInputProps['placeholder'];
	value?: NativeInputProps['value'];
};

export type SearchBoxInputProps = BaseSearchBoxInputProps & {
	label?: string;
	labelVisible?: boolean;
};

export const SearchBoxInput = forwardRef<HTMLInputElement, SearchBoxInputProps>(
	function SearchBoxInput(
		{ label = 'Search', labelVisible = false, id, ...props },
		ref
	) {
		const inputId = useInputId(id);
		const styles = inputStyles();
		return (
			<Stack width="100%">
				<SearchBoxLabel htmlFor={inputId} visible={labelVisible}>
					{label}
				</SearchBoxLabel>
				<input
					autoComplete="off"
					css={styles}
					id={inputId}
					ref={ref}
					type="search"
					{...props}
				/>
			</Stack>
		);
	}
);

const useInputId = (idProp?: string) => {
	const autoId = useId();
	return idProp || `search-${autoId}`;
};

const inputStyles = () => {
	const baseStyles = textInputStyles({ block: true });
	return {
		...baseStyles,
		borderRightWidth: 0,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		color: globalPalette.lightForegroundText,
		background: globalPalette.lightBackgroundBody,

		'&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration':
			{
				display: 'none',
			},
	};
};
