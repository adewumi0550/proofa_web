"use client";

import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ComplianceFooterProps {
    score: number;
    stage: "Inception" | "Collaboration" | "Certified" | "Licensing";
    onCertify?: () => void;
    isCertified?: boolean;
    consentDeclined?: boolean;
}

export function ComplianceFooter({ score, stage, onCertify, isCertified, consentDeclined }: ComplianceFooterProps) {
    const isEligible = score >= 80;

    if (consentDeclined) {
        return (
            <footer className="w-full bg-white dark:bg-[#0c0c0c] border-t border-gray-100 dark:border-white/5 py-3 px-6 md:px-12 space-y-2 shrink-0 transition-all opacity-50 pointer-events-none select-none">
                <div className="max-w-7xl mx-auto flex items-center justify-center py-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Authorship Passport Disabled via Privacy Settings
                    </span>
                </div>
            </footer>
        );
    }

    return (
        <footer className="w-full bg-white dark:bg-[#0c0c0c] border-t border-gray-100 dark:border-white/5 py-3 px-6 md:px-12 space-y-2 shrink-0 transition-all">
            {/* Top Row: Compliance & Actions */}
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <a
                        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors"
                    >
                        EU AI Act Compliant
                    </a>
                    <div className="group relative">
                        <Info className="w-3 h-3 text-gray-300 dark:text-gray-600 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed uppercase tracking-wider text-center">
                                Certified under EU AI Act Art. 52 Transparency Obligations.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-all h-8"
                    >
                        Review Passport
                    </Button>
                    <Button
                        onClick={onCertify}
                        disabled={!isEligible && !isCertified}
                        size="sm"
                        className={`
                            h-8 rounded-full px-6 text-[9px] font-black uppercase tracking-widest transition-all
                            ${isCertified || stage === "Certified" || stage === "Licensing"
                                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20'
                                : isEligible
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'}
                        `}
                    >
                        {isCertified || stage === "Certified" || stage === "Licensing" ? 'Issue Passport' : 'Certify Asset'}
                    </Button>
                </div>
            </div>

            {/* Middle Row: Progress Bar */}
            <div className="max-w-7xl mx-auto space-y-1.5">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                        Authorship Strength
                    </span>
                    <span className={`text-xs font-black transition-colors ${score >= 80 ? 'text-blue-500' : 'text-gray-500'}`}>
                        {score}%
                    </span>
                </div>
                <div className="h-1 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                            background: score >= 80
                                ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)'
                                : 'linear-gradient(90deg, #94a3b8 0%, #64748b 100%)'
                        }}
                    />
                </div>
            </div>

            {/* Bottom Row: Steps */}
            <div className="max-w-7xl mx-auto flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-gray-400">
                <div className={`flex items-center gap-1 ${stage === "Inception" ? "text-blue-500" : ""}`}>
                    <span>Step 1: Inception</span>
                </div>
                <div className={`flex items-center gap-1 ${stage === "Collaboration" ? "text-blue-500" : ""}`}>
                    <span>Step 2: Collaboration</span>
                </div>
                <div className={`flex items-center gap-1 ${stage === "Certified" || stage === "Licensing" ? "text-blue-500" : ""}`}>
                    <span>Step 3: Certification</span>
                </div>
            </div>
        </footer>
    );
}
