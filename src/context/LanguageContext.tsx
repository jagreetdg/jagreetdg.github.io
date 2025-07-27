import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
	useCallback,
} from "react";
import {
	Language,
	Translations,
	getTranslations,
	isValidLanguage,
} from "../lib/i18n";
import { ErrorType } from "../services/brevo";

interface LanguageContextType {
	language: Language;
	setLanguage: (language: Language) => void;
	translations: Translations;
	t: Translations; // Shorthand for translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);

interface LanguageProviderProps {
	children: ReactNode;
}

export const LanguageProvider = React.memo(function LanguageProvider({
	children,
}: LanguageProviderProps) {
	const [language, setLanguageState] = useState<Language>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("ripply-language");
			if (stored && isValidLanguage(stored)) {
				return stored as Language;
			}
		}
		return "ja";
	});

	const translations = useMemo(() => getTranslations(language), [language]);

	const setLanguage = useCallback((newLanguage: Language) => {
		setLanguageState(newLanguage);
		if (typeof window !== "undefined") {
			localStorage.setItem("ripply-language", newLanguage);
		}
	}, []);

	const contextValue = useMemo(
		() => ({
			language,
			setLanguage,
			translations,
			t: translations, // Shorthand alias
		}),
		[language, setLanguage, translations]
	);

	return (
		<LanguageContext.Provider value={contextValue}>
			{children}
		</LanguageContext.Provider>
	);
});

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

export const useComingSoonTranslations = () => {
	const { translations } = useLanguage();
	return useMemo(() => translations.comingSoon, [translations.comingSoon]);
};

export const useVoiceNoteTranslations = () => {
	const { translations } = useLanguage();
	return useMemo(() => translations.voiceNotes, [translations.voiceNotes]);
};

// Utility function to translate error types to localized messages
export const useErrorTranslation = () => {
	const { translations } = useLanguage();

	return useCallback(
		(errorType: ErrorType): string => {
			switch (errorType) {
				case "invalidEmail":
					return translations.comingSoon.invalidEmailError;
				case "networkError":
					return translations.comingSoon.networkError;
				case "adBlockerError":
					return translations.comingSoon.adBlockerError;
				case "subscriptionError":
					return translations.comingSoon.subscriptionError;
				case "updateError":
					return translations.comingSoon.updateError;
				case "genericError":
				default:
					return translations.comingSoon.errorMessage;
			}
		},
		[translations.comingSoon]
	);
};
