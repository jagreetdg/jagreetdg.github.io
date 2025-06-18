"use client";

import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import {
	StaticVoiceNoteCard,
	type StaticVoiceNote,
} from "@/components/ui/StaticVoiceNoteCard";

const sampleVoiceNotes: StaticVoiceNote[] = [
	{
		id: "demo-1",
		title: "Quick Demo Note",
		user: {
			username: "demo_user",
			display_name: "Demo User",
			avatar_url:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 42,
		comments: 8,
		reposts: 3,
		plays: 156,
		backgroundImage:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "demo-2",
		title: "Another Demo",
		user: {
			username: "test_user",
			display_name: "Test User",
			avatar_url:
				"https://images.unsplash.com/photo-1494790108755-2616b612e668?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 89,
		comments: 12,
		reposts: 5,
		plays: 234,
		backgroundImage:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=320&h=180&fit=crop",
	},
];

const velocities = [3, -3];

function ScrollVelocityDemo() {
	return (
		<div className="w-full bg-purple-950 min-h-screen p-8">
			<h1 className="text-white text-2xl mb-8 text-center">
				ScrollVelocity Demo
			</h1>

			<div className="flex flex-col space-y-5 py-10">
				{/* Demo with voice note cards */}
				{velocities.map((v, index) => (
					<ScrollVelocity key={`cards-${index}`} velocity={v}>
						{sampleVoiceNotes.map((voiceNote) => (
							<div key={voiceNote.id} className="mr-6">
								<StaticVoiceNoteCard voiceNote={voiceNote} />
							</div>
						))}
					</ScrollVelocity>
				))}

				{/* Demo with text */}
				<ScrollVelocity velocity={5} className="text-purple-200">
					You can also use text with ScrollVelocity!
				</ScrollVelocity>
			</div>
		</div>
	);
}

export { ScrollVelocityDemo };
