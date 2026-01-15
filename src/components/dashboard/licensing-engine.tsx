"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Layers,
    FileText,
    Download,
    CheckCircle2,
    Zap,
    Scale,
    Globe,
    Plus,
    Archive,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LicensingEngineProps {
    projectID: string | null;
    humanScore: number;
    creativeHash: string | null;
    onBack: () => void;
}

export const LicensingEngine: React.FC<LicensingEngineProps> = ({
    projectID,
    humanScore,
    creativeHash,
    onBack
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Apparel");
    const [isCertified, setIsCertified] = useState(false);

    const licensingTiers = [
        { name: "Apparel", royalty: "4-10%", icon: Zap, description: "T-shirts, hoodies, and wearable accessories." },
        { name: "Home Decor", royalty: "5-12%", icon: Globe, description: "Wall art, pillows, and kitchenware." },
        { name: "Digital", royalty: "10-25%", icon: Layers, description: "Game assets, NFTs, and digital collectibles." },
        { name: "Flat Fee", royalty: "$500+", icon: Scale, description: "One-time usage for editorials or campaigns." },
    ];

    const handleCertify = () => {
        setIsCertified(true);
    };

    return (
        <div className="flex flex-col h-full space-y-8 pb-12 overflow-y-auto pr-2 custom-scrollbar">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Licensing Engine</h2>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Transforming Human Score into IP Assets
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="glass-button rounded-full font-black text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-2 px-6 h-10 border-0 shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Workspace
                    </Button>
                    <Button variant="outline" className="rounded-full border-black/10 dark:border-white/10 font-bold text-[10px] uppercase tracking-widest">
                        <Archive className="w-3.5 h-3.5 mr-2" />
                        My Collections
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Certification & Audit */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="crystal-view rounded-[32px] p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-2xl">
                                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg tracking-tight">Authorship Certification</h3>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hash: {creativeHash || "0xPENDING"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-black px-4 py-2 rounded-full ${humanScore >= 85 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                    SCORE: {humanScore}%
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Audit Trail Summary</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        Manual Intervention Detected (Delta {humanScore / 100})
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        PQC Identity Verified (Dilithium Signature)
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        Compliance: EU AI Act & US Copyright Policy
                                    </li>
                                </ul>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={handleCertify}
                                    className="flex-1 glass-button rounded-2xl h-14 font-black uppercase tracking-widest text-[11px]"
                                    disabled={isCertified}
                                >
                                    {isCertified ? "Certified ✓" : "Initialize Certification"}
                                </Button>
                                <Button variant="outline" className="w-14 h-14 rounded-2xl border-black/10 dark:border-white/10">
                                    <Download className="w-5 h-5 text-gray-400" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Collection Management Link */}
                    <div className="p-8 rounded-[32px] border-2 border-dashed border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-500/20 transition-all cursor-pointer group">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-all">
                            <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900 dark:text-white">Create New Collection</h4>
                            <p className="text-xs font-bold text-gray-400">Industry Standard: 10-12 pieces per Style Guide</p>
                        </div>
                    </div>
                </div>

                {/* Right: Royalty Presets */}
                <div className="space-y-6">
                    <h3 className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Licensing Presets</h3>
                    <div className="space-y-4">
                        {licensingTiers.map((tier) => (
                            <motion.div
                                key={tier.name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedCategory(tier.name)}
                                className={`
                                    relative p-6 rounded-[28px] cursor-pointer transition-all border-2
                                    ${selectedCategory === tier.name
                                        ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-500/20'
                                        : 'crystal-view border-transparent'}
                                `}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${selectedCategory === tier.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/5'}`}>
                                        <tier.icon className={`w-5 h-5 ${selectedCategory === tier.name ? 'text-white' : 'text-gray-500'}`} />
                                    </div>
                                    <span className={`text-xs font-black ${selectedCategory === tier.name ? 'text-white/80' : 'text-blue-500'}`}>
                                        ROYALTY: {tier.royalty}
                                    </span>
                                </div>
                                <h4 className={`font-black tracking-tight ${selectedCategory === tier.name ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                    {tier.name}
                                </h4>
                                <p className={`text-[11px] font-bold leading-relaxed ${selectedCategory === tier.name ? 'text-white/60' : 'text-gray-400'}`}>
                                    {tier.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-6 rounded-[28px] bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex gap-3">
                            <Scale className="w-5 h-5 text-yellow-600 shrink-0" />
                            <div>
                                <h5 className="text-[11px] font-black uppercase text-yellow-700 leading-none mb-1">Legal Notice</h5>
                                <p className="text-[10px] font-bold text-yellow-800/70 leading-relaxed">
                                    Copyright registration requires disclosure of AI tools. Proofa's Audit Trail serves as evidence of human creative control.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
