import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "./button";
import { useLanguage } from "../../context/LanguageContext";
import { Language, getLanguageCode, i18nConfig } from "../../lib/i18n";

interface LanguageSwitcherProps {
	variant?: "default" | "ghost" | "outline";
	size?: "sm" | "lg" | "default" | "icon";
	className?: string;
	showGlobe?: boolean;
}

export function LanguageSwitcher({
	variant = "ghost",
	size = "sm",
	className = "",
	showGlobe = true,
}: LanguageSwitcherProps) {
	const { language, setLanguage } = useLanguage();

	const handleLanguageSwitch = () => {
		const currentIndex = i18nConfig.supportedLanguages.indexOf(language);
		const nextIndex = (currentIndex + 1) % i18nConfig.supportedLanguages.length;
		const nextLanguage = i18nConfig.supportedLanguages[nextIndex];
		setLanguage(nextLanguage);
	};

	const currentLanguageCode = getLanguageCode(language);

	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<Button
				variant={variant}
				size={size}
				onClick={handleLanguageSwitch}
				className={`text-white/80 hover:text-white hover:bg-white/10 border-white/20 transition-all duration-200 ${className}`}
			>
				{showGlobe && <Globe className="w-4 h-4 mr-2" />}
				{currentLanguageCode}
			</Button>
		</motion.div>
	);
}

// Alternative dropdown version for more languages
export function LanguageDropdown({ className = "" }: { className?: string }) {
	const { language, setLanguage } = useLanguage();

	return (
		<div className={`relative ${className}`}>
			<select
				value={language}
				onChange={(e) => setLanguage(e.target.value as Language)}
				className="bg-white/10 border border-white/20 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
			>
				<option value="en" className="bg-purple-900 text-white">
					English
				</option>
				<option value="ja" className="bg-purple-900 text-white">
					日本語
				</option>
			</select>
		</div>
	);
}
