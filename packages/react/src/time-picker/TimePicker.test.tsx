import '@testing-library/jest-dom';
import 'html-validate/jest';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '../../../../test-utils';
import { TimePicker, type TimePickerProps } from './TimePicker';

expect.extend(toHaveNoViolations);

function renderTimePicker(props?: Pick<TimePickerProps, 'loading'>) {
	return render(
		<TimePicker
			hint="Start typing to see results"
			label="Select a time"
			{...props}
		/>
	);
}

describe('TimePicker', () => {
	it('renders correctly', () => {
		const { container } = renderTimePicker();
		expect(container).toMatchSnapshot();
	});

	it('renders correctly when loading', async () => {
		const { container } = renderTimePicker({ loading: true });
		const input = screen.getByRole('combobox', {
			name: 'Select a time (optional)',
		});
		const user = userEvent.setup();
		await act(() => user.click(input));
		expect(container).toMatchSnapshot();
	});

	it('renders valid HTML with no a11y violations', async () => {
		const { container } = renderTimePicker();
		expect(container).toHTMLValidate({
			extends: ['html-validate:recommended'],
			rules: {
				'no-inline-style': 'off',
				// Our HTML is based off downshift
				'prefer-native-element': 'off',
				// react 18s `useId` break this rule
				'valid-id': 'off',
			},
		});
		await act(async () => {
			expect(await axe(container)).toHaveNoViolations();
		});
	});

	it('filters options', async () => {
		const { container } = renderTimePicker();
		const input = container.querySelector('input');
		expect(input).toBeInTheDocument();
		if (!input) return;

		await act(async () => input.click());
		await waitFor(() => expect(input).toHaveFocus());
		expect(input).toHaveAttribute('aria-expanded', 'true');

		await act(() => userEvent.type(input, '1245'));
		expect(input.value).toBe('1245');

		const options = container.querySelectorAll('li');
		expect(options.length).toBe(2);
		expect(options[0].textContent).toBe('12:45 am');
		expect(options[1].textContent).toBe('12:45 pm');
		await act(() => userEvent.click(options[0]));
		expect(input.value).toBe('12:45 am');
	});
});
