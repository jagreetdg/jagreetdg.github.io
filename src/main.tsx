import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Add error handling for module loading
window.addEventListener("error", (event) => {
	console.error("Global error caught:", event.error);
	console.error("Error details:", {
		message: event.message,
		filename: event.filename,
		lineno: event.lineno,
		colno: event.colno,
		error: event.error,
	});
});

window.addEventListener("unhandledrejection", (event) => {
	console.error("Unhandled promise rejection:", event.reason);
});

try {
	console.log("Starting React app initialization...");
	console.log("Environment mode:", import.meta.env.MODE);

	// Pre-warm the root element
	const rootElement = document.getElementById("root");
	if (!rootElement) {
		throw new Error("Root element not found");
	}
	console.log("Root element found");

	console.log("Creating React root...");
	const root = createRoot(rootElement);
	console.log("React root created");

	console.log("Rendering app...");
	// Optimize performance by removing StrictMode in production
	if (import.meta.env.DEV) {
		console.log("Rendering in development mode");
		root.render(
			<StrictMode>
				<App />
			</StrictMode>
		);
	} else {
		console.log("Rendering in production mode");
		root.render(<App />);
	}

	console.log("App render call completed");

	// Mark as successfully loaded
	setTimeout(() => {
		console.log("Marking React as loaded");
		document.body.classList.add("react-loaded");
	}, 100);
} catch (error) {
	console.error("Error during React initialization:", error);
	console.error("Error stack:", error.stack);

	// Show error in the DOM
	const rootElement = document.getElementById("root");
	if (rootElement) {
		rootElement.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #ff0000; color: white; padding: 20px; font-family: Arial; overflow: auto; z-index: 10000;">
        <h1>❌ React Initialization Failed</h1>
        <h2>Error: ${error.message}</h2>
        <pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; overflow: auto; white-space: pre-wrap;">${
					error.stack
				}</pre>
        <p>Environment: ${import.meta?.env?.MODE || "unknown"}</p>
        <p>URL: ${window.location.href}</p>
      </div>
    `;
	}

	// Force hide loading screen even on error
	document.body.classList.add("react-loaded");
}
