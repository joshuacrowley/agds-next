import { boxPalette, tokens } from '@ag.ds-next/react/core';

export const FormDivider = () => (
	<hr
		aria-hidden="true"
		css={{
			boxSizing: 'content-box',
			height: 0,
			margin: 0,
			overflow: 'visible',
			border: 'none',
			borderTopWidth: tokens.borderWidth.sm,
			borderTopStyle: 'solid',
			borderColor: boxPalette.borderMuted,
			width: '100%',
		}}
	/>
);
