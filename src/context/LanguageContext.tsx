import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	Language,
	Translations,
	getTranslations,
	isValidLanguage,
	i18nConfig,
} from "../lib/i18n";

interface LanguageContextType {
	language: Language;
	setLanguage: (language: Language) => void;
	translations: Translations;
	t: Translations; // Shorthand for translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);

const LANGUAGE_STORAGE_KEY = "ripply_language";

interface LanguageProviderProps {
	children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
	const [language, setLanguageState] = useState<Language>(
		i18nConfig.defaultLanguage
	);

	// Load saved language on mount
	useEffect(() => {
		const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (savedLanguage && isValidLanguage(savedLanguage)) {
			setLanguageState(savedLanguage);
		}
	}, []);

	const setLanguage = (newLanguage: Language) => {
		try {
			localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
		} catch (error) {
			console.warn("Failed to save language:", error);
		}
		setLanguageState(newLanguage);
	};

	const translations = getTranslations(language);

	const value: LanguageContextType = {
		language,
		setLanguage,
		translations,
		t: translations, // Shorthand
	};

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

// Hook specifically for coming soon page
export function useComingSoonTranslations() {
	const { translations } = useLanguage();
	return translations.comingSoon;
}

// Hook for voice note card translations
export function useVoiceNoteTranslations() {
	const { translations } = useLanguage();
	return translations.voiceNotes;
}
