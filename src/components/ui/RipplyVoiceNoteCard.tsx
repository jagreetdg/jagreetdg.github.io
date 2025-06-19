import React, { useMemo } from "react";
import { Play, Heart, MessageCircle, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComingSoonTranslations } from "../../context/LanguageContext";

export interface RipplyVoiceNoteCardProps {
	className?: string;
}

// Memoize the component to prevent unnecessary re-renders
export const RipplyVoiceNoteCard = React.memo(function RipplyVoiceNoteCard({
	className,
}: RipplyVoiceNoteCardProps) {
	const t = useComingSoonTranslations();

	// Random but consistent stats
	const stats = useMemo(
		() => ({
			likes: 847,
			comments: 129,
			reposts: 56,
			plays: 2341,
		}),
		[]
	);

	// Memoize formatted numbers to prevent recalculation
	const formattedStats = useMemo(
		() => ({
			likes:
				stats.likes > 999
					? `${(stats.likes / 1000).toFixed(1)}k`
					: stats.likes.toString(),
			comments:
				stats.comments > 999
					? `${(stats.comments / 1000).toFixed(1)}k`
					: stats.comments.toString(),
			reposts:
				stats.reposts > 999
					? `${(stats.reposts / 1000).toFixed(1)}k`
					: stats.reposts.toString(),
			plays:
				stats.plays > 999
					? `${(stats.plays / 1000).toFixed(1)}k`
					: stats.plays.toString(),
		}),
		[stats]
	);

	return (
		<div
			className={cn(
				"relative h-50 w-full max-w-md mx-auto select-none transition-all duration-700 pointer-events-none",
				className
			)}
		>
			{/* Container with Gradient Border and Transparent Background */}
			<div className="relative w-full h-full rounded-xl p-[2px] bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
				{/* Transparent Inner Card with Same Background Color as Page */}
				<div className="relative w-full h-full rounded-[10px] bg-black">
					<div className="relative w-full h-full flex flex-col justify-between rounded-[10px] text-white font-sans p-4">
						<div className="relative flex-grow flex flex-col justify-between">
							<div className="text-center">
								<div className="flex items-center justify-center gap-2 mb-2">
									<img
										src="/logo_transparent.png"
										alt="Ripply"
										className="w-6 h-6 rounded-full border border-white/30"
										loading="lazy"
									/>
									<div className="flex-1 min-w-0 text-left">
										<p className="text-sm font-bold text-white">Ripply</p>
										<p className="text-xs text-white/70">@ripplyapp</p>
									</div>
								</div>
								<div className="my-3">
									<h3 className="text-sm font-semibold leading-tight text-white">
										{t.description.replace("\n", " ")}
									</h3>
								</div>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="p-1 rounded-full bg-purple-500/40">
										<Play className="w-3 h-3 text-purple-200" />
									</div>
									<div className="w-full h-1 bg-white/20 rounded-full">
										<div
											className="h-1 bg-purple-400 rounded-full transition-all duration-300"
											style={{ width: "45%" }}
										></div>
									</div>
								</div>
								<div className="flex items-center justify-around w-full text-xs text-white/80">
									<div className="flex items-center gap-1">
										<Heart className="w-3 h-3" />
										<span>{formattedStats.likes}</span>
									</div>
									<div className="flex items-center gap-1">
										<MessageCircle className="w-3 h-3" />
										<span>{formattedStats.comments}</span>
									</div>
									<div className="flex items-center gap-1">
										<Play className="w-3 h-3" />
										<span>{formattedStats.plays}</span>
									</div>
									<div className="flex items-center gap-1">
										<Repeat className="w-3 h-3" />
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
