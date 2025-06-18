import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BlurTextProps {
	text: string;
	delay?: number;
	animateBy?: "letters" | "words";
	direction?: "top" | "bottom" | "left" | "right";
	onAnimationComplete?: () => void;
	className?: string;
	style?: React.CSSProperties;
}

export default function BlurText({
	text,
	delay = 0,
	animateBy = "words",
	direction = "top",
	onAnimationComplete,
	className = "",
	style,
}: BlurTextProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	const getAnimationDirection = () => {
		switch (direction) {
			case "top":
				return { y: -30, x: 0 };
			case "bottom":
				return { y: 30, x: 0 };
			case "left":
				return { y: 0, x: -30 };
			case "right":
				return { y: 0, x: 30 };
			default:
				return { y: -30, x: 0 };
		}
	};

	const direction_offset = getAnimationDirection();

	const splitText = animateBy === "words" ? text.split(" ") : text.split("");

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			filter: "blur(15px)",
			...direction_offset,
		},
		visible: {
			opacity: 1,
			filter: "blur(0px)",
			y: 0,
			x: 0,
			transition: {
				duration: 1.2,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.div
			className={className}
			style={style}
			variants={containerVariants}
			initial="hidden"
			animate={isVisible ? "visible" : "hidden"}
			onAnimationComplete={onAnimationComplete}
		>
			{splitText.map((item, index) => (
				<motion.span
					key={index}
					variants={itemVariants}
					className="inline-block"
					style={{ marginRight: animateBy === "words" ? "0.25em" : "0" }}
				>
					{item}
					{animateBy === "words" && index < splitText.length - 1 && " "}
				</motion.span>
			))}
		</motion.div>
	);
}
