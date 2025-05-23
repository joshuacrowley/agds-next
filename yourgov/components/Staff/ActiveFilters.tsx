import format from 'date-fns/format';
import { Text } from '@ag.ds-next/react/text';
import { Flex } from '@ag.ds-next/react/flex';
import { Button } from '@ag.ds-next/react/button';
import { CloseIcon } from '@ag.ds-next/react/icon';
import { Tags } from '@ag.ds-next/react/tags';
import { GetDataFilters } from './lib/types';
import { useSortAndFilterContext } from './lib/contexts';
import { STATUS_MAP } from './lib/utils';

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

const getTagsFromFilters = ({
	filters,
	removeFilter,
}: {
	filters: GetDataFilters;
	removeFilter: (filterKey: keyof GetDataFilters) => void;
}) => {
	const filterEntries = Object.entries(filters) as Entries<GetDataFilters>;

	const tags: {
		label: string;
		onRemove: () => void;
	}[] = [];

	for (const [key, value] of filterEntries) {
		if (!value) continue;
		const formattedKey = formatFilterKey(key);
		const onRemove = () => removeFilter(key);

		if (key === 'activeUsers') {
			if (!value) continue;
			tags.push({
				label: 'Active users',
				onRemove,
			});
			continue;
		}

		if (key === 'role') {
			const selectedRoles = Object.keys(value) as (keyof typeof value)[];
			if (!selectedRoles.some((role) => value[role])) continue;

			tags.push({
				label: `${formattedKey}: ${selectedRoles
					.reduce<(keyof typeof value)[]>(
						(acc, role) => (value[role] ? [...acc, role] : acc),
						[]
					)
					.join(', ')}`,
				onRemove,
			});
			continue;
		}

		if (key === 'trainingCompleted') {
			const selectedTrainings = Object.keys(value) as (keyof typeof value)[];
			if (!selectedTrainings.some((training) => value[training])) continue;

			tags.push({
				label: `${formattedKey}: ${selectedTrainings
					.reduce<(keyof typeof value)[]>(
						(acc, role) => (value[role] ? [...acc, role] : acc),
						[]
					)
					.join(', ')}`,
				onRemove,
			});
			continue;
		}

		if (key === 'status') {
			tags.push({
				label: `${formattedKey}: ${STATUS_MAP[value].label}`,
				onRemove,
			});
			continue;
		}

		if (key === 'lastActiveFrom') {
			tags.push({
				label: `Last active from: ${format(new Date(value), 'dd/MM/yyyy')}`,
				onRemove,
			});
			continue;
		}

		if (key === 'lastActiveTo') {
			tags.push({
				label: `Last active to: ${format(new Date(value), 'dd/MM/yyyy')}`,
				onRemove,
			});
			continue;
		}

		if (Array.isArray(value)) {
			if (value.length === 0) continue;

			tags.push({
				label: `${formattedKey}: ${value.join(', ')}`,
				onRemove,
			});
			continue;
		}

		tags.push({ label: `${formattedKey}: ${value}`, onRemove });
	}

	return tags;
};

function formatFilterKey(key: keyof GetDataFilters) {
	return {
		activeUsers: false,
		dateJoinedFrom: 'Date joined',
		dateJoinedTo: 'Date joined',
		foodSafetyCertificate: 'Food safety certificate',
		lastActiveFrom: 'Last active',
		lastActiveTo: 'Last active',
		name: 'Name',
		role: 'Role',
		status: 'Status',
		trainingCompleted: 'Training completed',
	}[key];
}

export const ActiveFilters = () => {
	const { filters, removeFilter, resetFilters } = useSortAndFilterContext();
	const tags = getTagsFromFilters({ filters, removeFilter });

	if (tags.length === 0) {
		return null;
	}

	return (
		<Flex alignItems="flex-end" flexWrap="wrap" gap={0.75}>
			<Tags
				heading={
					<Text as="h3" fontWeight="bold">
						Active filters
					</Text>
				}
				items={tags}
			/>
			<Button
				iconAfter={CloseIcon}
				onClick={resetFilters}
				size="sm"
				variant="text"
			>
				Clear filters
			</Button>
		</Flex>
	);
};
