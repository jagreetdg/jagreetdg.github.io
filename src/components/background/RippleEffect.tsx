import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface RippleEffectProps {
	className?: string;
	color?: string;
	count?: number;
}

export const RippleEffect = React.memo(function RippleEffect({
	className,
	color = "#4C1D95",
	count = 3,
}: RippleEffectProps) {
	const rippleElements = useMemo(
		() =>
			Array.from({ length: count }).map((_, i) => (
				<motion.div
					key={i}
					className="absolute border-2 opacity-20"
					style={{
						borderColor: color,
						borderRadius: `${40 + i * 20}% ${60 - i * 10}% ${50 + i * 15}% ${
							45 - i * 5
						}%`,
					}}
					initial={{ scale: 0, opacity: 0.6, rotate: 0 }}
					animate={{
						scale: [0, 1, 2, 3],
						opacity: [0.6, 0.4, 0.2, 0],
						rotate: [0, 180, 360],
						borderRadius: [
							`${40 + i * 20}% ${60 - i * 10}% ${50 + i * 15}% ${45 - i * 5}%`,
							`${60 - i * 10}% ${40 + i * 20}% ${45 - i * 5}% ${50 + i * 15}%`,
							`${50 + i * 15}% ${45 - i * 5}% ${40 + i * 20}% ${60 - i * 10}%`,
							`${40 + i * 20}% ${60 - i * 10}% ${50 + i * 15}% ${45 - i * 5}%`,
						],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						delay: i * 1.3,
						ease: "easeInOut",
					}}
				/>
			)),
		[count, color]
	);

	return (
		<div className={cn("absolute inset-0 overflow-hidden", className)}>
			{rippleElements}
		</div>
	);
});
