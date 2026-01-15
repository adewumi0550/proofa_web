"use client";

import React, { useState } from "react";
import { Plus, ChevronRight, Folder, Shield, Settings, LogOut, Menu, X, LayoutDashboard, Briefcase, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    showAddProject = false,
    projects = [],
    activeProjectId,
    onProjectSelect,
    onProjectRename
}: DashboardSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
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
                    {!isCollapsed && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Collections</span>
                    )}
                </div>

                {showAddProject && (
                    <Button
                        onClick={() => window.location.href = '/dashboard'} // Simple reset for demo
                        className={`justify-start gap-4 h-12 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-2xl shadow-xl active:scale-95 transition-all w-full ${isCollapsed ? 'px-0 justify-center w-12 h-12' : ''}`}
                    >
                        <Plus className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap"
                            >
                                New Project
                            </motion.span>
                        )}
                    </Button>
                )}
            </div>

            {/* Project List Section */}
            <nav className="flex-1 space-y-3 overflow-y-auto custom-scrollbar p-4 pt-8">
                {projects.map((project) => (
                    <div key={project.id} className="relative group/item">
                        <button
                            onClick={() => {
                                if (editingId !== project.id) {
                                    onProjectSelect(project.id);
                                }
                            }}
                            onDoubleClick={() => {
                                if (!isCollapsed) {
                                    setEditingId(project.id);
                                    setEditValue(project.name);
                                }
                            }}
                            title={isCollapsed ? project.name : "Double click to rename"}
                            className={`
                                w-full flex items-center gap-4 p-4 rounded-2xl transition-all group border border-transparent
                                ${activeProjectId === project.id
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                                    : 'text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5'}
                                ${isCollapsed ? 'justify-center w-12 h-12 p-0 mx-auto' : ''}
                            `}
                        >
                            <LayoutDashboard className="w-5 h-5 shrink-0" />
                            {!isCollapsed && (
                                <div className="flex-1 flex items-center min-w-0">
                                    {editingId === project.id ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    onProjectRename?.(project.id, editValue);
                                                    setEditingId(null);
                                                } else if (e.key === 'Escape') {
                                                    setEditingId(null);
                                                }
                                            }}
                                            onBlur={() => {
                                                onProjectRename?.(project.id, editValue);
                                                setEditingId(null);
                                            }}
                                            className="w-full bg-white/10 border-none focus:ring-1 focus:ring-blue-500 rounded px-1 py-0.5 text-[12px] font-bold outline-none"
                                        />
                                    ) : (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex-1 font-bold text-[12px] whitespace-nowrap overflow-hidden text-ellipsis text-left"
                                        >
                                            {project.name}
                                        </motion.span>
                                    )}
                                </div>
                            )}
                        </button>
                    </div>
                ))}
            </nav>

            {/* Footer Section */}
            <div className="mt-auto p-4 border-t border-black/5 dark:border-white/5 items-center flex flex-col gap-4 pb-8">
                {!isCollapsed && (
                    <div className="w-full flex items-center justify-between px-2 mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">v1.1.2 Metal</span>
                        <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
                    </div>
                )}
            </div>
        </motion.aside>
    );
}
