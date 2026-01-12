"use client";

import React from "react";
import { Plus, ChevronRight, Folder, Shield, Database, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
    id: string;
    name: string;
    stage: "Inception" | "Collaboration" | "Certified";
    updatedAt: string;
}

export function DashboardSidebar() {
    const projects: Project[] = [
        { id: "1", name: "Cyberpunk Melody", stage: "Collaboration", updatedAt: "2h ago" },
        { id: "2", name: "Ethereal Landscape", stage: "Certified", updatedAt: "1d ago" },
        { id: "3", name: "Abstract Poem #4", stage: "Inception", updatedAt: "3d ago" },
    ];

    return (
        <aside className="w-64 flex flex-col h-full border-r border-gray-200 dark:border-white/10 pr-6 shrink-0 group transition-all duration-300">
            <div className="mb-8">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Folder className="w-3 h-3" />
                    My Creations
                </h3>
                <Button className="w-full justify-start gap-3 h-11 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">New Project</span>
                </Button>
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-1">
                {projects.map((p) => (
                    <div
                        key={p.id}
                        className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10"
                    >
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{p.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`text-[9px] font-black uppercase tracking-widest ${p.stage === 'Certified' ? 'text-green-500' :
                                    p.stage === 'Collaboration' ? 'text-blue-500' : 'text-orange-500'
                                    }`}>
                                    {p.stage}
                                </span>
                                <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">• {p.updatedAt}</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-blue-500 transition-colors shrink-0" />
                    </div>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 space-y-1">
                <SidebarItem icon={<Shield className="w-4 h-4" />} label="Licensing" href="/licensing" />
                <SidebarItem icon={<Settings className="w-4 h-4" />} label="Settings" href="/settings" />
                <button className="w-full flex items-center gap-3 p-3 text-sm font-bold text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors mt-4">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

function SidebarItem({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
    return (
        <Link
            href={href}
            className="w-full flex items-center gap-3 p-3 text-sm font-bold text-gray-500 hover:text-blue-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/5"
        >
            <span className="shrink-0">{icon}</span>
            <span className="flex-1 text-left">{label}</span>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
        </Link>
    );
}
