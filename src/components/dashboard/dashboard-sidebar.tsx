"use client";

import React, { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Settings, MessageSquare, LayoutDashboard, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-context";
import Image from "next/image";
import { useLanguage } from "@/components/language-context";

interface Project {
    id: string;
    name: string;
}

interface DashboardSidebarProps {
    showAddProject?: boolean;
    projects: Project[];
    activeProjectId?: string | null;
    onProjectSelect: (id: string) => void;
    onProjectRename?: (id: string, newName: string) => void;
}

export function DashboardSidebar({
    showAddProject = true, // Default to true as per ChatGPT style
    projects = [],
    activeProjectId,
    onProjectSelect,
    onProjectRename
}: DashboardSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false); // Expanded by default like ChatGPT
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 60 : 260 }}
            className="flex flex-col h-full bg-white dark:bg-[#0d0d0d] border-r border-gray-200 dark:border-white/5 relative shrink-0 transition-colors duration-300"
        >
            {/* Toggle Button - Floating or precise */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white transition-colors shadow-sm"
            >
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>

            {/* Header: Logo & New Chat */}
            <div className="p-3 pb-2 space-y-4">
                {/* Brand - Only visible when expanded usually, or icon when collapsed */}
                <div className={`flex items-center gap-2 pl-2 ${isCollapsed ? 'justify-center pl-0' : ''}`}>
                    <div className="relative w-8 h-8 shrink-0">
                        <Image src="/proofa.png" alt="Proofa Logo" fill className="object-contain" />
                    </div>
                    {!isCollapsed && <span className="font-bold text-gray-900 dark:text-white tracking-wide">PROOFA</span>}
                </div>

                <Button
                    onClick={() => window.location.href = '/dashboard'}
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

            {/* Scrollable Project/History List */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                {!isCollapsed && <div className="px-3 pb-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('recents')}</div>}
                {projects.map((project) => (
                    <button
                        key={project.id}
                        onClick={() => onProjectSelect(project.id)}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative
                            ${activeProjectId === project.id ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'}
                            ${isCollapsed ? 'justify-center px-0' : ''}
                        `}
                    >
                        <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
                        {!isCollapsed && (
                            <span className="truncate flex-1 text-left">{project.name}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Footer: User Profile */}
            <div className="p-3 border-t border-gray-200 dark:border-white/5 mt-auto">
                <button className={`
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
                </button>
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

