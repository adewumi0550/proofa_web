"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link as Home, ShieldCheck, Hash, Sparkles, AlertCircle, X, Plus, ChevronRight, Upload, Paperclip, Send, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { proofaApi } from "@/lib/api";
import { useAuth } from "@/components/auth-context";
import { useLanguage } from "@/components/language-context";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AuthorshipHUD } from "@/components/dashboard/authorship-hud";
import { LicensingEngine } from "@/components/dashboard/licensing-engine";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme-toggle";
import { UserDropdown } from "@/components/dashboard/user-dropdown";

type Stage = "Collaboration" | "Certified" | "Licensing";

export default function WorkspacePage() {
    const params = useParams();
    const router = useRouter();
    const workspaceId = params.workspaceId as string;
    const { user } = useAuth();
    const { t } = useLanguage();

    const [wsData, setWsData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isMessageSending, setIsMessageSending] = useState(false);
    const [stage, setStage] = useState<Stage>("Collaboration");
    const [score, setScore] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial Data Fetch
    useEffect(() => {
        const init = async () => {
            if (user?.access_token && workspaceId) {
                try {
                    // 1. Get Workspace Details
                    const wsRes = await proofaApi.workspaces.get(workspaceId, user.access_token);
                    if (wsRes.data.success) {
                        setWsData(wsRes.data.data);
                        setScore(wsRes.data.data.current_score || 0);
                        if (wsRes.data.data.status === "LICENSING") setStage("Licensing");
                        else if (wsRes.data.data.status === "CERTIFIED") setStage("Certified");
                    }

                    // 2. Get History
                    const historyRes = await proofaApi.workspaces.getHistory(workspaceId, user.access_token);
                    if (historyRes.data.success && Array.isArray(historyRes.data.data)) {
                        setMessages(historyRes.data.data.map((msg: any) => ({
                            id: msg.id || Date.now().toString() + Math.random(),
                            role: msg.role,
                            content: msg.content
                        })));
                    }
                } catch (e) {
                    console.error("Failed to load workspace", e);
                    toast.error("Failed to load workspace data");
                } finally {
                    setIsLoading(false);
                }
            }
        };
        init();
    }, [workspaceId, user?.access_token]);

    // Auto-scroll chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.access_token) return;

        setUploading(true);
        try {
            const res = await proofaApi.files.upload(file, user.access_token);
            if (res.data.success && res.data.data) {
                setUploadedFileId(res.data.data.upload_id);
                setUploadedFileName(file.name);
                toast.success("File uploaded successfully");
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
            toast.error("Failed to upload file");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async () => {
        if ((!input.trim() && !uploadedFileId) || !user?.access_token) return;

        const userMsg = {
            id: Date.now().toString(),
            role: "user",
            content: input || (uploadedFileId ? `Uploaded file: ${uploadedFileName}` : "")
        };

        setMessages(prev => [...prev, userMsg]);
        setIsMessageSending(true);
        setInput("");
        const currentUploadId = uploadedFileId;
        const currentFileName = uploadedFileName;
        // Reset upload state immediately for next message
        setUploadedFileId(null);
        setUploadedFileName(null);

        try {
            const res = await proofaApi.workspaces.interact(workspaceId, {
                prompt: userMsg.content,
                mode: "chat",
                upload_id: currentUploadId ? [currentUploadId] : []
            }, user.access_token);

            if (res.data.success && res.data.data) {
                const aiResponse = res.data.data.response;
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: aiResponse
                }]);

                // Refresh score implicitly if needed or if backend updates it on conversation
                // Ideally backend returns updated score in response or we fetch it periodically
            }
        } catch (error) {
            console.error("Interaction failed", error);
            toast.error("Failed to send message");
        } finally {
            setIsMessageSending(false);
        }
    };

    const handleCertify = async () => {
        if (!user?.access_token) return;
        try {
            const res = await proofaApi.workspaces.certify(workspaceId, user.access_token);
            // Assuming successful call means it's certified or ready for licensing
            // The prompt implies we check score locally first usually
            if (score >= 80) {
                setStage("Licensing");
                toast.success("Project Certified!");
            } else {
                toast.error(`Score is ${score}/100. Needs 80+ to certify.`);
            }
        } catch (error) {
            console.error("Certification error", error);
            toast.error("Certification check failed");
        }
    };

    if (isLoading) {
        return (
            <div className="bg-[#fbfbfb] dark:bg-[#090909] h-full flex flex-col p-8 items-center justify-center">
                <Skeleton className="w-full max-w-2xl h-96 rounded-3xl" />
            </div>
        );
    }

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-[#fbfbfb] dark:bg-[#090909] flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between shrink-0 px-4 md:px-8 pt-6 pb-4 border-b border-gray-100 dark:border-white/5 mx-0 md:mx-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
                    <Link href="/dashboard" className="font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors shrink-0">
                        {t('dashboard')}
                    </Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="font-bold text-gray-900 dark:text-gray-200 truncate">{wsData?.name || "Project Workspace"}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <ThemeToggle />
                    <UserDropdown />
                </div>
            </header>

            <main className="flex-1 flex min-w-0 relative h-full">
                {/* Chat Area */}
                <div className="flex-1 flex flex-col relative">
                    {/* Mobile/Tablet HUD */}
                    <div className="xl:hidden w-full z-10">
                        <AuthorshipHUD
                            score={score}
                            stage={stage}
                            onCertify={handleCertify}
                            isCertified={stage === "Certified" || stage === "Licensing"}
                        />
                    </div>

                    {stage === "Licensing" ? (
                        <div className="flex-1 p-8 overflow-y-auto">
                            <LicensingEngine
                                projectID={workspaceId}
                                projectName={wsData?.name || "Project"}
                                humanScore={score}
                                creativeHash={wsData?.birth_hash || "hash_pending"}
                                onBack={() => setStage("Collaboration")}
                            />
                        </div>
                    ) : (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar" ref={chatContainerRef}>
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                            <Sparkles className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">Start the conversation to begin collaborating.</p>
                                    </div>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <div key={msg.id || idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[70%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-blue-600 text-white rounded-br-none"
                                                : "bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm"
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isMessageSending && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center space-x-2 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75" />
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-6">
                                <div className="max-w-4xl mx-auto relative bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg shadow-blue-500/5 p-2 flex items-end gap-2">
                                    {/* Upload Button */}
                                    <div className="relative">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`rounded-xl h-10 w-10 ${uploadedFileId ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20" : "text-gray-400 hover:text-gray-600"}`}
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            {uploading ? <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" /> : <Paperclip className="w-5 h-5" />}
                                        </Button>
                                    </div>

                                    {/* Text Area */}
                                    <div className="flex-1 relative">
                                        {uploadedFileName && (
                                            <div className="absolute -top-10 left-0 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                                                <FileText className="w-3 h-3" />
                                                <span className="truncate max-w-[200px]">{uploadedFileName}</span>
                                                <button onClick={() => { setUploadedFileId(null); setUploadedFileName(null); }} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                            </div>
                                        )}
                                        <textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                            placeholder="Type your message..."
                                            className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2.5 text-sm"
                                            rows={1}
                                        />
                                    </div>

                                    {/* Send Button */}
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={(!input.trim() && !uploadedFileId) || isMessageSending}
                                        className="rounded-xl h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white shrink-0 p-0"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="text-center mt-3">
                                    <p className="text-[10px] text-gray-400">
                                        AI may display inaccurate info, so verify its output.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Sidebar - HUD */}
                <div className="w-80 border-l border-gray-100 dark:border-white/5 bg-white dark:bg-[#0c0c0c] p-6 hidden xl:flex flex-col">
                    <AuthorshipHUD
                        score={score}
                        stage={stage}
                        onCertify={handleCertify}
                        isCertified={stage === "Certified" || stage === "Licensing"}
                    />
                </div>
            </main>
        </div>
    );
}

