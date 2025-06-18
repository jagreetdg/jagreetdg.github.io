import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Pre-warm the root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Optimize performance by removing StrictMode in production
if (import.meta.env.DEV) {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
} else {
	root.render(<App />);
}
