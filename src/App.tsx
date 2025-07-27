import { useCallback } from "react";
import { RipplyWaitlistPage } from "./components/pages/RipplyWaitlistPage";
import { LanguageProvider } from "./context/LanguageContext";
import { brevoService } from "./services/brevo";

function App() {
	const handleSubscribe = useCallback(async (email: string) => {
		const result = await brevoService.subscribeToWaitlist(email);
		// Return the result with the same interface expected by WaitlistForm
		return {
			success: result.success,
			error: result.error,
			errorType: result.errorType,
		};
	}, []);

	return (
		<LanguageProvider>
			<RipplyWaitlistPage onSubscribe={handleSubscribe} />
		</LanguageProvider>
	);
}

export default App;
