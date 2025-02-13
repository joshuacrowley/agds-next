import { useSpring, animated } from '@react-spring/web';
import { usePrefersReducedMotion, boxPalette } from '../core';
import { Box, BoxProps } from '../box';

export type SkeletonBoxProps = {
	/** The font size of the element. */
	fontSize?: BoxProps['fontSize'];
	/** The line height of the element. */
	lineHeight?: BoxProps['lineHeight'];
	/** The width of the element. */
	width?: BoxProps['width'];
	/** The height of the element. */
	height?: BoxProps['height'];
};

const AnimatedBox = animated(Box);

const opacity = { start: 0.84, end: 0.2 };
const duration = 1200;

export const SkeletonBox = ({
	fontSize = 'sm',
	lineHeight = 'default',
	height = 'auto',
	width = '100%',
}: SkeletonBoxProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const style = useSpring(
		prefersReducedMotion
			? {
					from: { opacity: opacity.start },
					to: { opacity: opacity.start },
			  }
			: {
					from: { opacity: opacity.start },
					to: { opacity: opacity.end },
					loop: { reverse: true, delay: 0 },
					config: { duration },
					reset: true,
			  }
	);

	return (
		<AnimatedBox
			aria-hidden="true"
			display="block"
			fontSize={fontSize}
			lineHeight={lineHeight}
			height={height}
			width={width}
			highContrastOutline
			rounded
			style={style}
			css={{
				opacity: opacity.start,
				backgroundColor: boxPalette.border,
				cursor: 'progress',
				'&:before': {
					content: '"\\00a0"',
				},
			}}
		/>
	);
};
