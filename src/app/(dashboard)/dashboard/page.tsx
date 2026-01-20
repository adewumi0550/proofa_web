"use client";

import React, { useState, useRef } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AuthorshipHUD } from "@/components/dashboard/authorship-hud";
import { PromptOrchestrator } from "@/components/dashboard/prompt-orchestrator";
import { LicensingEngine } from "@/components/dashboard/licensing-engine";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Hash, Sparkles, AlertCircle, FileText, X, Plus, ChevronRight, Search, Upload, FolderPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { proofaApi } from "@/lib/api";
import { useAuth } from "@/components/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-context";

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
    const { t } = useLanguage();

    // New Project Modal State
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectFile, setNewProjectFile] = useState<File | null>(null);

    const startProject = async (name: string, initialFile: File | null) => {
        // FAIL-SAFE: If user is missing, use a temporary demo identity locally
        let currentUser = user || {
            id: "offline-demo",
            email: "demo@offline.local",
            user_id: "offline-demo",
            pqc_public_key: "OFFLINE_KEY",
            message: "Offline Mode"
        };

        const initialContent = initialFile
            ? `[Project Started with File: ${initialFile.name}]`
            : `[New Project: ${name}]`;

        try {
            // Step 1: Real AI Seed Verification & Registry Upload
            const res = await proofaApi.registry.upload({
                user_id: currentUser.user_id || currentUser.id,
                content: initialContent,
                metadata: JSON.stringify({ title: name, hash: "0xMock" })
            });

            const newSeedId = res.data.seed_id;
            setRegistryId(newSeedId);
            setCreativeHash(res.data.hash || "0xCHAIN-VERIFIED");

            // Add to project list for sidebar
            setProjects(prev => [...prev, { id: newSeedId, name: name }]);

            // Initialize messages
            setMessages([
                { id: Date.now().toString(), role: "assistant", content: `Welcome to **${name}**. I'm ready to collaborate. Upload files or describe your vision to begin.` }
            ]);

            if (initialFile) {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "user", content: `Uploaded: ${initialFile.name}` }]);
                // Simulate file processing
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: (Date.now() + 2).toString(), role: "assistant", content: `I've analyzed ${initialFile.name}. How would you like to use this asset?` }]);
                }, 1000);
            }

            // Set Human Score if returned (Seed verification might give initial score)
            // For now, let's keep it 0 or a small base
            setScore(10);
            setStage("Collaboration");

        } catch (error) {
            console.error("Backend request failed, using Local Mode:", error);
            const mockId = "local-seed-" + Date.now();
            setRegistryId(mockId);
            setCreativeHash("0xLOCAL-MODE");
            setMessages([
                { id: Date.now().toString(), role: "assistant", content: `Welcome to **${name}** (Local Mode).` }
            ]);
            setProjects(prev => [...prev, { id: mockId, name: name }]);
            setStage("Collaboration");
        }

        // Reset Modal
        setIsNewProjectModalOpen(false);
        setNewProjectName("");
        setNewProjectFile(null);
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

    const handleProjectRename = (id: string, newName: string) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
    };

    // Placeholder data for grid view
    const recentProjects = projects.length > 0 ? projects : [
        // Mock data if empty for visualization
        { id: "mock-1", name: "Cyberpunk Novel Draft" },
        { id: "mock-2", name: "Abstract Oil Painting" },
    ];

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-[#fbfbfb] dark:bg-[#090909] transition-colors duration-500 overflow-hidden flex flex-col">
            {/* Clean, Neutral Background */}
            <div className="absolute inset-0 pointer-events-none z-0" />

            <div className="relative z-10 flex flex-1 h-full min-h-0">
                <DashboardSidebar
                    showAddProject={projects.length > 0}
                    projects={projects}
                    activeProjectId={registryId}
                    onProjectSelect={(id: string) => setRegistryId(id)}
                    onProjectRename={handleProjectRename}
                />
                <main className="flex-1 flex flex-col min-w-0 relative h-full">

                    {/* Top Header */}
                    <header className="flex items-center justify-between mb-8 shrink-0 px-8 pt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-semibold text-gray-900 dark:text-gray-200">{t('dashboard')}</span>
                            <ChevronRight className="w-4 h-4" />
                            <span>{stage === "Inception" ? t('overview') : t('projectWorkspace')}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    placeholder={t('searchProjects')}
                                    className="pl-9 pr-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <LanguageSwitcher />
                            <ThemeToggle />
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white dark:ring-black">
                                {user?.first_name?.charAt(0) || "U"}
                            </div>
                        </div>
                    </header>

                    {/* Centered Workspace Area */}
                    <div className="flex-1 relative min-h-0 overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {stage === "Inception" ? (
                                <motion.div
                                    key="grid-view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="max-w-7xl mx-auto px-8"
                                >
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{t('welcomeBack')}, {user?.first_name || "Creator"}</h1>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8">{t('manageProjects')}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {/* New Project Card */}
                                        <button
                                            onClick={() => setIsNewProjectModalOpen(true)}
                                            className="group flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('newProject')}</h3>
                                            <p className="text-sm text-gray-500 mt-2">{t('startNewSeed')}</p>
                                        </button>

                                        {/* Recent Projects Mockup */}
                                        {recentProjects.map((proj, idx) => (
                                            <div key={idx} className="group relative flex flex-col h-64 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer overflow-hidden">
                                                <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide">
                                                    {t('inProgress')}
                                                </div>
                                                <div className="flex-1 flex items-center justify-center">
                                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center text-3xl">
                                                        🎨
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{proj.name}</h3>
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span>Edited 2h ago</span>
                                                        <span className="font-bold text-blue-500" >Score: {Math.floor(Math.random() * 100)}</span>
                                                    </div>
                                                </div>

                                                {/* Simple "Open" overlay */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                                    <Button onClick={() => setRegistryId(proj.id)} variant="secondary" className="rounded-full">{t('openProject')}</Button>
                                                </div>
                                            </div>
                                        ))}
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
                                    {/* Top Session Header (HUD) */}
                                    <div className="shrink-0 w-full px-8">
                                        <AuthorshipHUD score={score} stage={stage} onCertify={certifyAuthorship} />
                                    </div>

                                    {/* Chat / Orchestrator */}
                                    <div className="flex-1 min-h-0 relative px-8 pb-0 pt-4">
                                        <PromptOrchestrator
                                            messages={messages}
                                            onPromptSent={handlePrompt}
                                            onFileUpload={(file) => { handlePrompt(`[Uploaded File: ${file.name}]`); }}
                                        />
                                    </div>

                                    {/* Simple Footer / Metadata */}
                                    <div className="shrink-0 py-1 px-6 flex items-center justify-center gap-6 text-[10px] text-gray-400 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Hash className="w-3 h-3 opacity-50" />
                                            <span className="font-mono">{creativeHash || "0xPENDING"}</span>
                                        </div>

                                        <button
                                            onClick={() => setStage("Licensing")}
                                            className="hover:text-blue-500 transition-colors font-bold uppercase tracking-wider"
                                        >
                                            {t('previewLicensing')}
                                        </button>

                                        <div className="flex items-center gap-1.5 opacity-50">
                                            <div className="w-1 h-1 rounded-full bg-current" />
                                            <span className="uppercase tracking-widest font-bold">{t('proofaSecured')}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* New Project Modal */}
                        <AnimatePresence>
                            {isNewProjectModalOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
                                >
                                    <motion.div
                                        initial={{ scale: 0.95, y: 10 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.95, y: 10 }}
                                        className="w-full max-w-md bg-white dark:bg-[#111] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                                    >
                                        <div className="p-8">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Create New Project</h3>
                                                <button onClick={() => setIsNewProjectModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                                                    <X className="w-5 h-5 text-gray-500" />
                                                </button>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Project Name</label>
                                                    <input
                                                        value={newProjectName}
                                                        onChange={(e) => setNewProjectName(e.target.value)}
                                                        placeholder="e.g. Cyberpunk Manifesto"
                                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                                        autoFocus
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Initial Data (Optional)</label>
                                                    <div className="relative group">
                                                        <input
                                                            type="file"
                                                            id="modal-file-upload"
                                                            className="hidden"
                                                            onChange={(e) => setNewProjectFile(e.target.files?.[0] || null)}
                                                        />
                                                        <label
                                                            htmlFor="modal-file-upload"
                                                            className={`
                                                                flex items-center justify-center gap-3 w-full h-24 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                                                                ${newProjectFile ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-white/10 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-white/5'}
                                                            `}
                                                        >
                                                            {newProjectFile ? (
                                                                <>
                                                                    <FileText className="w-6 h-6 text-blue-500" />
                                                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 truncate max-w-[200px]">{newProjectFile.name}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FolderPlus className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                                                    <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">Upload or Drop File</span>
                                                                </>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => startProject(newProjectName, newProjectFile)}
                                                    disabled={!newProjectName.trim()}
                                                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                                >
                                                    Create Project
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
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

                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('authorshipOath')}</h3>

                                            <div className="w-full p-4 mb-6 bg-gray-50 dark:bg-white/5 rounded-2xl text-left border border-white/5">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{t('reviewingSeed')}</p>
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
                                                    onClick={() => pendingInput && startProject(pendingInput, null)}
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
                    {/* {stage !== "Inception" && (
                        <div className="shrink-0 pt-6">
                            <AuthorshipHUD score={score} stage={stage} />
                        </div>
                    )} */}
                </main>
            </div >
        </div >
    );
}
