"use client";

import React from "react";
import { Search, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/language-context";

export function ModelGardenView() {
    const { t } = useLanguage();

    return (
        <div className="space-y-16">
            <div className="text-center max-w-4xl mx-auto pt-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest mb-6 border border-amber-500/20"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Discovery Hub
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">{t('modelGarden')}</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium lowercase">Explore a curated collection of AI-powered creative assets. Join the community in the Modern Garden or showcase your latest masterpieces.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                    <Search className="absolute left-6 top-6 h-6 w-6 text-gray-400 z-10" />
                    <Textarea
                        className="pl-16 pr-6 py-6 min-h-[120px] bg-white dark:bg-[#111] border-gray-100 dark:border-white/5 text-lg resize-y rounded-[2rem] shadow-2xl focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        placeholder={t('searchPlaceholder')}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                    { title: "Oceanic Whispers", tag: "Ambient", icon: "🌊", color: "from-blue-500/20 to-cyan-500/20", plays: "4.2k" },
                    { title: "Electric Dreams", tag: "Cyberpunk", icon: "⚡", color: "from-purple-500/20 to-pink-500/20", plays: "2.8k" },
                    { title: "Arboreal Echoes", tag: "Nature", icon: "🌲", color: "from-emerald-500/20 to-teal-500/20", plays: "1.5k" },
                    { title: "Solaris Flux", tag: "Astro", icon: "🌞", color: "from-orange-500/20 to-yellow-500/20", plays: "890" },
                    { title: "Neon Pulse", tag: "Retro", icon: "🎧", color: "from-rose-500/20 to-orange-500/20", plays: "6.1k" },
                    { title: "Digital Zen", tag: "Minimal", icon: "🎐", color: "from-gray-500/20 to-slate-500/20", plays: "3.2k" }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-[#111] rounded-[3rem] p-8 border border-gray-100 dark:border-white/5 relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
                    >
                        <div className="absolute top-8 right-8 z-10 flex flex-col gap-3">
                            <div className="px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white text-[9px] font-bold rounded-full border border-gray-100 dark:border-white/10 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                {item.plays} plays
                            </div>
                        </div>

                        <div className={`h-56 rounded-[2.5rem] bg-gradient-to-br ${item.color} mb-8 flex items-center justify-center relative overflow-hidden ring-1 ring-inset ring-white/10`}>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-5 text-white">
                                <Button variant="secondary" size="sm" className="rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl px-8 h-12">Collect Asset</Button>
                                <Link href="#" className="text-[10px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">Preview Details</Link>
                            </div>
                            <div className="text-7xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out">{item.icon}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">{item.tag}</div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter group-hover:text-blue-600 transition-colors uppercase leading-none">{item.title}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-50 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-[#111] shadow-lg" />
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-[#111] shadow-lg" />
                                </div>
                                <div className="text-[10px] font-bold text-gray-400">Created by <span className="text-gray-900 dark:text-white">ProCreators</span></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Certified</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
