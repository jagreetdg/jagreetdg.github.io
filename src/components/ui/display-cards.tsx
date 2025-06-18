"use client";

import React, { useMemo } from "react";

interface DisplayCardsProps {
	children: React.ReactNode[];
}

// Memoize the component to prevent unnecessary re-renders
const DisplayCards = React.memo(function DisplayCards({
	children,
}: DisplayCardsProps) {
	// Memoize card styles to prevent recreation on every render
	const cardStyles = useMemo(
		() => [
			// Back card
			"-translate-x-6 sm:-translate-x-8 md:-translate-x-10 lg:-translate-x-12 hover:-translate-y-6 sm:hover:-translate-y-8 md:hover:-translate-y-10",
			// Middle card
			"translate-y-3 sm:translate-y-4 md:translate-y-6 lg:translate-y-8 hover:-translate-y-1",
			// Front card
			"translate-x-6 translate-y-6 sm:translate-x-8 sm:translate-y-8 md:translate-x-10 md:translate-y-12 lg:translate-x-12 lg:translate-y-16 hover:translate-y-3 sm:hover:translate-y-4 md:hover:translate-y-6 lg:hover:translate-y-8",
		],
		[]
	);

	// Memoize the processed children to prevent unnecessary processing
	const processedChildren = useMemo(
		() =>
			React.Children.map(children, (child, index) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child as React.ReactElement, {
						className: `${
							(child.props as any).className || ""
						} [grid-area:stack] transition-all duration-700 ${
							cardStyles[index % cardStyles.length]
						}`,
					});
				}
				return child;
			}),
		[children, cardStyles]
	);

	return (
		<div className="relative grid [grid-template-areas:'stack'] place-items-center">
			{processedChildren}
		</div>
	);
});

export default DisplayCards;
