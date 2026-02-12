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
                    {t('aiDiscoveryHub')}
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">{t('modelGarden')}</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium lowercase">{t('modelGardenDesc')}</p>
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
                    // Google Top-Tier
                    { title: "Veo 3", tag: "Video", icon: "🎥", color: "from-blue-600/20 to-indigo-600/20", plays: "1080p Native", badge: "New Arrival" },
                    { title: "Imagen 4", tag: "Image", icon: "🖼️", color: "from-blue-500/20 to-cyan-500/20", plays: "Photorealism", badge: "Google High-Fidelity" },
                    { title: "Gemini 3", tag: "Science", icon: "🔬", color: "from-purple-600/20 to-fuchsia-600/20", plays: "Deep Research", badge: "Study Anything" },
                    { title: "Gemini 2.5 Pro", tag: "Multimodal", icon: "✨", color: "from-blue-500/20 to-purple-500/20", plays: "High Performance" },
                    { title: "Gemini 2.5 Pro", tag: "Long Context", icon: "📚", color: "from-cyan-500/20 to-blue-500/20", plays: "2M Token Window" },
                    { title: "Gemma 3", tag: "Open Source", icon: "🔓", color: "from-emerald-500/20 to-green-500/20", plays: "Dev Choice", badge: "Community" },
                    { title: "Nano Banana Pro", tag: "Image", icon: "🍌", color: "from-yellow-400/20 to-orange-400/20", plays: "On-Device", badge: "Flash Image" },
                    { title: "Google Lyria", tag: "Music", icon: "🎼", color: "from-blue-500/20 to-cyan-500/20", plays: "DeepMind" },

                    // Music & Sound
                    { title: "Suno v5", tag: "Music", icon: "🎵", color: "from-pink-500/20 to-rose-500/20", plays: "Music & Sound", badge: "Top Rated" },
                    { title: "Udio Allegro v1.5", tag: "Music", icon: "🎹", color: "from-indigo-500/20 to-purple-500/20", plays: "Music & Sound" },
                    { title: "Stable Audio 2.5", tag: "Audio FX", icon: "🎧", color: "from-orange-500/20 to-red-500/20", plays: "Open Source" },

                    // Voice & Speech
                    { title: "ElevenLabs v3", tag: "Voice", icon: "🎙️", color: "from-emerald-500/20 to-teal-500/20", plays: "Voice Cloning" },
                    { title: "GPT-5.2 Voice", tag: "Voice", icon: "🗣️", color: "from-green-500/20 to-emerald-500/20", plays: "Real-time" },

                    // Image Generation
                    { title: "Flux 2 Max", tag: "Image", icon: "🎨", color: "from-yellow-500/20 to-amber-500/20", plays: "EU Choice", badge: "EU Standard" },
                    { title: "Midjourney v7", tag: "Image", icon: "🖌️", color: "from-purple-500/20 to-pink-500/20", plays: "Artistic" },
                    { title: "Firefly Image 4", tag: "Image", icon: "🔥", color: "from-red-500/20 to-orange-500/20", plays: "Commercial Safe" },

                    // Video Generation
                    { title: "Sora 2", tag: "Video", icon: "🎬", color: "from-teal-500/20 to-cyan-500/20", plays: "Cinematic" },
                    { title: "Runway Gen-4.5", tag: "Video", icon: "📼", color: "from-fuchsia-500/20 to-pink-500/20", plays: "Pro Camera" },

                    // Content & Code
                    { title: "Mistral Large 3", tag: "Text/Code", icon: "🇪🇺", color: "from-blue-400/20 to-blue-600/20", plays: "EU Choice", badge: "GDPR Compliant" },
                    { title: "Claude 4", tag: "Text/Code", icon: "🧠", color: "from-orange-500/20 to-amber-500/20", plays: "High Context" }
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
                            {item.badge && (
                                <div className="px-3 py-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] font-black rounded-full border border-amber-500/20 flex items-center gap-1">
                                    ★ {item.badge}
                                </div>
                            )}
                            <div className="px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white text-[9px] font-bold rounded-full border border-gray-100 dark:border-white/10 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                {item.plays}
                            </div>
                        </div>

                        <div className={`h-56 rounded-[2.5rem] bg-gradient-to-br ${item.color} mb-8 flex items-center justify-center relative overflow-hidden ring-1 ring-inset ring-white/10`}>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-5 text-white">
                                <Button variant="secondary" size="sm" className="rounded-full font-bold text-[10px] shadow-2xl px-8 h-12">{t('collectAsset')}</Button>
                                <Link href="#" className="text-[10px] font-bold text-white/60 hover:text-white transition-colors">{t('previewDetails')}</Link>
                            </div>
                            <div className="text-7xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out">{item.icon}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs font-bold text-blue-500 mb-1">{item.tag}</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors leading-none">{item.title}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-50 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-[#111] shadow-lg" />
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-[#111] shadow-lg" />
                                </div>
                                <div className="text-[10px] font-bold text-gray-400">{t('createdBy')} <span className="text-gray-900 dark:text-white">{t('proCreators')}</span></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{t('certifiedStatus')}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
