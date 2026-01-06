"use client";

import { Heart, AppWindow, Share2, MoreHorizontal } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export default function ShowOffPage() {
    const trendingItems = [
        { id: 1, title: "Cyber-Noir Cityscape", author: "NeonDreamer", likes: "12.5k", views: "45k", aspect: "video" },
        { id: 2, title: "Abstract Emotion #4", author: "ArtFlow", likes: "8.2k", views: "32k", aspect: "square" },
        { id: 3, title: "Synthetic Flora", author: "BioGen", likes: "6.1k", views: "28k", aspect: "portrait" },
        { id: 4, title: "Retro Future Car", author: "VibesOnly", likes: "5.4k", views: "19k", aspect: "video" },
        { id: 5, title: "Character Study: Warrior", author: "ConceptAi", likes: "4.9k", views: "22k", aspect: "portrait" },
        { id: 6, title: "Dreamy Landscape", author: "SceneryBot", likes: "3.8k", views: "15k", aspect: "square" },
    ];

    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] pt-12 pb-24 transition-colors duration-300">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Showcase</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover trending certified workflows and assets.
                            Licensed and ready for commercial use.
                        </p>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {trendingItems.map((item) => (
                            <div key={item.id} className="break-inside-avoid bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 group hover:border-blue-500/50 transition-all duration-300">
                                <div className={`w-full bg-gray-200 dark:bg-white/10 relative ${item.aspect === 'video' ? 'aspect-video' : item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
                                    }`}>
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest font-medium">
                                        {item.title} Generative Art
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                                            <Heart className="w-6 h-6" />
                                        </button>
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate">{item.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">by @{item.author}</p>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Heart className="w-3 h-3 fill-current" /> {item.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <AppWindow className="w-3 h-3" /> {item.views}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
