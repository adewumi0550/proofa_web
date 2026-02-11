"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { motion } from "framer-motion";
import { Search, ChevronRight, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/components/language-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserDropdown } from "@/components/dashboard/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CommunityCard } from "@/components/community/community-card";
import { CreatePost } from "@/components/community/create-post";
import { Feed } from "@/components/community/feed";
import { JoinCommunityModal } from "@/components/community/join-community-modal";

const COMMUNITY_CATEGORIES = [
    { id: "gen-art", name: "Generative Art", members: "12.4k", color: "from-blue-500 to-cyan-500", description: "Discuss Stable Diffusion, Midjourney, and DALL-E workflows." },
    { id: "legal-tech", name: "Legal Tech & IP", members: "3.2k", color: "from-purple-500 to-indigo-500", description: "AI in law, copyright issues, and regulatory compliance." },
    { id: "prompt-eng", name: "Prompt Engineering", members: "8.1k", color: "from-orange-500 to-red-500", description: "Master the art of prompting for LLMs and image generators." },
    { id: "video-synth", name: "Video Synthesis", members: "5.7k", color: "from-green-500 to-emerald-500", description: "Tools like Runway, Pika, and Sora." },
    { id: "ai-ethics", name: "AI Ethics", members: "2.1k", color: "from-pink-500 to-rose-500", description: "Responsible AI, bias mitigation, and safety." },
    { id: "model-tuning", name: "Model Tuning", members: "4.5k", color: "from-yellow-500 to-amber-500", description: "Fine-tuning LoRAs, Dreambooth, and local LLMs." },
];

export default function CommunitiesPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = React.useState(true);
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: {
                name: "Sarah Chen",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                handle: "@sarah_ai"
            },
            content: "Just discovered a new way to optimize Stable Diffusion XL prompts for photorealistic portraits. The key is in the negative prompt weighting! 🎨✨ #GenerativeAI #SDXL",
            timestamp: "2h ago",
            likes: 42,
            comments: 12,
            shares: 5,
            isPrivate: false,
            communityName: "Generative Art"
        },
        {
            id: 2,
            author: {
                name: "Alex Rivera",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                handle: "@arivera"
            },
            content: "Looking for collaborators on a new open-source legal LLM project. We're fine-tuning Llama 3 on case law. DM if interested! ⚖️",
            timestamp: "4h ago",
            likes: 28,
            comments: 8,
            shares: 14,
            isPrivate: true,
            communityName: "Legal Tech & IP"
        }
    ]);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handlePost = (postData: any) => {
        const newPost = {
            id: Date.now(),
            author: {
                name: user?.first_name || "You",
                avatar: user?.avatar_url || "https://github.com/shadcn.png",
                handle: "@you"
            },
            content: postData.content,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            shares: 0,
            isPrivate: postData.isPrivate,
            communityName: "General" // Default for now
        };
        setPosts([newPost, ...posts]);
    };

    const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState<{ id: string, name: string } | null>(null);
    const [isJoining, setIsJoining] = useState(false);

    const handleJoinClick = (id: string, name: string) => {
        if (joinedCommunities.includes(id)) {
            // Already joined - maybe confirm leave? For now, just toggle off
            setJoinedCommunities(prev => prev.filter(cId => cId !== id));
        } else {
            setSelectedCommunity({ id, name });
            setJoinModalOpen(true);
        }
    };

    const confirmJoin = async () => {
        if (!selectedCommunity) return;
        setIsJoining(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setJoinedCommunities(prev => [...prev, selectedCommunity.id]);
        setIsJoining(false);
        setJoinModalOpen(false);
        setSelectedCommunity(null);
    };

    return (
        <div className="flex-1 h-full overflow-y-auto bg-[#fbfbfb] dark:bg-[#090909] p-8 custom-scrollbar">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/dashboard" className="font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors">
                            {t('dashboard')}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>{t('communities')}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <UserDropdown />
                    </div>
                </header>

                {/* Hero / Search Section */}
                <div className="relative overflow-hidden rounded-[40px] bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                            Connect with the <span className="text-blue-600">Proofa Pioneer</span> Community
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg font-medium">
                            Join thousands of creators defining the future of certified AI workflows.
                        </p>

                        <div className="relative max-w-xl">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                placeholder={t('searchCommunities') || "Search communities..."}
                                className="pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Your Communities Section */}
                {joinedCommunities.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <Users className="w-6 h-6 text-green-500" /> Your Communities
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {COMMUNITY_CATEGORIES.filter(c => joinedCommunities.includes(c.id)).map((category) => (
                                <CommunityCard
                                    key={category.id}
                                    {...category}
                                    isMember={true}
                                    onJoinClick={handleJoinClick}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <TrendingUp className="w-6 h-6 text-blue-500" /> {t('trendingCommunities') || "Trending Communities"}
                        </h2>
                        <Button variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/10">View All</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm">
                                    <Skeleton className="w-12 h-12 rounded-2xl mb-6" />
                                    <Skeleton className="h-7 w-3/4 rounded-lg mb-2" />
                                    <div className="flex items-center justify-between mt-4">
                                        <Skeleton className="h-4 w-1/3 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-full" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            COMMUNITY_CATEGORIES.map((category, idx) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <CommunityCard
                                        {...category}
                                        isMember={joinedCommunities.includes(category.id)}
                                        onJoinClick={handleJoinClick}
                                    />
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Global Feed Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Discussions</h2>
                            <CreatePost onPost={handlePost} />
                            <div className="mt-8">
                                <Feed posts={posts} />
                            </div>
                        </div>
                    </div>
                </div>

                <JoinCommunityModal
                    isOpen={joinModalOpen}
                    onClose={() => setJoinModalOpen(false)}
                    onConfirm={confirmJoin}
                    communityName={selectedCommunity?.name || ""}
                    isLoading={isJoining}
                />
            </div>
        </div>
    );
}
