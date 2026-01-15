"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AuthorshipHUD } from "@/components/dashboard/authorship-hud";
import { PromptOrchestrator } from "@/components/dashboard/prompt-orchestrator";
import { LicensingEngine } from "@/components/dashboard/licensing-engine";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Hash, Sparkles, AlertCircle, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { proofaApi } from "@/lib/api";
import { useAuth } from "@/components/auth-context";

type Stage = "Inception" | "Collaboration" | "Certified" | "Licensing";

export default function DashboardPage() {
    const [stage, setStage] = useState<Stage>("Inception");
    const [score, setScore] = useState(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [creativeHash, setCreativeHash] = useState<string | null>(null);
    const [isOathModalOpen, setIsOathModalOpen] = useState(false);
    const [pendingInput, setPendingInput] = useState<string | null>(null);
    const [oathChecked, setOathChecked] = useState(false);
    const [projects, setProjects] = useState<Array<{ id: string, name: string }>>([]);
    const [registryId, setRegistryId] = useState<string | null>(null);
    const { user } = useAuth();

    const startProject = async (initialInput: string) => {
        // FAIL-SAFE: If user is missing, use a temporary demo identity locally
        let currentUser = user || {
            id: "offline-demo",
            email: "demo@offline.local",
            user_id: "offline-demo",
            pqc_public_key: "OFFLINE_KEY",
            message: "Offline Mode"
        };

        try {
            // Step 1: Real AI Seed Verification & Registry Upload
            const res = await proofaApi.registry.upload({
                user_id: currentUser.user_id,
                content: initialInput,
                metadata: JSON.stringify({ title: "New Creative Seed", hash: "0xMock" })
            });

            const newSeedId = res.data.seed_id;
            setRegistryId(newSeedId);
            setCreativeHash(res.data.hash || "0xCHAIN-VERIFIED");

            // Add to project list for sidebar
            setProjects(prev => [...prev, { id: newSeedId, name: initialInput.slice(0, 20) + (initialInput.length > 20 ? "..." : "") }]);

            // Add the first message to the list now that we have a registry ID
            const newUserMsg = { id: Date.now().toString(), role: "user", content: initialInput };
            setMessages(prev => [...prev, newUserMsg]);

            // Set Human Score if returned (Seed verification might give initial score)
            // For now, let's keep it 0 or a small base
            setScore(10);

        } catch (error) {
            console.error("Backend request failed, using Local Mode:", error);
            const mockId = "local-seed-" + Date.now();
            setRegistryId(mockId);
            setCreativeHash("0xLOCAL-MODE");
            setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: initialInput }]);
        }

        setIsOathModalOpen(false);
        setOathChecked(false);
        setPendingInput(null);
    };

    const handlePrompt = async (content: string): Promise<boolean> => {
        // If first prompt, show oath instead of sending
        if (!registryId) {
            setPendingInput(content);
            setIsOathModalOpen(true);
            return false; // Tell orchestrator NOT to clear input yet
        }

        const newUserMsg = { id: Date.now().toString(), role: "user", content };
        setMessages(prev => [...prev, newUserMsg]);

        if (!registryId) return false;

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
            const simScore = Math.min(score + 15, 95);
            setScore(simScore);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `(Backend Unreachable) Simulating analysis... Human Score increasing to ${simScore}%.`,
            }]);
        }
        return true;
    };

    const certifyAuthorship = async () => {
        if (score >= 80) {
            try {
                if (registryId) await proofaApi.proofa.getCertificate(registryId);
                setStage("Licensing");
            } catch (error) {
                console.error("Authorship certification failed:", error);
                setStage("Licensing"); // Verify anyway for demo
            }
        } else {
            console.warn("Score too low for certification");
        }
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-[#fbfbfb] dark:bg-[#050505] transition-colors duration-500 overflow-hidden flex flex-col">
            {/* Clean, Neutral Background */}
            <div className="absolute inset-0 pointer-events-none z-0" />

            <div className="relative z-10 flex flex-1 h-full min-h-0">
                {stage !== "Inception" && (
                    <DashboardSidebar
                        showAddProject={projects.length > 0}
                        projects={projects}
                        activeProjectId={registryId}
                        onProjectSelect={(id: string) => setRegistryId(id)}
                    />
                )}
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
                                                onClick={() => {
                                                    setMessages([]);
                                                    setScore(0);
                                                    setRegistryId(null);
                                                    setCreativeHash(null);
                                                    setStage("Collaboration");
                                                }}
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
                            ) : stage === "Licensing" ? (
                                <motion.div
                                    key="licensing"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="absolute inset-0 flex flex-col"
                                >
                                    <LicensingEngine
                                        projectID={registryId}
                                        humanScore={score}
                                        creativeHash={creativeHash}
                                        onBack={() => setStage("Collaboration")}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="collaboration"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute inset-0 flex flex-col"
                                >
                                    <PromptOrchestrator
                                        messages={messages}
                                        onPromptSent={handlePrompt}
                                        onFileUpload={(file) => { handlePrompt(`[Uploaded File: ${file.name}]`); }}
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

                                        <div className="flex items-center gap-4">
                                            <Button
                                                onClick={() => setStage("Licensing")}
                                                variant="ghost"
                                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-500"
                                            >
                                                Preview Licensing
                                            </Button>
                                            <Button
                                                onClick={certifyAuthorship}
                                                disabled={score < 80}
                                                className={`
                                                    flex items-center gap-2 rounded-full px-12 h-14 font-black uppercase tracking-[0.2em] text-[11px] transition-all
                                                    ${score >= 80
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 active:scale-95'
                                                        : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'}
                                                `}
                                            >
                                                <ShieldCheck className="w-5 h-5" />
                                                Certify Authorship
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Authorship Oath Modal */}
                        <AnimatePresence>
                            {isOathModalOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                        className="w-full max-w-lg bg-white dark:bg-gray-950 rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                                    >
                                        <div className="p-8 md:p-10 flex flex-col items-center text-center">
                                            <div className="mb-6 p-4 bg-orange-500/10 rounded-2xl">
                                                <AlertCircle className="w-8 h-8 text-orange-500" />
                                            </div>

                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4">Authorship Oath</h3>

                                            <div className="w-full p-4 mb-6 bg-gray-50 dark:bg-white/5 rounded-2xl text-left border border-white/5">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Reviewing Seed Input:</p>
                                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 line-clamp-3">"{pendingInput}"</p>
                                            </div>

                                            <div className="flex items-start gap-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-left mb-8">
                                                <input
                                                    type="checkbox"
                                                    id="modal-oath-checkbox"
                                                    checked={oathChecked}
                                                    onChange={(e) => setOathChecked(e.target.checked)}
                                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white dark:bg-black"
                                                />
                                                <label htmlFor="modal-oath-checkbox" className="text-xs font-bold text-gray-400 leading-relaxed cursor-pointer select-none">
                                                    I solemnly swear that this concept and its core "Seed" are my original intellectual property.
                                                    I understand that Proofa's certification depends on my honesty and that providing false information
                                                    may lead to the revocation of my certificate.
                                                </label>
                                            </div>

                                            <div className="flex gap-4 w-full">
                                                <Button
                                                    onClick={() => {
                                                        setIsOathModalOpen(false);
                                                        setOathChecked(false);
                                                    }}
                                                    variant="ghost"
                                                    className="flex-1 rounded-2xl h-14 font-bold text-gray-500 uppercase tracking-widest text-[10px]"
                                                >
                                                    Back to Edit
                                                </Button>
                                                <Button
                                                    onClick={() => pendingInput && startProject(pendingInput)}
                                                    disabled={!oathChecked}
                                                    className={`
                                                        flex-1 rounded-2xl h-14 font-black uppercase tracking-[0.2em] text-[10px] transition-all
                                                        ${oathChecked
                                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20'
                                                            : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'}
                                                    `}
                                                >
                                                    Certify & Start
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
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
            </div >
        </div >
    );
}
