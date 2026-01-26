"use client";

import React from "react";
import { Sparkles, Heart, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-context";

export function ShowOffView() {
    const { t } = useLanguage();

    return (
        <div className="space-y-16">
            <div className="text-center max-w-4xl mx-auto pt-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6 border border-blue-500/20"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Community Showcase
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">Show Off</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium lowercase">Witness the pinnacle of AI-assisted creativity. Featured masterpieces from the PROOFA community.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                    { title: "Neon Samurai", author: "CyberArtist", likes: "1.2k", comments: "42", bg: "bg-purple-500/20", icon: "⚔️" },
                    { title: "Dreamy Clouds", author: "SkyGazer", likes: "890", comments: "15", bg: "bg-blue-500/20", icon: "☁️" },
                    { title: "Future City", author: "Urbanist", likes: "2.5k", comments: "128", bg: "bg-emerald-500/20", icon: "🏙️" },
                    { title: "Abstract Flow", author: "ZenMaster", likes: "640", comments: "8", bg: "bg-rose-500/20", icon: "🎨" },
                    { title: "Tech Noir", author: "HackerOne", likes: "1.1k", comments: "31", bg: "bg-slate-500/20", icon: "💻" },
                    { title: "Nature's Echo", author: "GreenThumb", likes: "950", comments: "22", bg: "bg-amber-500/20", icon: "🌿" }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-white dark:bg-[#111] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        <div className={`h-64 ${item.bg} flex items-center justify-center relative`}>
                            <span className="text-7xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">{item.icon}</span>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center text-white">
                                <div className="text-center">
                                    <div className="text-[10px] font-black tracking-widest uppercase mb-1">View Piece</div>
                                    <div className="w-8 h-0.5 bg-white mx-auto rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter truncate uppercase">{item.title}</h3>
                                <div className="flex gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                                    <div className="w-1 h-1 rounded-full bg-purple-500" />
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 mb-6 uppercase">By <span className="text-gray-900 dark:text-white">{item.author}</span></p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-white/5">
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                                        <Heart className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold">{item.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold">{item.comments}</span>
                                    </button>
                                </div>
                                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                    <Share2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="py-20 bg-blue-600 rounded-[3rem] text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 p-8">
                    <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight uppercase">Ready to Show Off?</h2>
                    <p className="text-blue-100 mb-8 max-w-sm mx-auto font-medium lowercase text-sm">Upload your best work and get featured in the community gallery.</p>
                    <Button size="lg" className="rounded-full bg-white text-blue-600 hover:bg-gray-100 font-black uppercase tracking-widest px-8 h-12 text-xs shadow-2xl">Submit Asset</Button>
                </div>
            </div>
        </div>
    );
}
