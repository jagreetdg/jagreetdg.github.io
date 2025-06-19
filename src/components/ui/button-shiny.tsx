import * as React from "react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	className?: string;
	children?: React.ReactNode;
}

function ButtonCta({
	label = "Get Access",
	className,
	children,
	...props
}: ButtonCtaProps) {
	return (
		<Button
			variant="ghost"
			className={cn(
				"group relative w-3/5 h-12 px-6 rounded-lg overflow-hidden transition-all duration-500 !border-0 !outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 focus-visible:!ring-offset-0",
				className
			)}
			{...props}
		>
			<div className="absolute inset-0 rounded-lg bg-gradient-to-b from-purple-400/30 via-purple-600/20 to-purple-800/30">
				<div className="absolute inset-0 bg-purple-900/20 rounded-lg" />
			</div>

			<div className="absolute inset-[1px] bg-purple-900/30 rounded-lg" />

			<div className="absolute inset-[1px] bg-gradient-to-r from-purple-800/20 via-purple-600/30 to-purple-800/20 rounded-lg" />
			<div className="absolute inset-[1px] bg-gradient-to-b from-purple-400/20 via-purple-700/30 to-purple-900/20 rounded-lg" />
			<div className="absolute inset-[1px] bg-gradient-to-br from-purple-300/15 via-purple-600/25 to-purple-800/30 rounded-lg" />

			<div className="absolute inset-[1px] shadow-[inset_0_0_20px_rgba(147,51,234,0.3)] rounded-lg" />

			<div className="absolute h-12 w-12 rounded-full bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 animate-shimmer blur-md opacity-60 group-hover:opacity-90 group-hover:scale-150 transition-all duration-500" />

			<div className="relative flex items-center justify-center gap-2">
				<span className="text-lg font-bold bg-gradient-to-b from-purple-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.5)] tracking-tighter group-hover:from-purple-100 group-hover:to-purple-200 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300">
					{label}
				</span>
			</div>

			<div className="absolute inset-[1px] opacity-0 transition-all duration-500 bg-gradient-to-br from-purple-600/40 via-purple-800/60 to-purple-900/50 group-hover:opacity-100 rounded-lg shadow-[inset_0_0_30px_rgba(88,28,135,0.6)]" />

			<div className="absolute inset-0 opacity-0 transition-all duration-500 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent group-hover:opacity-100 group-hover:animate-pulse rounded-lg" />

			{children}
		</Button>
	);
}

export { ButtonCta };
