"use client";

import React from "react";

interface DisplayCardsProps {
	children: React.ReactNode[];
}

export default function DisplayCards({ children }: DisplayCardsProps) {
	const cardStyles = [
		// Back card
		"hover:-translate-y-6 sm:hover:-translate-y-8 md:hover:-translate-y-10",
		// Middle card
		"translate-x-6 translate-y-3 sm:translate-x-8 sm:translate-y-4 md:translate-x-10 md:translate-y-6 lg:translate-x-12 lg:translate-y-8 hover:-translate-y-1",
		// Front card
		"translate-x-12 translate-y-6 sm:translate-x-16 sm:translate-y-8 md:translate-x-20 md:translate-y-12 lg:translate-x-24 lg:translate-y-16 hover:translate-y-3 sm:hover:translate-y-4 md:hover:translate-y-6 lg:hover:translate-y-8",
	];

	return (
		<div className="relative grid [grid-template-areas:'stack'] place-items-center w-fit mx-auto">
			{React.Children.map(children, (child, index) => {
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
			})}
		</div>
	);
}
