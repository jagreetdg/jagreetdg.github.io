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

export function StaticVoiceNoteCard({
	voiceNote,
	className,
	opacity = 0.75,
}: StaticVoiceNoteCardProps) {
	const backgroundStyle = {
		...(voiceNote.backgroundImage
			? { backgroundImage: `url(${voiceNote.backgroundImage})` }
			: { backgroundColor: `rgba(20, 15, 35, ${opacity})` }),
	};

	return (
		<div
			className={cn(
				"relative h-24 w-[12rem] sm:h-28 sm:w-[14rem] md:h-32 md:w-[16rem] lg:h-36 lg:w-[18rem] -skew-y-[8deg] select-none rounded-xl border-2 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-white/20 hover:bg-white/10",
				className
			)}
		>
			<div
				className="relative w-full h-full flex flex-col justify-between rounded-md text-white font-sans p-2 bg-cover bg-center"
				style={backgroundStyle}
			>
				<div className="absolute inset-0 w-full h-full bg-black/80 rounded-md"></div>
				<div className="relative flex-grow flex flex-col justify-between">
					<div className="text-center">
						<div className="flex items-center justify-center gap-1.5">
							<img
								src={voiceNote.user.avatar_url || "/logo_transparent.png"}
								alt={voiceNote.user.display_name}
								className="w-5 h-5 rounded-full border border-white/20"
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
								<span>{voiceNote.likes}</span>
							</div>
							<div className="flex items-center gap-0.5">
								<MessageCircle className="w-2 h-2" />
								<span>{voiceNote.comments}</span>
							</div>
							<div className="flex items-center gap-0.5">
								<Play className="w-2 h-2" />
								<span>{voiceNote.plays}</span>
							</div>
							<div className="flex items-center gap-0.5">
								<Repeat className="w-2 h-2" />
								<span>{voiceNote.reposts}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
