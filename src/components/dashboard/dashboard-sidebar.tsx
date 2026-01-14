"use client";

import React, { useState } from "react";
import { Plus, ChevronRight, Folder, Shield, Settings, LogOut, Menu, X, LayoutDashboard, Briefcase, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: string;
    name: string;
    stage: "Inception" | "Collaboration" | "Certified";
    updatedAt: string;
}

interface DashboardSidebarProps {
    showAddProject?: boolean;
}

export function DashboardSidebar({ showAddProject = false }: DashboardSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const projects: Project[] = [
        { id: "1", name: "Cyberpunk Melody", stage: "Collaboration", updatedAt: "2h ago" },
        { id: "2", name: "Ethereal Landscape", stage: "Certified", updatedAt: "1d ago" },
        { id: "3", name: "Abstract Poem #4", stage: "Inception", updatedAt: "3d ago" },
    ];

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`flex flex-col h-full transition-all relative group crystal-view z-40 overflow-hidden`}
        >
            {/* Header Section */}
            <div className={`flex flex-col p-6 pb-2 ${isCollapsed ? 'items-center' : ''}`}>
                <div className="flex items-center justify-between mb-10">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {showAddProject && (
                    <Button
                        className={`justify-start gap-3 h-12 glass-button border-0 rounded-2xl shadow-xl active:scale-95 transition-all w-full ${isCollapsed ? 'px-0 justify-center w-12 h-12' : ''}`}
                    >
                        <Plus className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-sm whitespace-nowrap"
                            >
                                New Project
                            </motion.span>
                        )}
                    </Button>
                )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 space-y-4 overflow-y-auto custom-scrollbar p-4 pt-6">
                <SidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" href="/dashboard" isCollapsed={isCollapsed} active />
                <SidebarItem icon={<Briefcase className="w-5 h-5" />} label="Projects" href="/projects" isCollapsed={isCollapsed} />
                <SidebarItem icon={<Activity className="w-5 h-5" />} label="Analytics" href="/analytics" isCollapsed={isCollapsed} />
                <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" href="/settings" isCollapsed={isCollapsed} />
            </nav>

            {/* User Profile / Logout */}
            <div className="mt-auto p-4 border-t border-black/5 dark:border-white/5 items-center flex flex-col gap-4 pb-8">
                <button
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-black/40 dark:text-white/40 hover:text-red-500 transition-colors ${isCollapsed ? 'justify-center w-12 h-12 p-0' : ''}`}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[13px] font-bold"
                        >
                            Sign Out
                        </motion.span>
                    )}
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white/20 shadow-lg overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition-transform">
                    {/* User Avatar Placeholder */}
                </div>
            </div>
        </motion.aside>
    );
}

function SidebarItem({ icon, label, href, isCollapsed, active = false }: { icon: React.ReactNode, label: string, href: string, isCollapsed: boolean, active?: boolean }) {
    return (
        <Link
            href={href}
            title={isCollapsed ? label : ""}
            className={`
                w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all group
                ${active ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5'}
                ${isCollapsed ? 'justify-center w-12 h-12 p-0 mx-auto' : ''}
            `}
        >
            <span className="shrink-0">{icon}</span>
            {!isCollapsed && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 font-bold text-[13px] whitespace-nowrap"
                >
                    {label}
                </motion.span>
            )}
        </Link>
    );
}
