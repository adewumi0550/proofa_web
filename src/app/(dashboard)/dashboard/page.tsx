"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { proofaApi } from "@/lib/api";
import { useAuth } from "@/components/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-context";
import { useNewProject } from "@/components/new-project-context";
import { UserDropdown } from "@/components/dashboard/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { ModelGardenView } from "@/components/dashboard/model-garden-view";
import { ShowOffView } from "@/components/dashboard/show-off-view";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "overview";

    const [projects, setProjects] = useState<Array<{ id: string, name: string, updated_at?: string, current_score?: number }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user } = useAuth();
    const { t } = useLanguage();
    const { openNewProjectModal } = useNewProject();

    // Fetch Projects on Load with caching
    React.useEffect(() => {
        const fetchProjects = async () => {
            if (user?.access_token) {
                setIsLoading(true);
                // 1. Try to load from cache first for instant UI
                const cached = localStorage.getItem(`proofa_projects_${user.id}`);
                if (cached) {
                    try {
                        setProjects(JSON.parse(cached));
                        setIsLoading(false); // We have cache, don't show skeletons
                    } catch (e) {
                        console.error("Failed to parse cached projects", e);
                    }
                }

                try {
                    const res = await proofaApi.workspaces.list(user.access_token);
                    if (res.data.success && Array.isArray(res.data.data)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const newProjects = res.data.data.map((w: any) => ({
                            id: w.id,
                            name: w.name,
                            updated_at: w.updated_at,
                            current_score: w.current_score
                        }));
                        setProjects(newProjects);
                        // 2. Update cache
                        localStorage.setItem(`proofa_projects_${user.id}`, JSON.stringify(newProjects));
                    }
                } catch (error) {
                    console.error("Failed to fetch workspaces", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchProjects();
    }, [user?.access_token, user?.id]);

    function timeAgo(dateString?: string) {
        if (!dateString) return "Just now";
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    }

    // Use projects filtered by search query
    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SkeletonCard = () => (
        <div className="flex flex-col h-64 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-6">
            <div className="flex-1 flex items-center justify-center">
                <Skeleton className="w-20 h-20 rounded-2xl" />
            </div>
            <div className="space-y-3">
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <div className="flex justify-between">
                    <Skeleton className="h-3 w-1/4 rounded-lg" />
                    <Skeleton className="h-3 w-1/4 rounded-lg" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-[#fbfbfb] dark:bg-[#090909] transition-colors duration-500 overflow-hidden flex flex-col">
            {/* Clean, Neutral Background */}
            <div className="absolute inset-0 pointer-events-none z-0" />

            <main className="flex-1 flex flex-col min-w-0 relative h-full">

                {/* Top Header */}
                <header className="flex items-center justify-between mb-8 shrink-0 px-4 md:px-8 pt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
                        <span className="font-semibold text-gray-900 dark:text-gray-200 shrink-0">{t('dashboard')}</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                        <span className="truncate uppercase font-bold text-blue-500">{activeTab}</span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Collapsible Search */}
                        <div className="flex items-center relative">
                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="md:hidden p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Desktop Input / Mobile Expandable */}
                            <div className={`
                                ${isSearchOpen ? 'fixed inset-x-0 top-0 p-4 bg-white dark:bg-[#090909] z-[100] flex items-center gap-2 border-b dark:border-white/10' : 'hidden md:block'}
                                md:relative md:inset-auto md:p-0 md:bg-transparent md:border-0 md:flex
                            `}>
                                <div className="relative w-full">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        placeholder={activeTab === 'garden' ? t('searchPlaceholder') : t('searchProjects')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                        autoFocus={isSearchOpen}
                                    />
                                </div>
                                {isSearchOpen && (
                                    <button
                                        onClick={() => setIsSearchOpen(false)}
                                        className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-3 shrink-0">
                            <LanguageSwitcher />
                            <ThemeToggle />
                            <UserDropdown />
                        </div>
                    </div>
                </header>

                {/* Centered Workspace Area */}
                <div className="flex-1 relative min-h-0 overflow-y-auto custom-scrollbar">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto px-4 md:px-8 pb-20"
                    >
                        {activeTab === 'overview' && (
                            <>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{t('welcomeBack')}, {user?.first_name || "Creator"}</h1>
                                <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-10 max-w-2xl font-medium">Explore a curated collection of AI-powered creative assets. Join the community in the Modern Garden or showcase your latest masterpieces.</p>

                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white">{t('projects')}</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {/* New Project Card */}
                                    <button
                                        onClick={openNewProjectModal}
                                        className="group flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('newProject')}</h3>
                                        <p className="text-sm text-gray-500 mt-2">{t('startNewSeed')}</p>
                                    </button>

                                    {/* Skeletons while loading */}
                                    {isLoading && projects.length === 0 && (
                                        <>
                                            <SkeletonCard />
                                            <SkeletonCard />
                                            <SkeletonCard />
                                        </>
                                    )}

                                    {/* Recent Projects */}
                                    {filteredProjects.map((proj, idx) => (
                                        <Link href={`/workspace/${proj.id}`} key={idx}>
                                            <div className="group relative flex flex-col h-64 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer overflow-hidden text-left">
                                                <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide">
                                                    {t('inProgress')}
                                                </div>
                                                <div className="flex-1 flex items-center justify-center">
                                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center text-3xl">
                                                        🎨
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{proj.name}</h3>
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span>{timeAgo(proj.updated_at)}</span>
                                                        <span className="font-bold text-blue-500" >Score: {proj.current_score !== undefined ? Math.floor(proj.current_score) : 0}</span>
                                                    </div>
                                                </div>

                                                {/* Simple "Open" overlay */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                                    <Button variant="secondary" className="rounded-full">{t('openProject')}</Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === 'garden' && <ModelGardenView />}
                        {activeTab === 'showoff' && <ShowOffView />}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
