"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    CheckCircle2,
    Download,
    Zap,
    Globe,
    Layers,
    Scale,
    ArrowLeft,
    Archive,
    Menu,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-context";

interface AuthorshipPassportProps {
    projectName: string;
    humanScore: number;
    assetHash: string;
    timestamp: string;
    onBack: () => void;
}

export function AuthorshipPassport({
    projectName,
    humanScore,
    assetHash,
    timestamp,
    onBack
}: AuthorshipPassportProps) {
    const { t } = useLanguage();

    // Check if score is high confidence
    const isHighConfidence = humanScore >= 80;

    // QR Code URL (dynamically generated for the asset hash)
    // In a real app, this would point to the verification URL
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${assetHash}`;

    const licensingTiers = [
        { name: t('apparel'), royalty: "4-10%", icon: Zap, description: t('apparelDesc') },
        { name: t('homeDecor'), royalty: "5-12%", icon: Globe, description: t('homeDecorDesc') },
        { name: t('digital'), royalty: "10-25%", icon: Layers, description: t('digitalDesc') },
        { name: t('flatFee'), royalty: "$500+", icon: Scale, description: t('flatFeeDesc') },
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#fbfbfb] dark:bg-[#090909] overflow-y-auto custom-scrollbar">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-8 py-6 sticky top-0 bg-[#fbfbfb]/80 dark:bg-[#090909]/80 backdrop-blur-md z-30 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-6">
                    <button className="p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                        <Menu className="w-5 h-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{t('authorshipPassport')}</h1>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('securingCreativity')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="rounded-full bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 font-black text-[9px] uppercase tracking-widest px-6 h-10 border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-2"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        {t('backToWorkspace')}
                    </Button>
                    <Button variant="outline" className="rounded-full border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 font-bold text-[9px] uppercase tracking-widest h-10 px-6 shadow-sm">
                        <Archive className="w-3.5 h-3.5 mr-2" />
                        {t('myCollections')}
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side: Document View */}
                <div className="lg:col-span-8 flex flex-col gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl shadow-2xl p-16 flex flex-col overflow-hidden min-h-[900px]"
                    >
                        {/* Security Watermark Background */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none p-12 overflow-hidden select-none flex flex-wrap gap-x-12 gap-y-16">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <span key={i} className="text-[9px] font-black uppercase -rotate-45 whitespace-nowrap">{t('proofaRegistryAudit')}</span>
                            ))}
                        </div>

                        {/* Document Content */}
                        <div className="relative z-10 flex-1 flex flex-col">
                            {/* Document Header */}
                            <div className="flex flex-col items-center text-center mb-16">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-blue-500/20 shadow-xl shadow-blue-500/5">
                                    <Layers className="w-8 h-8 text-blue-500" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-[0.2em] uppercase mb-1">{t('authorshipPassport')}</h2>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">{t('officialForensicReport')}</p>
                            </div>

                            {/* Main Body */}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mx-auto text-center mb-16">
                                    {t('declarationText')}
                                </p>

                                {/* Data Grid */}
                                <div className="space-y-0 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex items-center justify-between py-6 border-b border-gray-100 dark:border-white/5">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">{t('cryptographicAssetHash')}</span>
                                        <div className="px-3 py-1 bg-blue-500/10 rounded-md">
                                            <span className="text-[11px] font-black font-mono text-blue-600 dark:text-blue-400 truncate max-w-xs">{assetHash}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-6 border-b border-gray-100 dark:border-white/5">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('humanControlCoefficient')}</span>
                                        <span className="text-3xl font-black text-gray-900 dark:text-white">{humanScore.toFixed(2)}%</span>
                                    </div>
                                    <div className="flex items-center justify-between py-6 border-b border-gray-100 dark:border-white/5">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('verificationTimestamp')}</span>
                                        <span className="text-[13px] font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            {timestamp}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-6">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
                                        <div className="flex items-center gap-2.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">{t('passportVerified')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Signatures & Stamps */}
                            <div className="mt-16 pt-16 border-t border-gray-100 dark:border-white/5 flex items-end justify-between">
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-24 h-24 rounded-full border border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center p-2">
                                        <div className="w-full h-full rounded-full border border-blue-500/10 bg-blue-500/[0.02] flex items-center justify-center">
                                            <ShieldCheck className="w-8 h-8 text-blue-500/20" />
                                        </div>
                                    </div>
                                    <p className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em]">{t('forensicSignatureStamp')}</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <div className="w-48 h-px bg-gray-900 dark:bg-white mb-4 opacity-10" />
                                    <h4 className="text-base font-black text-gray-900 dark:text-white tracking-widest uppercase">{t('auditNode')}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('authorizedSignature')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Forensic Audit Detail Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4 text-blue-500" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('forensicAuditSummary')}</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: `${t('manualIntervention')} (Delta 0)`, desc: "High creative control detected in the arrangement of elements." }, // Using manualIntervention key mostly
                                    { label: t('pqcIdentity'), desc: "Signature verified using Dilithium3 algorithm on local node." },
                                    { label: t('compliance'), desc: "Adheres to EU AI Act transparency requirements and US Copyright Office guidelines." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-bold uppercase text-gray-900 dark:text-white leading-none mb-1.5">{item.label}</h4>
                                            <p className="text-[10px] font-medium text-gray-500 leading-normal">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col justify-end gap-4 pb-2">
                            <Button className="h-16 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 shadow-2xl active:scale-[0.98] transition-all">
                                {t('issuePassport')}
                            </Button>
                            <Button variant="outline" className="h-16 rounded-2xl border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-3">
                                <Download className="w-5 h-5 text-gray-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{t('downloadCert')}</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Commercial Rights Sidebar */}
                <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">{t('commercialRightsOverview')}</h3>
                    <div className="space-y-4">
                        {licensingTiers.map((tier) => (
                            <motion.div
                                key={tier.name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative p-8 rounded-3xl cursor-pointer transition-all border
                                    ${tier.name === t('apparel')
                                        ? 'bg-blue-600 border-blue-400 shadow-2xl shadow-blue-500/30 text-white'
                                        : 'bg-white dark:bg-[#111] border-gray-100 dark:border-white/5 hover:border-blue-500/20 shadow-sm'}
                                `}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-4 rounded-2xl ${tier.name === t('apparel') ? 'bg-white/20' : 'bg-gray-50 dark:bg-white/5'}`}>
                                        <tier.icon className={`w-6 h-6 ${tier.name === t('apparel') ? 'text-white' : 'text-gray-400'}`} />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tier.name === t('apparel') ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                        {t('royalty')}: {tier.royalty}
                                    </div>
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-tight mb-2">
                                    {tier.name}
                                </h4>
                                <p className={`text-[11px] font-bold leading-relaxed lowercase ${tier.name === t('apparel') ? 'text-white/60' : 'text-gray-400'}`}>
                                    {tier.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 mt-8">
                        <div className="flex gap-4">
                            <Scale className="w-5 h-5 text-amber-600 shrink-0" />
                            <div className="space-y-2">
                                <h5 className="text-[10px] font-black uppercase text-amber-900 tracking-widest leading-none">{t('legalNotice')}</h5>
                                <p className="text-[10px] font-bold text-amber-900/40 leading-relaxed uppercase tracking-tight">
                                    {t('legalNoticeDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
