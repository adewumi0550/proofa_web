"use client";

import React from "react";
import { useAuth } from "@/components/auth-context";
import { motion } from "framer-motion";
import { Search, Users, MessageSquare, Plus, ChevronRight, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/language-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserDropdown } from "@/components/dashboard/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommunitiesPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const communityCategories = [
        { name: "Generative Art", members: "12.4k", color: "from-blue-500 to-cyan-500" },
        { name: "Legal Tech & IP", members: "3.2k", color: "from-purple-500 to-indigo-500" },
        { name: "Prompt Engineering", members: "8.1k", color: "from-orange-500 to-red-500" },
        { name: "Video Synthesis", members: "5.7k", color: "from-green-500 to-emerald-500" },
        { name: "AI Ethics", members: "2.1k", color: "from-pink-500 to-rose-500" },
        { name: "Model Tuning", members: "4.5k", color: "from-yellow-500 to-amber-500" },
    ];

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
                            communityCategories.map((category, idx) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group cursor-pointer p-6 rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} mb-6 flex items-center justify-center text-white`}>
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-sm font-medium text-gray-500">{category.members} members</span>
                                        <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4">
                                            {t('joinCommunity') || "Join"}
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Discussion List Placeholder */}
                <div className="p-8 rounded-[32px] bg-gray-50/50 dark:bg-white/[0.02] border border-dashed border-gray-200 dark:border-white/10 text-center">
                    <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 mb-4">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start a Discussion</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto font-medium">Have a question or want to show off your latest certified workflow? Start a conversation with the community.</p>
                    <Button className="rounded-full bg-black dark:bg-white text-white dark:text-black font-bold h-12 px-8 gap-2">
                        <Plus className="w-5 h-5" /> New Post
                    </Button>
                </div>

            </div>
        </div>
    );
}
