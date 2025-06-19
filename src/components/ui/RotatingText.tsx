import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
	texts: string[];
	mainClassName?: string;
	staggerFrom?: "first" | "last";
	initial?: any;
	animate?: any;
	exit?: any;
	staggerDuration?: number;
	splitLevelClassName?: string;
	transition?: any;
	rotationInterval?: number;
	onAnimationComplete?: () => void;
	customRenderer?: (word: string) => React.ReactNode;
}

export default function RotatingText({
	texts,
	mainClassName = "",
	staggerFrom = "first",
	initial = { y: "100%" },
	animate = { y: 0 },
	exit = { y: "-120%" },
	staggerDuration = 0.025,
	splitLevelClassName = "",
	transition = { type: "spring", damping: 30, stiffness: 400 },
	rotationInterval = 2000,
	onAnimationComplete,
	customRenderer,
}: RotatingTextProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % texts.length);
		}, rotationInterval);

		return () => clearInterval(interval);
	}, [texts.length, rotationInterval]);

	useEffect(() => {
		if (onAnimationComplete) {
			const timer = setTimeout(() => {
				onAnimationComplete();
			}, 500); // Call after initial animation
			return () => clearTimeout(timer);
		}
	}, [onAnimationComplete]);

	const currentText = texts[currentIndex];

	// If customRenderer is provided and returns custom content, use it directly
	if (customRenderer) {
		const customContent = customRenderer(currentText);
		if (customContent && currentText.includes("Ripply")) {
			return (
				<div className={mainClassName}>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={initial}
							animate={animate}
							exit={exit}
							transition={transition}
						>
							{customContent}
						</motion.div>
					</AnimatePresence>
				</div>
			);
		}
	}

	// Default letter-by-letter animation for regular text
	const letters = currentText.split("");

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: staggerDuration,
				staggerDirection: staggerFrom === "last" ? -1 : 1,
			},
		},
		exit: {
			transition: {
				staggerChildren: staggerDuration,
				staggerDirection: staggerFrom === "last" ? -1 : 1,
			},
		},
	};

	const letterVariants = {
		hidden: initial,
		visible: {
			...animate,
			transition,
		},
		exit: {
			...exit,
			transition,
		},
	};

	return (
		<div className={`${mainClassName} w-full`}>
			<AnimatePresence mode="wait">
				<motion.div
					key={currentIndex}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="flex justify-center w-full"
				>
					{letters.map((letter, index) => (
						<div key={index} className={splitLevelClassName}>
							<motion.span variants={letterVariants} className="inline-block">
								{letter === " " ? "\u00A0" : letter}
							</motion.span>
						</div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
