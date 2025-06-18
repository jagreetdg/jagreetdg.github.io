import { motion } from "framer-motion";

interface FooterProps {
	fadeInUp: {
		initial: { opacity: number; y: number };
		animate: { opacity: number; y: number };
	};
}

export const Footer = ({ fadeInUp }: FooterProps) => {
	return (
		<motion.footer
			{...fadeInUp}
			transition={{ delay: 0.8, duration: 0.4 }}
			className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10"
		>
			<div className="text-center space-y-2">
				<p className="text-xs sm:text-sm text-white/60">
					© {new Date().getFullYear()} Ripply. All rights reserved.
				</p>
				<p className="text-xs text-white/50">
					Developed by{" "}
					<span className="text-purple-300 font-medium">Vycera</span>
				</p>
			</div>
		</motion.footer>
	);
};
