"use client";

import React, { use } from "react";
import { useAuth } from "@/components/auth-context";
import { motion } from "framer-motion";
import { ChevronRight, Users, Trophy } from "lucide-react";
import { useLanguage } from "@/components/language-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserDropdown } from "@/components/dashboard/user-dropdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreatePost } from "@/components/community/create-post";
import { Feed } from "@/components/community/feed";

export default function CommunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const { t } = useLanguage();

    const [posts, setPosts] = React.useState<any[]>([
        {
            id: "1",
            author: {
                name: "Alice Chen",
                handle: "alice_c",
                avatar: "https://i.pravatar.cc/150?u=alice"
            },
            content: "Just experimented with the new Stable Diffusion XL model using Proofa's validation workflow. The consistency is mind-blowing! 🎨✨ \n\nCheck out this generation:",
            timestamp: "2 hours ago",
            likes: 42,
            comments: 5,
            isPrivate: false,
            hasNFT: true,
            coinAmount: 0,
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        },
        {
            id: "2",
            author: {
                name: "Bob Ross AI",
                handle: "bob_ai",
                avatar: "https://i.pravatar.cc/150?u=bob"
            },
            content: "Who else is working on legal document summarization? I've found that tweaking the temperature parameter really helps with accuracy. #LegalTech",
            timestamp: "5 hours ago",
            likes: 12,
            comments: 8,
            isPrivate: true,
            hasNFT: false,
            coinAmount: 100
        }
    ]);

    const handleCreatePost = (newPostData: any) => {
        const newPost = {
            id: Date.now().toString(),
            author: {
                name: user?.first_name ? `${user.first_name} ${user.last_name || ""}` : "You",
                handle: "you",
                avatar: user?.avatar_url
            },
            ...newPostData,
            likes: 0,
            comments: 0
        };
        setPosts([newPost, ...posts]);
    };

    // Mock data based on ID (In reel app, fetch from API)
    const communityInfo = {
        name: id === "gen-art" ? "Generative Art" :
            id === "legal-tech" ? "Legal Tech & IP" :
                id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), // Fallback formatter
        bgGradient: id === "gen-art" ? "from-blue-500 to-cyan-500" : "from-purple-500 to-indigo-500",
        description: "A community for creators pushing the boundaries of AI-generated art.",
        memberCount: "12.4k"
    };

    return (
        <div className="flex-1 h-full overflow-y-auto bg-[#fbfbfb] dark:bg-[#090909] custom-scrollbar">
            {/* Community Banner */}
            <div className={`relative h-64 bg-gradient-to-r ${communityInfo.bgGradient} flex items-end p-8`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex items-end justify-between w-full max-w-6xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-white dark:bg-[#111] shadow-xl flex items-center justify-center text-blue-600">
                            <Users className="w-10 h-10" />
                        </div>
                        <div className="text-white mb-2">
                            <h1 className="text-4xl font-black tracking-tight mb-2">{communityInfo.name}</h1>
                            <p className="text-white/80 font-medium text-lg">{communityInfo.description}</p>
                            <div className="flex items-center gap-4 mt-4 text-sm font-semibold">
                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {communityInfo.memberCount} Members</span>
                                <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> Top Rated</span>
                            </div>
                        </div>
                    </div>

                    <Button className="bg-white text-black hover:bg-gray-100 font-bold rounded-full px-8 h-12 shadow-lg">
                        Invite Friends
                    </Button>
                </div>
            </div>

            <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar (Navigation/Info) - Hidden on mobile */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 sticky top-8">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">About</h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Welcome to the {communityInfo.name} community. Please be respectful and follow our guidelines.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Created</span>
                                <span className="font-medium">Oct 2023</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Admins</span>
                                <span className="font-medium">@proofa_official</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Feed Area */}
                <div className="lg:col-span-6 space-y-6">
                    {/* Header Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Link href="/communities" className="hover:text-blue-500 transition-colors">Communities</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-semibold text-gray-900 dark:text-gray-200">{communityInfo.name}</span>
                    </div>

                    <CreatePost onPost={handleCreatePost} />
                    <Feed posts={posts} />
                </div>

                {/* Right Sidebar (Trending/Suggested) */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 sticky top-8">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Trending Topics</h3>
                        <div className="space-y-4">
                            {["#StableDiffusion", "#CopyrightLaw", "#PromptTips", "#workflow_v2"].map(tag => (
                                <div key={tag} className="flex items-center justify-between group cursor-pointer">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">{tag}</span>
                                    <span className="text-xs text-gray-400">1.2k posts</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
