import { useCallback } from "react";
import { RipplyWaitlistPage } from "./components/pages/RipplyWaitlistPage";
import { LanguageProvider } from "./context/LanguageContext";
import { brevoService } from "./services/brevo";

function App() {
	const handleSubscribe = useCallback(async (email: string) => {
		const result = await brevoService.subscribeToWaitlist(email);
		return result;
	}, []);

	return (
		<LanguageProvider>
			<RipplyWaitlistPage onSubscribe={handleSubscribe} />
		</LanguageProvider>
	);
}

export default App;
