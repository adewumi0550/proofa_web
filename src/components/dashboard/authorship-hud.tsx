"use client";

import React from "react";
import { Info, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AuthorshipHUDProps {
    score: number;
    stage: "Inception" | "Collaboration" | "Certified" | "Licensing";
    onCertify?: () => void;
}

export function AuthorshipHUD({ score, stage, onCertify }: AuthorshipHUDProps) {
    const isEligible = score >= 80;

    return (
        <div className="w-full py-4 px-6 flex items-center justify-between bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/5 z-20 sticky top-0">
            <div className="flex flex-col gap-1 flex-1 max-w-md">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
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
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
                                boxShadow: score >= 80 ? '0 0 10px rgba(147, 51, 234, 0.3)' : 'none'
                            }}
                        />
                    </div>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 tabular-nums">
                        {score}%
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4 pl-8">
                <AnimatePresence>
                    {isEligible && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full"
                        >
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-[10px] font-bold text-green-500 tracking-tight uppercase">License Eligible</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {onCertify && (
                    <Button
                        onClick={onCertify}
                        disabled={!isEligible}
                        size="sm"
                        className={`
                            rounded-full px-6 h-9 font-black uppercase tracking-wider text-[10px] transition-all
                            ${isEligible
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-95'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'}
                        `}
                    >
                        {stage === 'Certified' ? 'View Certificate' : 'Certify Authorship'}
                    </Button>
                )}
            </div>
        </div>
    );
}
