function App() {
	console.log("App component rendering...");

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				background:
					"linear-gradient(135deg, #6b2fbc 0%, #9d50e8 50%, #4f46e5 100%)",
				color: "white",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "Arial, sans-serif",
				zIndex: 10000,
			}}
		>
			<h1>🚀 React App Successfully Loaded!</h1>
			<p>Minimal App Component Test</p>
			<p>Timestamp: {new Date().toISOString()}</p>
			<p>Environment: {import.meta?.env?.MODE || "unknown"}</p>
			<div
				style={{
					marginTop: "20px",
					padding: "20px",
					background: "rgba(255,255,255,0.1)",
					borderRadius: "10px",
					textAlign: "center",
				}}
			>
				<h3>✅ Test Results:</h3>
				<p>✅ React is working</p>
				<p>✅ JSX is rendering</p>
				<p>✅ Styles are applied</p>
				<p>✅ JavaScript is executing</p>
			</div>
		</div>
	);
}

export default App;
