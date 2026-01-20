"use client";

import { Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-context";

export default function ModelGardenPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] pt-12 transition-colors duration-300">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('modelGarden')}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{t('modelGardenSubtitle')}</p>
                    </div>

                    <div className="max-w-2xl mx-auto mb-16 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 z-10" />
                            <Textarea
                                className="pl-10 min-h-[120px] bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 text-lg resize-y"
                                placeholder={t('searchPlaceholder')}
                            />
                        </div>
                        <div className="flex gap-4">
                            <select className="h-10 px-3 rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3">
                                <option>{t('allModels')}</option>
                                <option>Gemini 1.5 Pro</option>
                                <option>ChatGPT-4o</option>
                                <option>Claude 3.5 Sonnet</option>
                                <option>Stable Diffusion XL</option>
                                <option>Midjourney v6</option>
                                <option>DALL-E 3</option>
                                <option>Llama 3</option>
                            </select>
                            <select className="h-10 px-3 rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3">
                                <option>{t('allStyles')}</option>
                                <option>Photorealistic</option>
                                <option>Anime</option>
                                <option>3D Render</option>
                            </select>
                            <select className="h-10 px-3 rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3">
                                <option>{t('sortBy')}</option>
                                <option>{t('popularity')}</option>
                                <option>{t('newest')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-video bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
