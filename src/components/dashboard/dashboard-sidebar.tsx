"use client";

import React, { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Settings, MessageSquare, LayoutDashboard, UserCircle, LogOut, Sparkles, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { useNewProject } from "@/components/new-project-context";

import { proofaApi } from "@/lib/api";
import { useParams, useRouter, usePathname, useSearchParams } from "next/navigation";

export function DashboardSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [projects, setProjects] = useState<Array<{ id: string, name: string }>>([]);
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const { openNewProjectModal } = useNewProject();
    const params = useParams();
    const activeProjectId = params?.workspaceId as string;
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "overview";


    // Mobile Detection & Auto-collapse
    React.useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch Projects
    React.useEffect(() => {
        const fetchProjects = async () => {
            if (user?.access_token) {
                // Try cache first
                const cached = localStorage.getItem(`proofa_projects_${user.id}`);
                if (cached) {
                    try {
                        setProjects(JSON.parse(cached));
                    } catch (e) {
                        console.error("Failed to parse cached sidebar projects", e);
                    }
                }

                try {
                    const res = await proofaApi.workspaces.list(user.access_token);
                    if (res.data.success && Array.isArray(res.data.data)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const newProjects = res.data.data.map((w: any) => ({
                            id: w.id,
                            name: w.name
                        }));
                        setProjects(newProjects);
                        // Update cache
                        localStorage.setItem(`proofa_projects_${user.id}`, JSON.stringify(newProjects));
                    }
                } catch (error) {
                    console.error("Failed to fetch sidebar projects", error);
                }
            }
        };
        fetchProjects();
    }, [user?.access_token, user?.id]);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 60 : 260 }}
            className="flex flex-col h-full bg-white dark:bg-[#0d0d0d] border-r border-gray-200 dark:border-white/5 relative shrink-0 transition-colors duration-300"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-4 top-24 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 shadow-lg shadow-blue-500/40 transition-all scale-110 border-2 border-white dark:border-[#0d0d0d]"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Header: Logo & New Chat */}
            <div className="p-3 pb-2 space-y-4">
                <Link href="/dashboard" className={`flex items-center gap-2 pl-2 ${isCollapsed ? 'justify-center pl-0' : ''}`}>
                    <div className="relative w-8 h-8 shrink-0">
                        <Image src="/proofa.png" alt="Proofa Logo" fill className="object-contain" />
                    </div>
                    {!isCollapsed && <span className="font-bold text-gray-900 dark:text-white tracking-wide">PROOFA</span>}
                </Link>

                <Button
                    onClick={openNewProjectModal}
                    variant="outline"
                    className={`
                        w-full justify-start gap-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-all
                        ${isCollapsed ? 'px-0 justify-center h-10 w-10 border-0 rounded-full' : 'rounded-lg h-10'}
                    `}
                >
                    <Plus className="w-5 h-5 opacity-70" />
                    {!isCollapsed && <span className="text-sm font-medium">{t('newProject')}</span>}
                </Button>
            </div>

            {/* Navigation Sections */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                <Link
                    href="/dashboard"
                    className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative
                        ${(!activeProjectId && activeTab === 'overview' && pathname === '/dashboard') ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'}
                        ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                >
                    <LayoutDashboard className="w-4 h-4 shrink-0 opacity-70" />
                    {!isCollapsed && <span className="truncate flex-1 text-left">{t('dashboard')}</span>}
                </Link>

                <div className="pt-2 pb-1">
                    {!isCollapsed && <div className="px-3 pb-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t('discovery')}</div>}

                    <Link
                        href="/dashboard?tab=garden"
                        className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group relative
                            text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200
                            ${activeTab === 'garden' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : ''}
                            ${isCollapsed ? 'justify-center px-0' : ''}
                        `}
                    >
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            <Sparkles className="w-3.5 h-3.5 opacity-70 text-blue-500" />
                        </div>
                        {!isCollapsed && <span className="truncate flex-1 text-left">{t('modernGarden')}</span>}
                    </Link>

                    <Link
                        href="/dashboard?tab=showoff"
                        className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group relative
                            text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200
                            ${activeTab === 'showoff' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : ''}
                            ${isCollapsed ? 'justify-center px-0' : ''}
                        `}
                    >
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
                        </div>
                        {!isCollapsed && <span className="truncate flex-1 text-left">{t('showOff')}</span>}
                    </Link>

                    <Link
                        href="/communities"
                        className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group relative
                            text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200
                            ${pathname === '/communities' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : ''}
                            ${isCollapsed ? 'justify-center px-0' : ''}
                        `}
                    >
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            <Users className="w-3.5 h-3.5 opacity-70 text-purple-500" />
                        </div>
                        {!isCollapsed && <span className="truncate flex-1 text-left">{t('joinCommunities')}</span>}
                    </Link>

                    <Link
                        href="/subscriptions"
                        className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group relative
                            text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200
                            ${pathname === '/subscriptions' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : ''}
                            ${isCollapsed ? 'justify-center px-0' : ''}
                        `}
                    >
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            <CreditCard className="w-3.5 h-3.5 opacity-70 text-green-500" />
                        </div>
                        {!isCollapsed && <span className="truncate flex-1 text-left">{t('subscriptions')}</span>}
                    </Link>
                </div>

                <div className="my-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    {!isCollapsed && <div className="px-3 pb-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t('recents')}</div>}
                    {projects.slice(0, 5).map((project) => (
                        <Link
                            key={project.id}
                            href={`/workspace/${project.id}`}
                            className={`
                                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group relative
                                ${activeProjectId === project.id ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'}
                                ${isCollapsed ? 'justify-center px-0' : ''}
                            `}
                        >
                            <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
                            {!isCollapsed && (
                                <span className="truncate flex-1 text-left">{project.name}</span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Footer: User Profile */}
            <div className="p-3 border-t border-gray-200 dark:border-white/5 mt-auto">
                <Link href="/profile" className={`
                    w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 text-gray-900 dark:text-gray-300 transition-colors
                    ${isCollapsed ? 'justify-center' : ''}
                 `}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {user?.first_name?.charAt(0) || "U"}
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 text-left overflow-hidden">
                            <div className="text-sm font-medium truncate text-gray-900 dark:text-white">{user?.first_name || "User"}</div>
                            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                        </div>
                    )}
                </Link>
                {!isCollapsed && (
                    <div className="mt-1 px-1">
                        <button onClick={logout} className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-500 dark:hover:text-red-400 py-1 px-1 transition-colors w-full text-left">
                            <LogOut className="w-3 h-3" /> {t('signOut')}
                        </button>
                    </div>
                )}
            </div>
        </motion.aside>
    );
}
