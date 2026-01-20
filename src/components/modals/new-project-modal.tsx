"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNewProject } from "@/components/new-project-context";
import { useAuth } from "@/components/auth-context";
import { proofaApi } from "@/lib/api";
import { useRouter } from "next/navigation";

export function NewProjectModal() {
    const { isOpen, closeNewProjectModal } = useNewProject();
    const { user } = useAuth();
    const router = useRouter();

    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [isOathChecked, setIsOathChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const startProject = async () => {
        setIsLoading(true);
        // FAIL-SAFE: If user is missing, use a temporary demo identity locally
        let currentUser = user || {
            id: "offline-demo",
            email: "demo@offline.local",
            user_id: "offline-demo",
            pqc_public_key: "OFFLINE_KEY",
            message: "Offline Mode",
            access_token: ""
        };

        const initialContent = newProjectDescription;

        try {
            if (currentUser.access_token) {
                // Step 1: Real API Create Workspace
                const res = await proofaApi.workspaces.create({
                    name: newProjectName,
                    seed_content: initialContent || `Project: ${newProjectName}`,
                    oath_signed: true
                }, currentUser.access_token);

                if (res.data.success && res.data.data) {
                    const newWorkspace = res.data.data;
                    const newId = newWorkspace.id;

                    // Redirect to dashboard with new project ID
                    router.push(`/dashboard?projectId=${newId}`);
                }
            } else {
                throw new Error("No access token available (Offline Mode)");
            }

        } catch (error) {
            console.error("Backend request failed, using Local Mode:", error);
            const mockId = "local-seed-" + Date.now();
            // In local mode, we also redirect
            router.push(`/dashboard?projectId=${mockId}`);
        } finally {
            setIsLoading(false);
            // Reset and Close
            setNewProjectName("");
            setNewProjectDescription("");
            setIsOathChecked(false);
            closeNewProjectModal();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                                <button onClick={closeNewProjectModal} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
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
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Project Description & Seed</label>
                                    <textarea
                                        value={newProjectDescription}
                                        onChange={(e) => setNewProjectDescription(e.target.value)}
                                        placeholder="Describe your project's core concept..."
                                        className="w-full h-32 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 font-medium text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                                    />
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                                    <input
                                        type="checkbox"
                                        id="new-project-oath"
                                        checked={isOathChecked}
                                        onChange={(e) => setIsOathChecked(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="new-project-oath" className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300 font-medium cursor-pointer select-none">
                                        By creating this project, you acknowledge that you are the original creator of this concept and agree to comply with the <span className="font-bold underline">EU AI Act</span> regulations regarding transparency and authorship disclosure. This action acts as a digital oath.
                                    </label>
                                </div>

                                <Button
                                    onClick={startProject}
                                    disabled={!newProjectName.trim() || !isOathChecked || isLoading}
                                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {isLoading ? "Creating..." : "Create Project"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
