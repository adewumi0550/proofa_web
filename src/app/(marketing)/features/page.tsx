"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-context";

export default function FeaturesPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] transition-colors duration-300">
            {/* Hero */}
            <div className="py-20 px-6 text-center border-b border-black/10 dark:border-white/10">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('featuresTitle')} <span className="text-blue-600 dark:text-blue-500">{t('aiCreators')}</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {t('featuresSubtitle')}
                </p>
            </div>

            {/* Feature Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
                <div className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 text-2xl">🧩</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('unifiedWorkspace')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('uwDesc')}</p>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6 text-2xl">📑</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('digitalPassport')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('dpDesc')}</p>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6 text-2xl">🔒</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privateLedger')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('plDesc')}</p>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-pink-100 dark:bg-pink-600/20 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center mb-6 text-2xl">🔄</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('crossModel')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('cmDesc')}</p>
                </div>
            </div>

            <div className="text-center pb-20">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full font-bold">
                    {t('exploreFeatures')}
                </Button>
            </div>
        </div>
    );
}
