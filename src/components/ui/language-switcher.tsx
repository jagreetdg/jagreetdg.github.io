import { Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Language } from "../../lib/i18n";

interface LanguageDropdownProps {
	className?: string;
}

export function LanguageDropdown({ className = "" }: LanguageDropdownProps) {
	const { language, setLanguage } = useLanguage();

	const languages = [
		{ code: "en", display: "EN" },
		{ code: "ja", display: "日本語" },
	];

	const current = languages.find((lang) => lang.code === language);
	const nextLanguage = languages.find((lang) => lang.code !== language);

	const handleClick = () => {
		if (nextLanguage) {
			setLanguage(nextLanguage.code as Language);
		}
	};

	return (
		<button
			onClick={handleClick}
			className={`flex items-center gap-1.5 px-2 py-1.5 bg-white/10 border border-white/20 rounded-md text-white text-xs hover:bg-white/15 transition-colors ${className}`}
		>
			<Globe className="w-3 h-3" />
			<span>{current?.display}</span>
		</button>
	);
}
