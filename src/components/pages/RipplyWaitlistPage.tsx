import React from "react";
import { motion } from "framer-motion";
import { BackgroundLayer } from "../background/BackgroundLayer";
import { HeroSection } from "../sections/HeroSection";
import { WaitlistForm } from "../sections/WaitlistForm";
import { Footer } from "../sections/Footer";
import { LanguageDropdown } from "../ui/language-switcher";
import { fadeInUp, scaleIn } from "../../utils/animations";

interface RipplyWaitlistPageProps {
	onSubscribe?: (
		email: string
	) => Promise<{ success: boolean; error?: string }>;
}

export const RipplyWaitlistPage = React.memo(function RipplyWaitlistPage({
	onSubscribe,
}: RipplyWaitlistPageProps) {
	return (
		<div
			className="min-h-screen relative overflow-hidden bg-black p-4 sm:p-6 lg:p-8"
			style={{ backgroundColor: "#000000" }}
		>
			{/* Layer 0: Background with waveform animation and ripples - now prominent */}
			<div className="opacity-80">
				<BackgroundLayer />
			</div>

			{/* Language switcher */}
			<div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
				<div className="border border-white/30 rounded-lg backdrop-blur-sm bg-white/10 text-xs">
					<LanguageDropdown className="text-xs" />
				</div>
			</div>

			{/* Layer 1: Main content - texts and buttons */}
			<div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
				<motion.div
					{...fadeInUp}
					transition={{ duration: 0.6 }}
					className="max-w-4xl mx-auto text-center w-full px-4 sm:px-6"
				>
					<HeroSection fadeInUp={fadeInUp} scaleIn={scaleIn} />
					<WaitlistForm
						onSubscribe={onSubscribe}
						fadeInUp={fadeInUp}
						scaleIn={scaleIn}
					/>
					<Footer fadeInUp={fadeInUp} />
				</motion.div>
			</div>
		</div>
	);
});
