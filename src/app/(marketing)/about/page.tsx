"use client";

import { useLanguage } from "@/components/language-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, ShieldCheck, Users, Rocket, Lightbulb, Code } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t } = useLanguage();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-24 pb-12 transition-colors duration-300">

            {/* 1. Vision & Mission */}
            <section className="px-6 py-16 text-center max-w-4xl mx-auto">
                <motion.div initial="initial" animate="animate" variants={fadeIn}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                        {t('missionHeader')}
                    </h1>
                    <div className="space-y-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>{t('missionGap')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{t('missionSolution')}</p>
                        <p className="italic text-gray-500 dark:text-gray-400">"{t('missionValue')}"</p>
                    </div>
                </motion.div>
            </section>

            {/* 2. What is Proofa? */}
            <section className="bg-gray-50 dark:bg-white/5 py-20 border-y border-black/5 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">{t('whatIsProofaHeader')}</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition-colors">
                            <div className="h-14 w-14 bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                                <BrainCircuit className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('featureAggregatorTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{t('featureAggregatorDesc')}</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-colors">
                            <div className="h-14 w-14 bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('featurePassportTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{t('featurePassportDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. History Timeline */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-16">{t('historyHeader')}</h2>
                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent rounded-full" />

                    <div className="space-y-16">
                        {/* Item 1: Idea */}
                        <div className="relative flex items-center justify-between">
                            <div className="w-5/12 text-right pr-8">
                                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{t('historyIdea')}</h3>
                                <p className="text-sm text-gray-500">Week 1</p>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white dark:bg-black border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
                                <Lightbulb className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="w-5/12 pl-8 text-gray-500 dark:text-gray-400 text-sm">
                                Conceptualization & Initial Strategy
                            </div>
                        </div>

                        {/* Item 2: Prototype */}
                        <div className="relative flex items-center justify-between">
                            <div className="w-5/12 text-right pr-8 text-gray-500 dark:text-gray-400 text-sm">
                                Development of MVP & Core Logic
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white dark:bg-black border-4 border-purple-500 rounded-full flex items-center justify-center z-10">
                                <Code className="w-4 h-4 text-purple-500" />
                            </div>
                            <div className="w-5/12 pl-8">
                                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">{t('historyPrototype')}</h3>
                                <p className="text-sm text-gray-500">Week 2</p>
                            </div>
                        </div>

                        {/* Item 3: Launch */}
                        <div className="relative flex items-center justify-between">
                            <div className="w-5/12 text-right pr-8">
                                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{t('historyLaunch')}</h3>
                                <p className="text-sm text-gray-500">Week 3 (Now)</p>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white dark:bg-black border-4 border-green-500 rounded-full flex items-center justify-center z-10">
                                <Rocket className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="w-5/12 pl-8 text-gray-500 dark:text-gray-400 text-sm">
                                Focus Group & Public Reveal
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Team */}
            <section className="bg-gray-50 dark:bg-white/5 py-20 border-t border-black/5 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('teamTitle')}</h2>

                    <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 mb-12 italic">
                        "{t('teamDesc')}"
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Anna */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/10">
                            <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                AM
                            </div>
                            <h3 className="text-xl font-bold">Anna Muzykina</h3>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">{t('team_anna_role')}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {t('team_anna_desc')}
                            </p>
                        </div>

                        {/* Denys */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/10">
                            <div className="w-24 h-24 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                                DD
                            </div>
                            <h3 className="text-xl font-bold">Denys Doroshev</h3>
                            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">{t('team_denys_role')}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {t('team_denys_desc')}
                            </p>
                        </div>

                        {/* Saheed */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/10">
                            <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                                SA
                            </div>
                            <h3 className="text-xl font-bold">Saheed Adewumi</h3>
                            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-4">{t('team_saheed_role')}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {t('team_saheed_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Legal & Status */}
            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <div className="inline-block p-8 border border-gray-200 dark:border-white/10 rounded-2xl bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                        <Users className="w-6 h-6" />
                        {t('statusHeader')}
                    </h2>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {t('statusPhase')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('statusRoadmap')}
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20 text-center">
                <Link href="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-8 text-xl font-bold shadow-lg shadow-blue-600/20 transition-transform hover:scale-105">
                        {t('joinMovement')} <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </Link>
            </section>

        </div>
    );
}
