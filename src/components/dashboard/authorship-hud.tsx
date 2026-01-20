"use client";

import React from "react";
import { Info, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AuthorshipHUDProps {
    score: number;
    stage: "Inception" | "Collaboration" | "Certified" | "Licensing";
    onCertify?: () => void;
    isCertified?: boolean;
    verdict?: string;
    reason?: string;
}

export function AuthorshipHUD({ score, stage, onCertify, isCertified, verdict, reason }: AuthorshipHUDProps) {
    const isEligible = score >= 80;

    return (
        <div className="w-full py-4 px-6 flex flex-col items-start justify-center bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/5 z-20 sticky top-0 transition-all">
            <div className="flex flex-col gap-3 w-full max-w-md">
                {/* Top Row: Label & Info */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
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
                </div>

                {/* Middle Row: Progress Bar & Score */}
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                                background: score >= 80
                                    ? 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)'
                                    : 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
                                boxShadow: score >= 80 ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                            }}
                        />
                    </div>
                    <span className={`text-base font-black tabular-nums transition-colors ${score >= 80 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                        {score}%
                    </span>
                </div>

                {/* Verdict Row - Now below bar and full width */}
                <AnimatePresence>
                    {verdict && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-xl border ${score >= 80
                                ? 'bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-400'
                                : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                                }`}
                        >
                            <span className="text-[11px] font-black uppercase tracking-tight leading-normal block">
                                {verdict}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reason / Context */}
                <AnimatePresence>
                    {reason && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed pt-1 overflow-hidden"
                        >
                            <span className="opacity-70 italic font-normal">&quot;{reason}&quot;</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Row: Actions */}
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
                    <AnimatePresence>
                        {isEligible ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-[9px] font-black text-green-500 tracking-tighter uppercase">Eligible for IP</span>
                            </motion.div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-white/5 border border-transparent rounded-full opacity-50">
                                <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-[9px] font-bold text-gray-400 uppercase">Analysis Pending</span>
                            </div>
                        )}
                    </AnimatePresence>

                    {onCertify && (
                        <Button
                            onClick={onCertify}
                            disabled={!isEligible}
                            size="sm"
                            className={`
                                h-8 rounded-xl px-6 font-black uppercase tracking-wider text-[10px] transition-all whitespace-nowrap
                                ${isEligible
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-95'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'}
                            `}
                        >
                            {stage === 'Certified' || isCertified ? 'View Certificate' : 'Certify Asset'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
