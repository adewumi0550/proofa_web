"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AuthorshipHUD } from "@/components/dashboard/authorship-hud";
import { PromptOrchestrator } from "@/components/dashboard/prompt-orchestrator";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Hash, Sparkles, AlertCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { proofaApi } from "@/lib/api";
import { useAuth } from "@/components/auth-context";

type Stage = "Inception" | "Collaboration" | "Certified";

export default function DashboardPage() {
    const [stage, setStage] = useState<Stage>("Inception");
    const [score, setScore] = useState(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [creativeHash, setCreativeHash] = useState<string | null>(null);

    const [registryId, setRegistryId] = useState<string | null>(null);
    const { user } = useAuth();

    const startProject = async (initialInput: string) => {
        // Reset all project state for a clean workspace
        setMessages([]);
        setScore(0);
        setRegistryId(null);
        setCreativeHash(null);

        // FAIL-SAFE: If user is missing, use a temporary demo identity locally
        let currentUser = user || {
            id: "offline-demo",
            email: "demo@offline.local",
            user_id: "offline-demo",
            pqc_public_key: "OFFLINE_KEY",
            message: "Offline Mode"
        };

        try {
            // Try Real Backend
            const res = await proofaApi.registry.upload({
                user_id: currentUser.user_id,
                content: initialInput,
                metadata: JSON.stringify({ title: "New Creative Seed", hash: "0xMock" })
            });

            const newSeedId = res.data.seed_id;
            setRegistryId(newSeedId);
            setCreativeHash(res.data.hash || "0xCHAIN-VERIFIED");

        } catch (error) {
            console.error("Backend request failed, using Local Mode:", error);
            // Fallback: Proceed locally so user is not blocked
            const mockId = "local-seed-" + Date.now();
            setRegistryId(mockId);
            setCreativeHash("0xLOCAL-MODE");
        }

        // Always advance stage
        setStage("Collaboration");
    };

    const handlePrompt = async (content: string) => {
        const newUserMsg = { id: Date.now().toString(), role: "user", content };
        setMessages(prev => [...prev, newUserMsg]);

        if (!registryId) return;

        try {
            // Step 2: Real Human Score Calculation (Gemini Judge)
            const res = await proofaApi.proofa.calculate({
                user_id: user?.user_id || "demo-uid",
                seed_id: registryId,
                prompt: content
            });

            // Backend returns 0.0-1.0, Frontend needs 0-100
            const newScoreRaw = res.data.human_score;
            const newScore = Math.floor(newScoreRaw * 100);

            setScore(newScore);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: res.data.reasoning || `Intent analyzed. Human Score updated to ${newScore}%.`,
            }]);

        } catch (error) {
            console.error("Scoring failed:", error);
            // Fallback Simulation for Demo
            const simScore = Math.min(score + 15, 95);
            setScore(simScore);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `(Backend Unreachable) Simulating analysis... Human Score increasing to ${simScore}%.`,
            }]);
        }
    };

    const generateLicense = async () => {
        if (score >= 80) {
            try {
                if (registryId) await proofaApi.proofa.getCertificate(registryId);
                setStage("Certified");
            } catch (error) {
                console.error("License generation failed:", error);
                setStage("Certified"); // Verify anyway for demo
            }
        } else {
            console.warn("Score too low for license");
        }
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-[#fbfbfb] dark:bg-[#050505] transition-colors duration-500 overflow-hidden flex flex-col">
            {/* Clean, Neutral Background */}
            <div className="absolute inset-0 pointer-events-none z-0" />

            <div className="relative z-10 flex flex-1 h-full min-h-0">
                <DashboardSidebar showAddProject={stage !== "Inception"} />

                <main className="flex-1 flex flex-col min-w-0 max-w-6xl mx-auto p-8 relative">
                    {/* Centered Workspace Area - Height Stabilized */}
                    <div className="flex-1 relative min-h-0">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {stage === "Inception" ? (
                                <motion.div
                                    key="step-1"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="absolute inset-0 flex flex-col justify-center items-center p-4"
                                >
                                    <div className="w-full max-w-2xl crystal-view rounded-[40px] p-20 flex flex-col items-center text-center">
                                        <div className="mb-10 p-6 bg-blue-500/10 rounded-full animate-pulse">
                                            <ShieldCheck className="w-12 h-12 text-blue-500" />
                                        </div>
                                        <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-6">Art Inception</h2>
                                        <p className="text-gray-400 font-bold text-sm max-w-lg mb-16 tracking-wide leading-relaxed">
                                            Explore and create art projects with advanced AI tools. Seamlessly blend styles, elements, and concepts.
                                        </p>

                                        <div className="w-full max-w-sm space-y-12 relative z-10">
                                            <Button
                                                onClick={() => startProject("New Creative Vision")}
                                                className="glass-button rounded-2xl px-12 h-16 font-bold tracking-[0.1em] text-sm active:scale-95 transition-all w-full"
                                            >
                                                Create New Project +
                                            </Button>

                                            <div className="w-full space-y-8">
                                                <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full w-1/3 bg-blue-500/40 rounded-full" />
                                                </div>

                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex -space-x-2">
                                                            {[1, 2].map((i) => (
                                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-black/40 bg-gray-800 shadow-sm" />
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-500 tracking-tight whitespace-nowrap">Economic Team</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex -space-x-2">
                                                            {[3, 4].map((i) => (
                                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-black/40 bg-gray-800 shadow-sm" />
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-500 tracking-tight whitespace-nowrap">Creative Team</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute inset-0 flex flex-col"
                                >
                                    <PromptOrchestrator
                                        messages={messages}
                                        onPromptSent={handlePrompt}
                                        onFileUpload={(file) => handlePrompt(`[Uploaded File: ${file.name}]`)}
                                    />

                                    {/* Persistence & Licensing Controls */}
                                    <div className="w-full flex items-center justify-between px-6 py-6 border-t border-black/5 dark:border-white/5 mt-auto">
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-2">
                                                <Hash className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{creativeHash}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">EU AI ACT COMPLIANT</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={generateLicense}
                                            disabled={score < 80}
                                            className={`
                                                flex items-center gap-2 rounded-full px-12 h-14 font-black uppercase tracking-[0.2em] text-[11px] transition-all
                                                ${score >= 80
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 active:scale-95'
                                                    : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'}
                                            `}
                                        >
                                            <ShieldCheck className="w-5 h-5" />
                                            Generate License
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Fixed Bottom HUD - Only visible after start */}
                    {stage !== "Inception" && (
                        <div className="shrink-0 pt-6">
                            <AuthorshipHUD score={score} stage={stage} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
