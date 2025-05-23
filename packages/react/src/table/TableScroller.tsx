import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Box } from '../box';
import { boxPalette, tokens } from '../core';
import { Flex } from '../flex';
import { ScrollbarArrowLeftIcon, ScrollbarArrowRightIcon } from '../icon';
import { Stack } from '../stack';

export type TableScrollerProps = { children: ReactNode };

export function TableScroller({ children }: TableScrollerProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLButtonElement>(null);
	const scrollerRef = useRef<HTMLDivElement>(null);
	const mousePos = useRef({ x: 0, y: 0 });

	const [shadowHeight, setShadowHeight] = useState(0);
	const [scrollerAriaLabel, setScrollerAriaLabel] = useState('');
	const [isDraggingThumb, setIsDraggingThumb] = useState(false);
	const [thumbPosition, setThumbPosition] = useState(0);
	// Assume tables don't need a scrollbar to begin with
	const [thumbWidthRatio, setThumbWidthRatio] = useState(1);
	const [buttonIntervalId, setButtonIntervalId] = useState<number | null>(null);

	const repositionThumb = useCallback(() => {
		if (!scrollerRef?.current) {
			return;
		}

		setThumbPosition(scrollerRef.current.scrollLeft * thumbWidthRatio);
	}, [thumbWidthRatio]);

	const calculateThumbWidth = useCallback(() => {
		if (!scrollerRef?.current || !trackRef?.current) {
			return;
		}

		if (scrollerRef.current.offsetWidth === scrollerRef.current.scrollWidth) {
			setThumbWidthRatio(1);
		} else {
			setThumbWidthRatio(
				trackRef.current.offsetWidth /
					(scrollerRef.current.scrollWidth -
						(scrollerRef.current.offsetWidth - trackRef.current.offsetWidth))
			);
		}
	}, []);

	useEffect(() => {
		if (
			typeof window === 'undefined' ||
			!('ResizeObserver' in window) ||
			!scrollerRef.current
		) {
			return;
		}

		const observer = new ResizeObserver((entry) => {
			setShadowHeight(entry[0].contentRect.height);
			calculateThumbWidth();
			repositionThumb();
		});

		observer.observe(scrollerRef.current);

		return () => {
			observer.disconnect();
		};
	}, [calculateThumbWidth, repositionThumb]);

	const handleThumbPress = (event: React.MouseEvent | React.TouchEvent) => {
		event.preventDefault();

		setIsDraggingThumb(true);

		if (event.type === 'mousedown' && 'button' in event && event.button === 0) {
			mousePos.current = { x: event.pageX, y: event.pageY };
		} else if (event.type === 'touchstart' && 'touches' in event) {
			mousePos.current = {
				x: event.touches[0].pageX,
				y: event.touches[0].pageY,
			};
		}
	};

	const handleThumbMove = useCallback(
		(event: Event | React.MouseEvent | React.TouchEvent) => {
			if (!scrollerRef?.current) {
				return;
			}

			let pageX = 'pageX' in event ? event.pageX : null;
			let pageY = 'pageY' in event ? event.pageY : null;
			const touches = 'touches' in event ? event.touches : null;

			if (isDraggingThumb) {
				pageX = touches ? touches[0].pageX : pageX;
				pageY = touches ? touches[0].pageY : pageY;

				if (pageX === null || pageY === null) return;

				// Calculate the movement direction
				const deltaX = pageX - mousePos.current.x;
				const deltaY = pageY - mousePos.current.y;

				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					// If horizontal movement is greater than vertical, prevent vertical scrolling
					event.preventDefault();

					scrollerRef.current.scrollLeft =
						scrollerRef.current.scrollLeft + deltaX / thumbWidthRatio;
					mousePos.current.x = pageX;
				}

				// Update the current Y position to prevent unwanted vertical scrolling
				mousePos.current.y = pageY;
			}
		},
		[isDraggingThumb, thumbWidthRatio]
	);

	const handleThumbRelease = useCallback(() => {
		if (isDraggingThumb) {
			setIsDraggingThumb(false);
		}
	}, [isDraggingThumb]);

	useEffect(() => {
		if (isDraggingThumb) {
			document.addEventListener('mousemove', handleThumbMove);
			document.addEventListener('mouseup', handleThumbRelease);
			document.addEventListener('touchmove', handleThumbMove);
			document.addEventListener('touchend', handleThumbRelease);
		} else {
			document.removeEventListener('mousemove', handleThumbMove);
			document.removeEventListener('mouseup', handleThumbRelease);
			document.removeEventListener('touchmove', handleThumbMove);
			document.removeEventListener('touchend', handleThumbRelease);
		}

		return () => {
			document.removeEventListener('mousemove', handleThumbMove);
			document.removeEventListener('mouseup', handleThumbRelease);
			document.removeEventListener('touchmove', handleThumbMove);
			document.removeEventListener('touchend', handleThumbRelease);
		};
	}, [handleThumbMove, handleThumbRelease, isDraggingThumb]);

	const handleButtonClick = (direction: 'left' | 'right') => {
		// Windows and keyboard left/right generally moves 40px, but it can change based on some ratio. Let's just keep it simple for now
		const scrollAmount = direction === 'left' ? -40 : 40;

		if (scrollerRef.current) {
			scrollerRef.current.scrollLeft += scrollAmount;
		}

		if (buttonIntervalId) {
			clearInterval(buttonIntervalId);
			setButtonIntervalId(null);
		}
	};

	const handleButtonPress = (
		event: React.MouseEvent | React.TouchEvent,
		direction: 'left' | 'right'
	) => {
		// Windows and keyboard left/right generally moves 40px, but it can change based on some ratio. Let's just keep it simple for now
		const scrollAmount = direction === 'left' ? -40 : 40;

		const intervalId = window.setInterval(() => {
			if (
				scrollerRef.current &&
				(event.type === 'touchstart' ||
					(event.type === 'mousedown' &&
						'button' in event &&
						event.button === 0))
			) {
				scrollerRef.current.scrollLeft += scrollAmount;
			}
		}, 100);

		setButtonIntervalId(intervalId);
	};

	const handleButtonRelease = () => {
		if (buttonIntervalId) {
			clearInterval(buttonIntervalId);
			setButtonIntervalId(null);
		}
	};

	const handleTrackClick = (event: React.MouseEvent) => {
		if (!scrollerRef?.current || !thumbRef?.current) {
			return;
		}

		const thumbDimensions = thumbRef.current.getBoundingClientRect();

		if (event.pageX > thumbDimensions.right) {
			scrollerRef.current.scrollLeft += thumbDimensions.width * 0.95;
		} else if (event.pageX < thumbDimensions.left) {
			scrollerRef.current.scrollLeft -= thumbDimensions.width * 0.95;
		}
	};

	const hasScroll = thumbWidthRatio !== 1;

	useEffect(() => {
		let ariaLabel: string | null | undefined;
		const captionEl = scrollerRef.current?.querySelector('caption');

		if (captionEl) {
			ariaLabel = captionEl?.textContent;
		} else {
			const ariaLabelledbyTableEl = scrollerRef.current?.querySelector(
				'table[aria-labelledby]'
			);

			if (ariaLabelledbyTableEl) {
				ariaLabel = document.getElementById(
					ariaLabelledbyTableEl.getAttribute('aria-labelledby') || ''
				)?.textContent;
			}
		}

		setScrollerAriaLabel(`Table ${ariaLabel || ''}`);
	}, []);

	return (
		<Stack
			css={{
				position: 'relative',
				width: '100%',
			}}
			gap={0.5}
		>
			<Box
				aria-label={scrollerAriaLabel}
				as="section"
				css={{
					msOverflowStyle: 'none',
					overflowX: 'auto',
					overscrollBehaviorX: 'none',
					scrollbarWidth: 'none',
					WebkitOverflowScrolling: 'touch',
					width: '100%',
					'&::-webkit-scrollbar, &::-webkit-scrollbar-thumb, &::-webkit-scrollbar-track':
						{
							display: 'none',
						},
				}}
				focusRingFor="keyboard"
				onScroll={repositionThumb}
				ref={scrollerRef}
				tabIndex={hasScroll ? 0 : -1}
			>
				{children}
				<Shadow
					edge="left"
					height={shadowHeight}
					isVisible={Boolean(
						thumbWidthRatio < 1 &&
							scrollerRef?.current?.scrollLeft &&
							scrollerRef.current.scrollLeft > 0
					)}
				/>
				<Shadow
					edge="right"
					height={shadowHeight}
					isVisible={Boolean(
						thumbWidthRatio < 1 &&
							scrollerRef?.current?.offsetWidth &&
							Math.ceil(
								scrollerRef.current.scrollLeft + scrollerRef.current.offsetWidth
							) < scrollerRef.current.scrollWidth
					)}
				/>
			</Box>
			<Flex
				alignItems="center"
				background="body"
				css={{
					bottom: 0,
					display: hasScroll ? undefined : 'none',
					left: 0,
					position: 'sticky',
					right: 0,
				}}
				flexWrap="nowrap"
				gap={0.25}
			>
				<Box
					aria-hidden
					as="button"
					css={{
						appearance: 'none',
						background: 'none',
						cursor: 'default',
						height: pxToRem(24),
						width: pxToRem(24),
					}}
					onClick={() => handleButtonClick('left')}
					onMouseDown={(event: React.MouseEvent) =>
						handleButtonPress(event, 'left')
					}
					onMouseLeave={handleButtonRelease}
					onMouseUp={handleButtonRelease}
					onTouchEnd={handleButtonRelease}
					onTouchStart={(event: React.TouchEvent) =>
						handleButtonPress(event, 'left')
					}
					tabIndex={-1}
					type="button"
				>
					<ScrollbarArrowLeftIcon color="border" />
				</Box>
				<Box
					aria-hidden
					background="shade"
					border
					css={{
						borderRadius: 999,
						height: pxToRem(12),
						padding: 0,
						position: 'relative',
						flexGrow: 1,
					}}
					onClick={handleTrackClick}
					ref={trackRef}
					tabIndex={-1}
				>
					<Box
						aria-hidden
						as="button"
						css={{
							appearance: 'none',
							background: boxPalette.border,
							border: 'none',
							borderRadius: 999,
							bottom: 0,
							cursor: 'default',
							padding: 0,
							position: 'absolute',
							top: 0,
							touchAction: 'none', // Prevent default touch actions
							// See https://www.w3.org/TR/CSS21/ui.html#system-colors
							'@media (forced-colors: active)': {
								backgroundColor: 'CaptionText',
							},
						}}
						onMouseDown={handleThumbPress}
						onTouchStart={handleThumbPress}
						ref={thumbRef}
						style={{
							left: thumbPosition,
							width: `${thumbWidthRatio * 100}%`,
						}}
						tabIndex={-1}
						type="button"
					/>
				</Box>
				<Box
					aria-hidden
					as="button"
					css={{
						appearance: 'none',
						background: 'none',
						cursor: 'default',
						height: pxToRem(24),
						width: pxToRem(24),
					}}
					onClick={() => handleButtonClick('right')}
					onMouseDown={(event: React.MouseEvent) =>
						handleButtonPress(event, 'right')
					}
					onMouseLeave={handleButtonRelease}
					onMouseUp={handleButtonRelease}
					onTouchEnd={handleButtonRelease}
					onTouchStart={(event: React.TouchEvent) =>
						handleButtonPress(event, 'right')
					}
					tabIndex={-1}
					type="button"
				>
					<ScrollbarArrowRightIcon color="border" />
				</Box>
			</Flex>
		</Stack>
	);
}

function Shadow({
	edge,
	height,
	isVisible,
}: {
	edge: 'left' | 'right';
	height: number;
	isVisible: boolean;
}) {
	return (
		<Box
			css={{
				height,
				opacity: isVisible ? 1 : 0,
				pointerEvents: 'none',
				position: 'absolute',
				top: 0,
				transition: `opacity ${tokens.transition.duration}ms ${tokens.transition.timingFunction}`,
				width: 28,
				...(edge === 'left'
					? {
							background:
								'linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent)',
							left: 0,
					  }
					: {
							background:
								'linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent)',
							right: 0,
					  }),
			}}
		/>
	);
}

function pxToRem(px: number) {
	return `${px / 16}rem`;
}
