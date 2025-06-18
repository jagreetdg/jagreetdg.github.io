import React from "react";
import { ScrollVelocity } from "./scroll-velocity";
import {
	StaticVoiceNoteCard,
	type StaticVoiceNote,
} from "./StaticVoiceNoteCard";

// Mock data for voice notes with varied content
const mockVoiceNotes: StaticVoiceNote[] = [
	{
		id: "1",
		title: "Morning Thoughts",
		user: {
			username: "alex_voice",
			display_name: "Alex Johnson",
			avatar_url:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 127,
		comments: 23,
		reposts: 8,
		plays: 456,
		backgroundImage:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "2",
		title: "Coding While Caffeinated",
		user: {
			username: "sarah_dev",
			display_name: "Sarah Chen",
			avatar_url:
				"https://images.unsplash.com/photo-1494790108755-2616b612e668?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 89,
		comments: 12,
		reposts: 15,
		plays: 234,
		backgroundImage:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "3",
		title: "Travel Stories",
		user: {
			username: "mike_wanderer",
			display_name: "Mike Torres",
			avatar_url:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 201,
		comments: 45,
		reposts: 32,
		plays: 678,
		backgroundImage:
			"https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "4",
		title: "Late Night Reflections",
		user: {
			username: "emma_thoughts",
			display_name: "Emma Wilson",
			avatar_url:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 156,
		comments: 28,
		reposts: 19,
		plays: 389,
		backgroundImage:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "5",
		title: "Music & Memories",
		user: {
			username: "david_beats",
			display_name: "David Kim",
			avatar_url:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 312,
		comments: 67,
		reposts: 41,
		plays: 892,
		backgroundImage:
			"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "6",
		title: "Startup Life",
		user: {
			username: "lisa_founder",
			display_name: "Lisa Park",
			avatar_url:
				"https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 98,
		comments: 15,
		reposts: 7,
		plays: 267,
		backgroundImage:
			"https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "7",
		title: "Weekend Vibes",
		user: {
			username: "james_chill",
			display_name: "James Brown",
			avatar_url:
				"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 187,
		comments: 34,
		reposts: 22,
		plays: 445,
		backgroundImage:
			"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "8",
		title: "Cooking Adventures",
		user: {
			username: "ana_chef",
			display_name: "Ana Rodriguez",
			avatar_url:
				"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 143,
		comments: 29,
		reposts: 11,
		plays: 356,
		backgroundImage:
			"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "9",
		title: "Gym Motivation",
		user: {
			username: "ryan_fit",
			display_name: "Ryan Johnson",
			avatar_url:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 76,
		comments: 18,
		reposts: 9,
		plays: 198,
		backgroundImage:
			"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=320&h=180&fit=crop",
	},
	{
		id: "10",
		title: "Art & Inspiration",
		user: {
			username: "zoe_artist",
			display_name: "Zoe Martinez",
			avatar_url:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop&crop=face",
		},
		likes: 234,
		comments: 41,
		reposts: 27,
		plays: 567,
		backgroundImage:
			"https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=320&h=180&fit=crop",
	},
];

interface VoiceNotesScrollProps {
	className?: string;
}

const VoiceNotesScroll: React.FC<VoiceNotesScrollProps> = ({ className }) => {
	// Create multiple rows with different velocities and spacing
	const velocities = [1.5, -2, 2.5, -1.8, 3, -2.3, 1.2];

	return (
		<div className={`w-full space-y-4 py-8 ${className}`}>
			{velocities.map((velocity, index) => (
				<div
					key={index}
					className="w-full"
					style={{
						transform: `translateY(${index * 40}px)`,
						marginTop: index > 0 ? "1rem" : "0",
					}}
				>
					<ScrollVelocity
						velocity={velocity}
						className="select-none"
						movable={true}
					>
						{mockVoiceNotes.map((voiceNote) => (
							<div key={`${index}-${voiceNote.id}`} className="mr-8">
								<StaticVoiceNoteCard voiceNote={voiceNote} opacity={0.95} />
							</div>
						))}
					</ScrollVelocity>
				</div>
			))}
		</div>
	);
};

export default VoiceNotesScroll;
