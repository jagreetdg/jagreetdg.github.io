import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { ButtonCta } from "../ui/button-shiny";
import { Input } from "../ui/input";
import { useComingSoonTranslations } from "../../context/LanguageContext";
import { cn } from "../../lib/utils";

interface RippleState {
	key: number;
	x: number;
	y: number;
	size: number;
	opacity: number;
}

type FormStatus = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
	onSubscribe?: (
		email: string
	) => Promise<{ success: boolean; error?: string }>;
	fadeInUp: {
		initial: { opacity: number; y: number };
		animate: { opacity: number; y: number };
	};
	scaleIn: {
		initial: { opacity: number; scale: number };
		animate: { opacity: number; scale: number };
	};
}

export const WaitlistForm = ({
	onSubscribe,
	fadeInUp,
	scaleIn,
}: WaitlistFormProps) => {
	const [formState, setFormState] = useState({
		email: "",
		status: "idle" as FormStatus,
		message: "",
	});
	const [clickRipples, setClickRipples] = useState<RippleState[]>([]);
	const t = useComingSoonTranslations();

	const isLoading = formState.status === "loading";

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

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
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
				const result = await onSubscribe(formState.email);

				if (!result.success) {
					setFormState((prev) => ({
						...prev,
						status: "error",
						message: result.error || t.errorMessage,
					}));
				} else {
					setFormState({
						email: "",
						status: "success",
						message: t.successMessage,
					});
				}
			} catch (error) {
				setFormState((prev) => ({
					...prev,
					status: "error",
					message: t.errorMessage,
				}));
			}
		},
		[formState.email, onSubscribe, t.errorMessage, t.successMessage]
	);

	return (
		<motion.div
			{...fadeInUp}
			transition={{ delay: 0.7, duration: 0.4 }}
			className="max-w-md mx-auto px-4 sm:px-6"
		>
			<AnimatePresence mode="wait">
				{formState.status === "success" ? (
					<motion.div
						key="success"
						{...scaleIn}
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
						className="space-y-6 sm:space-y-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div className="flex flex-col gap-6 sm:gap-8">
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
								className="w-full h-11 sm:h-12 bg-white/25 border-white/40 text-white placeholder:text-white/70 focus:border-purple-600 focus:ring-purple-600 text-sm sm:text-base px-3 sm:px-4"
								disabled={isLoading}
								required
							/>
							<div className="relative w-full max-w-80 mx-auto">
								<ButtonCta
									type="submit"
									disabled={isLoading}
									onClick={createClickRipple}
									className="w-full relative"
									label={t.joinWaitlist}
								/>

								{/* Loading state overlay */}
								{isLoading && (
									<div className="absolute inset-0 flex items-center justify-center z-20 bg-[#170928]/80 rounded-lg">
										<LoaderCircle className="animate-spin h-5 w-5 text-purple-300" />
									</div>
								)}

								{/* Arrow icon for non-loading state */}
								{!isLoading && (
									<div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
										<ArrowRight className="h-4 w-4 text-purple-300" />
									</div>
								)}

								{/* Click ripples */}
								<div className="absolute inset-0 pointer-events-none z-15 rounded-lg overflow-hidden">
									{clickRipples.map((ripple) => (
										<motion.div
											key={ripple.key}
											className="absolute rounded-full bg-purple-400/30"
											style={{
												left: ripple.x,
												top: ripple.y,
												width: ripple.size,
												height: ripple.size,
											}}
											initial={{ scale: 0, opacity: 0.4 }}
											animate={{ scale: 1, opacity: 0 }}
											transition={{ duration: 0.6, ease: "easeOut" }}
										/>
									))}
								</div>
							</div>
						</div>

						{formState.status === "error" && (
							<motion.p
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-red-400 text-center text-sm px-2"
							>
								{formState.message}
							</motion.p>
						)}
					</motion.form>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
