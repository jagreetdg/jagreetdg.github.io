import React, { useMemo } from "react";
import { Play, Heart, MessageCircle, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

// This component is a high-fidelity, non-interactive web replica
// of the React Native VoiceNoteCard for the waitlist page.
// It's designed for visual representation only.

export interface StaticVoiceNote {
	id: string;
	title: string;
	user: {
		username: string;
		display_name: string;
		avatar_url: string | null;
	};
	likes: number;
	comments: number;
	reposts: number;
	plays: number;
	backgroundImage?: string;
}

export interface StaticVoiceNoteCardProps {
	voiceNote: StaticVoiceNote;
	className?: string;
	opacity?: number;
}

// Memoize the component to prevent unnecessary re-renders
export const StaticVoiceNoteCard = React.memo(function StaticVoiceNoteCard({
	voiceNote,
	className,
	opacity = 0.85,
}: StaticVoiceNoteCardProps) {
	// Memoize background style calculation
	const backgroundStyle = useMemo(
		() => ({
			...(voiceNote.backgroundImage
				? { backgroundImage: `url(${voiceNote.backgroundImage})` }
				: { backgroundColor: `rgba(20, 15, 35, 1)` }),
		}),
		[voiceNote.backgroundImage]
	);

	// Memoize formatted numbers to prevent recalculation
	const formattedStats = useMemo(
		() => ({
			likes:
				voiceNote.likes > 999
					? `${(voiceNote.likes / 1000).toFixed(1)}k`
					: voiceNote.likes.toString(),
			comments:
				voiceNote.comments > 999
					? `${(voiceNote.comments / 1000).toFixed(1)}k`
					: voiceNote.comments.toString(),
			reposts:
				voiceNote.reposts > 999
					? `${(voiceNote.reposts / 1000).toFixed(1)}k`
					: voiceNote.reposts.toString(),
			plays:
				voiceNote.plays > 999
					? `${(voiceNote.plays / 1000).toFixed(1)}k`
					: voiceNote.plays.toString(),
		}),
		[voiceNote.likes, voiceNote.comments, voiceNote.reposts, voiceNote.plays]
	);

	return (
		<div
			className={cn(
				"relative h-24 w-[12rem] sm:h-28 sm:w-[14rem] md:h-32 md:w-[16rem] lg:h-36 lg:w-[18rem] -skew-y-[8deg] select-none transition-all duration-700",
				className
			)}
		>
			<div className="relative w-full h-full rounded-xl bg-gradient-to-br from-purple-900 to-purple-1000 p-[1.5px] shadow-lg">
				<div className="w-full h-full rounded-[10.5px] bg-white/10 backdrop-blur-sm">
					<div
						className="relative w-full h-full flex flex-col justify-between rounded-[10.5px] text-white font-sans p-2 bg-cover bg-center"
						style={{ ...backgroundStyle, opacity }}
					>
						<div
							className="absolute inset-0 w-full h-full bg-black/60 rounded-[10.5px]"
							style={{ mixBlendMode: "multiply" }}
						></div>
						<div className="relative flex-grow flex flex-col justify-between">
							<div className="text-center">
								<div className="flex items-center justify-center gap-1.5">
									<img
										src={voiceNote.user.avatar_url || "/logo_transparent.png"}
										alt={voiceNote.user.display_name}
										className="w-5 h-5 rounded-full border border-white/20"
										loading="lazy" // Lazy load avatar images
										onError={(e) => {
											// Fallback to logo if avatar fails to load
											(e.target as HTMLImageElement).src =
												"/logo_transparent.png";
										}}
									/>
									<div className="flex-1 min-w-0 text-left">
										<p className="text-[10px] font-bold truncate">
											{voiceNote.user.display_name}
										</p>
										<p className="text-[9px] text-white/60 truncate">
											@{voiceNote.user.username}
										</p>
									</div>
								</div>
								<div className="my-1">
									<h3 className="text-[11px] font-semibold truncate leading-tight">
										{voiceNote.title}
									</h3>
								</div>
							</div>
							<div>
								<div className="flex items-center gap-1.5 mb-1">
									<div className="p-0.5 rounded-full bg-purple-500/30">
										<Play className="w-2 h-2 text-purple-200" />
									</div>
									<div className="w-full h-0.5 bg-white/10 rounded-full">
										<div
											className="h-0.5 bg-purple-400 rounded-full"
											style={{ width: "30%" }}
										></div>
									</div>
								</div>
								<div className="flex items-center justify-around w-full text-[9px] text-white/70">
									<div className="flex items-center gap-0.5">
										<Heart className="w-2 h-2" />
										<span>{formattedStats.likes}</span>
									</div>
									<div className="flex items-center gap-0.5">
										<MessageCircle className="w-2 h-2" />
										<span>{formattedStats.comments}</span>
									</div>
									<div className="flex items-center gap-0.5">
										<Play className="w-2 h-2" />
										<span>{formattedStats.plays}</span>
									</div>
									<div className="flex items-center gap-0.5">
										<Repeat className="w-2 h-2" />
										<span>{formattedStats.reposts}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
