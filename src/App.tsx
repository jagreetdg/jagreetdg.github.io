import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
	useComingSoonTranslations,
	LanguageProvider,
} from "./context/LanguageContext";
import logoTransparent from "/logo_transparent.png";
import { brevoService } from "./services/brevo";

interface RippleState {
	key: number;
	x: number;
	y: number;
	size: number;
	opacity: number;
}

interface RippleEffectProps {
	className?: string;
	color?: string;
	count?: number;
}

function RippleEffect({
	className,
	color = "#4C1D95",
	count = 3,
}: RippleEffectProps) {
	return (
		<div className={cn("absolute inset-0 overflow-hidden", className)}>
			{Array.from({ length: count }).map((_, i) => (
				<motion.div
					key={i}
					className="absolute border-2 opacity-20"
					style={{
						borderColor: color,
						borderRadius: `${40 + i * 20}% ${60 - i * 10}% ${50 + i * 15}% ${
							45 - i * 5
						}%`,
					}}
					initial={{ scale: 0, opacity: 0.6, rotate: 0 }}
					animate={{
						scale: [0, 1, 2, 3],
						opacity: [0.6, 0.4, 0.2, 0],
						rotate: [0, 180, 360],
						borderRadius: [
							`${40 + i * 20}% ${60 - i * 10}% ${50 + i * 15}% ${45 - i * 5}%`,
							`${60 - i * 10}% ${40 + i * 20}% ${45 - i * 5}% ${50 + i * 15}%`,
							`${50 + i * 15}% ${45 - i * 5}% ${40 + i * 20}% ${60 - i * 10}%`,
							`${40 + i * 20}% ${60 - i * 10}% ${50 + i * 15}% ${45 - i * 5}%`,
						],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						delay: i * 1.3,
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	);
}

interface WaveBackgroundProps {
	className?: string;
}

function WaveBackground({ className }: WaveBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width: number,
			height: number,
			imageData: ImageData,
			data: Uint8ClampedArray;
		const SCALE = 2;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			width = Math.floor(canvas.width / SCALE);
			height = Math.floor(canvas.height / SCALE);
			imageData = ctx.createImageData(width, height);
			data = imageData.data;
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		const startTime = Date.now();

		const SIN_TABLE = new Float32Array(1024);
		const COS_TABLE = new Float32Array(1024);
		for (let i = 0; i < 1024; i++) {
			const angle = (i / 1024) * Math.PI * 2;
			SIN_TABLE[i] = Math.sin(angle);
			COS_TABLE[i] = Math.cos(angle);
		}

		const fastSin = (x: number) => {
			const index =
				Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
			return SIN_TABLE[index];
		};

		const fastCos = (x: number) => {
			const index =
				Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
			return COS_TABLE[index];
		};

		const render = () => {
			const time = (Date.now() - startTime) * 0.001;

			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const centerX = width / 2;
					const centerY = height / 2;

					// Distance from center
					const dx = x - centerX;
					const dy = y - centerY;
					const distance = Math.sqrt(dx * dx + dy * dy);

					// Create connected wavy ripple effect from center
					const ripple1 = fastSin(distance * 0.12 - time * 2.5);
					const ripple2 = fastSin(distance * 0.08 - time * 1.8) * 0.7;
					const ripple3 = fastSin(distance * 0.05 - time * 1.2) * 0.4;

					// Add flowing wave connections
					const angle = Math.atan2(dy, dx);
					const flowingWave1 =
						fastSin(angle * 3 + distance * 0.06 + time * 0.8) * 0.4;
					const flowingWave2 =
						fastCos(angle * 6 - distance * 0.04 + time * 0.6) * 0.3;

					const combinedRipple =
						ripple1 + ripple2 + ripple3 + flowingWave1 + flowingWave2;

					// Add spiral-like angular variation for connectivity
					const spiralWave =
						fastSin(angle * 8 + distance * 0.08 + time * 0.4) * 0.35;

					const wave = combinedRipple + spiralWave;
					const intensity = 0.3 + 0.4 * wave;
					const baseVal = 0.08 + 0.12 * fastCos(distance * 0.01 + time * 0.3);
					const purpleAccent = 0.35 * fastSin(distance * 0.06 + time * 0.15);
					const redAccent = 0.25 * fastCos(distance * 0.05 + time * 0.12);
					const blueAccent = 0.3 * fastSin(distance * 0.04 + time * 0.1);

					const r =
						Math.max(
							0,
							Math.min(1, baseVal + purpleAccent * 0.8 + redAccent * 1.2)
						) * intensity;
					const g =
						Math.max(
							0,
							Math.min(1, baseVal + purpleAccent * 0.4 + blueAccent * 0.3)
						) * intensity;
					const b =
						Math.max(
							0,
							Math.min(1, baseVal + blueAccent * 1.4 + purpleAccent * 1.0)
						) * intensity;

					const index = (y * width + x) * 4;
					data[index] = r * 255;
					data[index + 1] = g * 255;
					data[index + 2] = b * 255;
					data[index + 3] = 255;
				}
			}

			ctx.putImageData(imageData, 0, 0);
			if (SCALE > 1) {
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(
					canvas,
					0,
					0,
					width,
					height,
					0,
					0,
					canvas.width,
					canvas.height
				);
			}

			requestAnimationFrame(render);
		};

		render();

		return () => window.removeEventListener("resize", resizeCanvas);
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={cn("absolute inset-0 w-full h-full", className)}
		/>
	);
}

type FormStatus = "idle" | "loading" | "success" | "error";

interface RipplyWaitlistPageProps {
	onSubscribe?: (
		email: string
	) => Promise<{ success: boolean; error?: string }>;
}

function RipplyWaitlistPage({ onSubscribe }: RipplyWaitlistPageProps) {
	const [formState, setFormState] = useState({
		email: "",
		status: "idle" as FormStatus,
		message: "",
	});
	const [clickRipples, setClickRipples] = useState<RippleState[]>([]);

	const isLoading = formState.status === "loading";
	const t = useComingSoonTranslations();

	const createClickRipple = useCallback((event: React.MouseEvent) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height) * 2;
		const x = event.clientX - rect.left - size / 2;
		const y = event.clientY - rect.top - size / 2;

		const newRipple: RippleState = {
			key: Date.now(),
			x,
			y,
			size,
			opacity: 0.3,
		};

		setClickRipples((prev) => [...prev, newRipple]);

		setTimeout(() => {
			setClickRipples((current) =>
				current.filter((r) => r.key !== newRipple.key)
			);
		}, 600);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!onSubscribe) {
			setFormState((prev) => ({
				...prev,
				status: "success",
				message: t.successMessage,
			}));
			return;
		}

		setFormState((prev) => ({ ...prev, status: "loading", message: "" }));

		try {
			console.log("About to call onSubscribe with email:", formState.email);
			const result = await onSubscribe(formState.email);
			console.log("onSubscribe returned:", result);

			if (!result.success) {
				console.log("Subscription failed:", result.error);
				setFormState((prev) => ({
					...prev,
					status: "error",
					message: result.error || t.errorMessage,
				}));
			} else {
				console.log("Subscription successful!");
				setFormState({
					email: "",
					status: "success",
					message: t.successMessage,
				});
			}
		} catch (error) {
			console.error("Exception in handleSubmit:", error);
			setFormState((prev) => ({
				...prev,
				status: "error",
				message: t.errorMessage,
			}));
		}
	};

	return (
		<div
			className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 p-4 sm:p-6 lg:p-8"
			style={{ backgroundColor: "#1e0a3e" }}
		>
			<div className="opacity-90">
				<WaveBackground />
			</div>

			{/* Subtle animated ripple effects */}
			<div className="absolute inset-0 pointer-events-none opacity-15">
				<RippleEffect count={2} color="#4338CA" />
				<div className="absolute top-1/3 left-1/5 w-32 h-32 opacity-30">
					<RippleEffect count={1} color="#6D28D9" />
				</div>
				<div className="absolute bottom-1/4 right-1/5 w-24 h-24 opacity-25">
					<RippleEffect count={1} color="#5B21B6" />
				</div>
			</div>

			{/* Language switcher */}
			<div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
				<div className="border border-white/30 rounded-lg backdrop-blur-sm bg-white/10">
					<LanguageSwitcher />
				</div>
			</div>

			{/* Main content */}
			<div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto text-center w-full px-4 sm:px-6"
				>
					{/* Logo/Title */}
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="mb-6 sm:mb-8 w-full"
					>
						<div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 w-full -ml-0.5 sm:-ml-1">
							<img
								src={logoTransparent}
								alt="Ripply Logo"
								className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
							/>
							<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-none">
								{t.title}
							</h1>
						</div>
						<div className="flex justify-center w-full">
							<div className="w-32 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-0.5 sm:h-1 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 rounded-full" />
						</div>
					</motion.div>

					{/* Subtitle */}
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-100 mb-4 sm:mb-6 px-2"
						style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
					>
						{t.subtitle}
					</motion.h2>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-200 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2"
					>
						{t.description}
					</motion.p>

					{/* Coming Soon Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.8, duration: 0.6 }}
						className="inline-block mb-6 sm:mb-8"
					>
						<span className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-purple-700 to-indigo-700 bg-opacity-80 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
							{t.comingSoon}
						</span>
					</motion.div>

					{/* Features */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.0, duration: 0.6 }}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
					>
						{t.features.map((feature, index) => (
							<motion.div
								key={feature}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
								className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20"
							>
								<p className="text-white/90 text-xs sm:text-sm leading-relaxed">
									{feature}
								</p>
							</motion.div>
						))}
					</motion.div>

					{/* Waitlist Form */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.4, duration: 0.6 }}
						className="max-w-md mx-auto px-4 sm:px-6"
					>
						<AnimatePresence mode="wait">
							{formState.status === "success" ? (
								<motion.div
									key="success"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									className="text-center"
								>
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<p className="text-white text-base sm:text-lg font-medium px-2">
										{t.successMessage}
									</p>
								</motion.div>
							) : (
								<motion.form
									key="form"
									onSubmit={handleSubmit}
									className="space-y-3 sm:space-y-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<div className="flex flex-col gap-3 sm:gap-3">
										<Input
											type="email"
											value={formState.email}
											onChange={(e) =>
												setFormState((prev) => ({
													...prev,
													email: e.target.value,
												}))
											}
											placeholder={t.emailPlaceholder}
											className="w-full h-11 sm:h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-600 focus:ring-purple-600 text-sm sm:text-base px-3 sm:px-4"
											disabled={isLoading}
											required
										/>
										<Button
											type="submit"
											disabled={isLoading}
											onClick={createClickRipple}
											className="relative overflow-hidden bg-gradient-to-r from-purple-800/70 to-indigo-800/70 hover:from-purple-900/80 hover:to-indigo-900/80 text-white border-0 w-full max-w-60 h-11 sm:h-12 font-medium transition-all duration-200 text-sm sm:text-base rounded-lg backdrop-blur-sm mx-auto"
										>
											<span
												className={cn(
													"flex items-center justify-center",
													isLoading && "text-transparent"
												)}
											>
												{t.joinWaitlist}
												<ArrowRight className="ml-2 h-4 w-4" />
											</span>
											{isLoading && (
												<div className="absolute inset-0 flex items-center justify-center">
													<LoaderCircle className="animate-spin h-4 w-4" />
												</div>
											)}

											{/* Click ripples */}
											<div className="absolute inset-0 pointer-events-none">
												{clickRipples.map((ripple) => (
													<motion.div
														key={ripple.key}
														className="absolute rounded-full bg-white"
														style={{
															left: ripple.x,
															top: ripple.y,
															width: ripple.size,
															height: ripple.size,
														}}
														initial={{ scale: 0, opacity: ripple.opacity }}
														animate={{ scale: 1, opacity: 0 }}
														transition={{ duration: 0.6, ease: "easeOut" }}
													/>
												))}
											</div>
										</Button>
									</div>

									{formState.message && (
										<motion.p
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className={cn(
												"text-xs sm:text-sm text-center px-2",
												formState.status === "error"
													? "text-red-300"
													: "text-green-300"
											)}
										>
											{formState.message}
										</motion.p>
									)}
								</motion.form>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}

function App() {
	const handleSubscribe = async (email: string) => {
		console.log("App.handleSubscribe called with:", email);
		const result = await brevoService.subscribeToWaitlist(email);
		console.log("App.handleSubscribe result:", result);
		return result;
	};

	return (
		<LanguageProvider>
			<RipplyWaitlistPage onSubscribe={handleSubscribe} />
		</LanguageProvider>
	);
}

export default App;
