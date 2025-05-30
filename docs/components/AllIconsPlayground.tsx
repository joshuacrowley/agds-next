import { useState } from 'react';
import { allIcons } from '@ag.ds-next/react/icon';
import { Flex } from '@ag.ds-next/react/flex';
import { Stack } from '@ag.ds-next/react/stack';
import { Text } from '@ag.ds-next/react/text';
import { Select } from '@ag.ds-next/react/select';
import { Columns } from '@ag.ds-next/react/columns';
import { proseBlockClassname } from '@ag.ds-next/react/prose';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';
type IconWeight = 'regular' | 'bold';

export function AllIconsPlayground() {
	const [size, setSize] = useState<IconSize>('md');
	const [weight, setWeight] = useState<IconWeight>('regular');
	return (
		<Stack className={proseBlockClassname} gap={1.5}>
			<Columns cols={{ xs: 1, sm: 2, md: 3 }} gap={1}>
				<Select
					hideOptionalLabel
					label="Size"
					maxWidth="xl"
					onChange={(e) => setSize(e.target.value as IconSize)}
					options={[
						{ label: 'Small (sm)', value: 'sm' },
						{ label: 'Medium (md)', value: 'md' },
						{ label: 'Large (lg)', value: 'lg' },
						{ label: 'X-Large (xl)', value: 'xl' },
					]}
					value={size}
				/>
				<Select
					hideOptionalLabel
					label="Weight"
					maxWidth="xl"
					onChange={(e) => setWeight(e.target.value as IconWeight)}
					options={[
						{ label: 'Regular', value: 'regular' },
						{ label: 'Bold', value: 'bold' },
					]}
					value={weight}
				/>
			</Columns>
			<Columns as="ol" cols={{ xs: 1, sm: 2, md: 3 }} gap={1}>
				{Object.keys(allIcons)
					.sort()
					.map((iconName) => {
						const Icon = allIcons[iconName as keyof typeof allIcons];
						return (
							<Flex
								alignItems="center"
								as="li"
								background="shade"
								flexDirection="column"
								flexShrink={0}
								gap={1}
								justifyContent="center"
								key={iconName}
								padding={2}
								rounded
							>
								<Icon size={size} weight={weight} />
								<Text>{iconName}</Text>
							</Flex>
						);
					})}
			</Columns>
		</Stack>
	);
}
