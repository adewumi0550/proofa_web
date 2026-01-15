"use client";

import React from "react";
import { Info, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthorshipHUDProps {
    score: number;
    stage: "Inception" | "Collaboration" | "Certified" | "Licensing";
}

export function AuthorshipHUD({ score, stage }: AuthorshipHUDProps) {
    const isEligible = score >= 80;

    return (
        <div className="w-full pt-2 pb-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-tight text-gray-500">
                        Authorship Strength
                    </span>
                    <div className="group relative z-50">
                        <Info className="w-3 h-3 text-gray-300 dark:text-gray-600 cursor-help" />
                        <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[100]">
                            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase tracking-wider">
                                EU AI Act Art. 52 Compliance: This score measures human creative direction vs AI automation depth.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <AnimatePresence>
                        {isEligible && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-[10px] font-bold text-blue-500 tracking-tight">License Eligible</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <span className="text-xl font-black text-blue-600 dark:text-blue-400 tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        {score}%
                    </span>
                </div>
            </div>

            <div className="w-full relative h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-blue-600 h-full rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
                        boxShadow: score >= 80 ? '0 0 20px rgba(147, 51, 234, 0.3)' : 'none'
                    }}
                />
            </div>

            <div className="flex justify-between items-center text-[10px] font-bold tracking-tight text-gray-400">
                <span className={stage === 'Inception' ? 'text-blue-500' : 'text-gray-400'}>Step 1: Inception</span>
                <span className={stage === 'Collaboration' ? 'text-blue-500' : 'text-gray-400'}>Step 2: Collaboration</span>
                <span className={stage === 'Certified' || stage === 'Licensing' ? 'text-blue-500' : 'text-gray-400'}>Step 3: Certification</span>
            </div>
        </div>
    );
}
