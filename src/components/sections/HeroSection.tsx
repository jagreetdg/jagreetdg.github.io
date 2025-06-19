import { useState } from "react";
import { motion } from "framer-motion";
import RotatingText from "../ui/RotatingText";
import { RipplyVoiceNoteCard } from "../ui/RipplyVoiceNoteCard";
import { useComingSoonTranslations } from "../../context/LanguageContext";
import logoTransparent from "/logo_transparent.png";

interface HeroSectionProps {
	fadeInUp: {
		initial: { opacity: number; y: number };
		animate: { opacity: number; y: number };
	};
	scaleIn: {
		initial: { opacity: number; scale: number };
		animate: { opacity: number; scale: number };
	};
}

export const HeroSection = ({ fadeInUp, scaleIn }: HeroSectionProps) => {
	const t = useComingSoonTranslations();
	const [showDescription, setShowDescription] = useState(false);

	const handleSubtitleComplete = () => {
		console.log("Subtitle animation completed!");
		setShowDescription(true);
	};

	// Custom render function - now just returns regular text without logo
	const renderRotatingWord = (word: string) => {
		return <span>{word}</span>;
	};

	return (
		<>
			{/* Main Subtitle with Logo + RotatingText Animation */}
			<motion.div
				{...fadeInUp}
				transition={{ delay: 0.2, duration: 0.6 }}
				className="w-full min-w-[80%] max-w-full mx-auto mb-6 sm:mb-8"
			>
				<div
					className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-purple-100 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap"
					style={{
						fontFamily: "'Dancing Script', cursive",
						fontWeight: 800,
						lineHeight: 1.1,
					}}
				>
					<img
						src={logoTransparent}
						alt="Ripply Logo"
						className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex-shrink-0"
						loading="eager"
					/>
					<span className="flex-shrink-0">Your</span>
					<RotatingText
						texts={["Voice !", "Vibe !", "Ripply !"]}
						mainClassName="inline-block flex-shrink-0"
						staggerFrom="last"
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-120%" }}
						staggerDuration={0.05}
						splitLevelClassName="overflow-hidden"
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						rotationInterval={2500}
						onAnimationComplete={handleSubtitleComplete}
						customRenderer={renderRotatingWord}
					/>
				</div>
			</motion.div>

			{/* Voice Note Card with Description - appears after animation */}
			{showDescription && (
				<motion.div
					{...fadeInUp}
					transition={{ delay: 0.5, duration: 0.8 }}
					className="mb-8 mt-8"
				>
					<RipplyVoiceNoteCard />
				</motion.div>
			)}
		</>
	);
};
