import { useMemo } from 'react';
import { Checkbox } from '@ag.ds-next/react/checkbox';
import { useDataContext, useSortAndFilterContext } from './lib/contexts';
import { StaffMemberWithIndex } from './lib/types';

export const DataTableSelectAllCheckbox = () => {
	const { displayData } = useDataContext();
	const {
		toggleAllRowsSelected,
		isSelectAllCheckboxChecked,
		isSelectAllCheckboxIndeterminate,
	} = useSelectAllRows(displayData);
	return (
		<Checkbox
			checked={isSelectAllCheckboxChecked}
			indeterminate={isSelectAllCheckboxIndeterminate}
			onChange={toggleAllRowsSelected}
			size="sm"
		>
			Select all rows
		</Checkbox>
	);
};

export function useSelectAllRows(pageData: StaffMemberWithIndex[]) {
	const { selection, selectRows, clearRowSelections } =
		useSortAndFilterContext();

	/** The IDs of all of the items in the current page */
	const allPageItemIds = useMemo(
		() => pageData.map((item) => item.id),
		[pageData]
	);
	const isAnyRowSelected = useMemo(() => selection.length > 0, [selection]);
	const isEveryRowSelected = useMemo(
		() =>
			allPageItemIds.length > 0 &&
			allPageItemIds.every((itemId) => selection.includes(itemId)),
		[allPageItemIds, selection]
	);

	const toggleAllRowsSelected = () => {
		// When no rows are selected or we're indeterminate, on toggle we'll select all rows to match the screen reader announcement
		isEveryRowSelected ? clearRowSelections() : selectRows(allPageItemIds);
	};

	// DataTableSelectAllCheckbox state
	const isSelectAllCheckboxChecked = isEveryRowSelected;
	const isSelectAllCheckboxIndeterminate = isEveryRowSelected
		? false
		: isAnyRowSelected;

	return {
		isSelectAllCheckboxChecked,
		isSelectAllCheckboxIndeterminate,
		toggleAllRowsSelected,
	};
}
