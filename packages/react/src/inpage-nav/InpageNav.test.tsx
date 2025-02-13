import '@testing-library/jest-dom';
import 'html-validate/jest';
import { render, cleanup, screen } from '../../../../test-utils';
import { InpageNav, InpageNavProps } from './InpageNav';

afterEach(cleanup);

function renderInpageNav(props?: Partial<InpageNavProps>) {
	return render(
		<InpageNav
			links={[
				{ href: '#section-1', label: 'Section 1' },
				{ href: '#section-2', label: 'Section 2' },
				{ href: '#section-3', label: 'Section 3' },
				{ href: '#section-4', label: 'Section 4' },
				{ href: '#section-5', label: 'Section 5' },
			]}
			{...props}
		/>
	);
}

describe('InpageNav', () => {
	it('renders correctly', () => {
		const { container } = renderInpageNav();
		expect(container).toMatchSnapshot();
	});

	it('renders a valid HTML structure', () => {
		const { container } = renderInpageNav();
		expect(container).toHTMLValidate({
			extends: ['html-validate:recommended'],
		});
	});

	it('renders title when supplied', async () => {
		const title = 'On this page';
		renderInpageNav({ title });
		const titleEl = await screen.findByText(title);
		expect(titleEl).toBeInTheDocument();
		expect(titleEl.tagName).toBe('H2');
		expect(titleEl.textContent).toBe(title);
	});
});
