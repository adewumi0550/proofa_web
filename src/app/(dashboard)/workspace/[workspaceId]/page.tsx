"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link as Home, ShieldCheck, Hash, Sparkles, AlertCircle, X, Plus, ChevronRight, Upload, Paperclip, Send, FileText, ImageIcon } from "lucide-react";
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
import { useSocket } from "@/hooks/use-socket";
import confetti from "canvas-confetti";

type Stage = "Collaboration" | "Certified" | "Licensing";

interface Message {
    id: string;
    role: string;
    content: string;
    upload_url?: string;
    upload_name?: string;
    is_image?: boolean;
    is_video?: boolean;
    verdict?: string;
    reason?: string;
    score?: number;
}

export default function WorkspacePage() {
    const params = useParams();
    const router = useRouter();
    const workspaceId = params.workspaceId as string;
    const { user } = useAuth();
    const { t } = useLanguage();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [wsData, setWsData] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isMessageSending, setIsMessageSending] = useState(false);
    const [stage, setStage] = useState<Stage>("Collaboration");
    const [score, setScore] = useState(0);
    const [verdict, setVerdict] = useState<string | undefined>();
    const [reason, setReason] = useState<string | undefined>();
    const [lastEligibleRef, setLastEligibleRef] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const thinkingSteps = [
        "Analyzing context...",
        "Checking copyright rules...",
        "Validating authorship...",
        "Cross-referencing database...",
        "Finalizing verdict..."
    ];
    const [thinkingStep, setThinkingStep] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isMessageSending) {
            setThinkingStep(0);
            interval = setInterval(() => {
                setThinkingStep((prev) => (prev + 1) % thinkingSteps.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isMessageSending]);

    const normalizeScore = (val: number) => {
        if (val <= 1) return Math.round(val * 100);
        return Math.round(val);
    };

    // WebSocket Integration
    const { status: wsStatus } = useSocket({
        url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws', // Fallback or env
        token: user?.access_token,
        onMessage: (data) => {
            console.log("WS Message:", data);
            if (data.type === 'analysis_update') {
                if (data.score) setScore(data.score);
                if (data.verdict) setVerdict(data.verdict);
                if (data.reason) setReason(data.reason);

                // Optionally append a message or update the last message
                if (data.message) {
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "assistant",
                        content: data.message,
                        verdict: data.verdict,
                        reason: data.reason,
                        score: data.score
                    }]);
                }
            }
        }
    });

    // Watch for eligibility to trigger celebration
    useEffect(() => {
        const isEligible = score >= 85; // Using 85 as the threshold for 'congratulations'
        if (isEligible && !lastEligibleRef && !isLoading) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.7 },
                colors: ['#3b82f6', '#10b981', '#ffffff']
            });
            toast.success("Congratulations! Your work is eligible for IP Certification.", {
                description: "You can now certify this asset and unlock licensing options.",
                duration: 5000,
            });
        }
        setLastEligibleRef(isEligible);
    }, [score, lastEligibleRef, isLoading]);

    // Initial Data Fetch
    useEffect(() => {
        const init = async () => {
            if (user?.access_token && workspaceId) {
                try {
                    // 1. Get Workspace Details
                    const wsRes = await proofaApi.workspaces.get(workspaceId, user.access_token);
                    if (wsRes.data.success) {
                        setWsData(wsRes.data.data);
                        setScore(normalizeScore(wsRes.data.data.current_score || 0));
                        if (wsRes.data.data.status === "LICENSING") setStage("Licensing");
                        else if (wsRes.data.data.status === "CERTIFIED") setStage("Certified");
                    }

                    // 2. Get History
                    const historyRes = await proofaApi.workspaces.getHistory(workspaceId, user.access_token);
                    if (historyRes.data.success && Array.isArray(historyRes.data.data)) {
                        // The backend now returns newest items first, but we want oldest-first for the chat transcript
                        const history = [...historyRes.data.data].reverse();

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const mappedHistory = history.map((msg: any) => {
                            let v = msg.verdict;
                            let r = msg.reason;
                            let s = msg.score ? normalizeScore(msg.score) : undefined;

                            // If content is JSON, parse it to populate missing fields
                            if (msg.role === 'assistant' && msg.content && msg.content.trim().startsWith('{')) {
                                try {
                                    const parsed = JSON.parse(msg.content);
                                    if (!v) v = parsed.verdict || parsed.authorship_verdict;
                                    if (!r) r = parsed.reason || parsed.summary_judgment;
                                    if (s === undefined) {
                                        const rawS = parsed.score ?? parsed.overall_authorship_score;
                                        if (rawS !== undefined) s = normalizeScore(rawS);
                                    }
                                } catch (e) { /* ignore */ }
                            }

                            // Robust media detection
                            const firstFileUrl = (Array.isArray(msg.file_urls) ? msg.file_urls[0] : msg.file_urls) || msg.upload_url || msg.url;

                            const urlLooksLikeImage = firstFileUrl ? /\.(jpg|jpeg|png|gif|webp)/i.test(firstFileUrl) : false;
                            const urlLooksLikeVideo = firstFileUrl ? /\.(mp4|mov|webm|ogg)/i.test(firstFileUrl) : false;

                            let isImg = msg.is_image;
                            if (isImg === undefined || isImg === null || (!isImg && urlLooksLikeImage)) {
                                isImg = urlLooksLikeImage || (msg.upload_name ? /\.(jpg|jpeg|png|gif|webp)/i.test(msg.upload_name) : false);
                            }

                            let isVid = msg.is_video;
                            if (isVid === undefined || isVid === null || (!isVid && urlLooksLikeVideo)) {
                                isVid = urlLooksLikeVideo || (msg.upload_name ? /\.(mp4|mov|webm|ogg)/i.test(msg.upload_name) : false);
                            }

                            return {
                                id: msg.id || Date.now().toString() + Math.random(),
                                role: msg.role,
                                content: msg.content,
                                verdict: v,
                                reason: r,
                                score: s,
                                upload_url: firstFileUrl,
                                upload_name: msg.upload_name || (firstFileUrl ? "Attachment" : undefined),
                                is_image: !!isImg,
                                is_video: !!isVid
                            };
                        });

                        setMessages(mappedHistory);

                        // Restore HUD state from latest assistant analysis if history exists
                        const latestAssistant = [...mappedHistory].reverse().find(m => m.role === 'assistant' && (m.score !== undefined || m.verdict || (m.content && m.content.trim().startsWith('{'))));
                        if (latestAssistant) {
                            if (latestAssistant.score !== undefined) setScore(latestAssistant.score);
                            if (latestAssistant.verdict) setVerdict(latestAssistant.verdict);
                            if (latestAssistant.reason) setReason(latestAssistant.reason);
                        }
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

        // Restore draft
        const draft = localStorage.getItem(`draft_${workspaceId}`);
        if (draft) setInput(draft);
    }, [workspaceId, user?.access_token]);

    // Save draft
    useEffect(() => {
        if (workspaceId) {
            localStorage.setItem(`draft_${workspaceId}`, input);
        }
    }, [input, workspaceId]);

    // Auto-scroll chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);


    const handleFileProcess = async (file: File) => {
        if (!file || !user?.access_token) return;

        setUploading(true);
        setUploadProgress(0);

        // Optimistic preview URL
        const previewUrl = URL.createObjectURL(file);
        const isImage = file.type.startsWith('image/');

        try {
            const res = await proofaApi.files.upload(file, user.access_token, (progress) => {
                setUploadProgress(progress);
            });

            if (res.data.success && res.data.data) {
                const uploadData = res.data.data;
                setUploadedFileId(uploadData.upload_id);
                setUploadedFileName(file.name);
                // Use backend URL if available, otherwise fallback to blob preview
                setUploadedFileUrl(isImage ? (uploadData.url || previewUrl) : null);
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
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileProcess(file);
    };

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Necessary to allow drop
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounter.current = 0;

        const file = e.dataTransfer.files?.[0];
        if (file) handleFileProcess(file);
    }, []);


    const handleSendMessage = async () => {
        if ((!input.trim() && !uploadedFileId) || !user?.access_token) return;

        const currentUploadId = uploadedFileId;
        const currentFileName = uploadedFileName;
        const currentFileUrl = uploadedFileUrl;

        const isImage = !!currentFileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            upload_name: currentFileName || undefined,
            upload_url: currentFileUrl || undefined,
            is_image: isImage
        };

        // If solely an upload without text, we can add a system note or just show the file
        if (!input.trim() && currentFileName) {
            userMsg.content = `Uploaded file: ${currentFileName}`;
        }

        setMessages(prev => [...prev, userMsg]);
        setIsMessageSending(true);
        setInput("");
        localStorage.removeItem(`draft_${workspaceId}`);

        // Reset upload state immediately for next message
        setUploadedFileId(null);
        setUploadedFileName(null);
        setUploadedFileUrl(null);

        try {
            const res = await proofaApi.workspaces.interact(workspaceId, {
                prompt: userMsg.content,
                mode: "chat",
                upload_id: currentUploadId ? [currentUploadId] : []
            }, user.access_token);

            if (res.data.success && res.data.data) {
                const data = res.data.data;

                // Structured Response Handling
                // { success: true, message: "...", data: { score: 0.95, verdict: "...", reason: "...", reply: "..." } }

                // Prioritize 'reply' or 'response' for the chat bubble
                // Map backend fields: overall_authorship_score -> score, authorship_verdict -> verdict, summary_judgment -> reason
                const aiContent = data.reply || data.response || data.message || data.answer || data.content || data.summary_judgment;

                const scoreVal = data.score ?? data.overall_authorship_score;
                const verdictVal = data.verdict || data.authorship_verdict;
                const reasonVal = data.reason || data.summary_judgment;

                const aiMsg: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: aiContent,
                    verdict: verdictVal,
                    reason: reasonVal,
                    score: scoreVal !== undefined ? normalizeScore(scoreVal) : undefined
                };

                setMessages(prev => [...prev, aiMsg]);

                // Update HUD state
                if (scoreVal !== undefined) setScore(normalizeScore(scoreVal));
                if (verdictVal) setVerdict(verdictVal);
                if (reasonVal) setReason(reasonVal);

            }
        } catch (error) {
            console.error("Interaction failed", error);
            toast.error("Failed to send message. Please refresh or relogin if this persists.");
        } finally {
            setIsMessageSending(false);
        }
    };

    const handleCertify = async () => {
        if (!user?.access_token) return;
        try {
            const res = await proofaApi.workspaces.certify(workspaceId, user.access_token);
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

    // Circular Progress Component
    const CircularProgress = ({ value }: { value: number }) => {
        const radius = 10;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (value / 100) * circumference;

        return (
            <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        cx="16" cy="16" r={radius}
                        stroke="currentColor" strokeWidth="3" fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                        cx="16" cy="16" r={radius}
                        stroke="currentColor" strokeWidth="3" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="text-blue-500 transition-all duration-300 ease-in-out"
                    />
                </svg>
                <div className="absolute text-[8px] font-bold text-blue-500">{value}</div>
            </div>
        );
    };

    return (
        <div
            className="relative h-full w-full bg-[#fbfbfb] dark:bg-[#090909] flex flex-col overflow-hidden"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
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

            <main className="flex-1 flex min-w-0 relative h-full overflow-hidden">
                {/* Chat Area */}
                <div
                    className="flex-1 flex flex-col relative"
                >
                    {/* Drag Overlay */}
                    <AnimatePresence>
                        {isDragging && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-blue-500/10 backdrop-blur-sm border-2 border-dashed border-blue-500 m-4 rounded-3xl flex flex-col items-center justify-center pointer-events-none"
                            >
                                <Upload className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
                                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Drop files here to upload</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile/Tablet HUD */}
                    <div className="xl:hidden w-full z-10">
                        <AuthorshipHUD
                            score={score}
                            stage={stage}
                            onCertify={handleCertify}
                            isCertified={stage === "Certified" || stage === "Licensing"}
                            verdict={verdict}
                            reason={reason}
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
                            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 custom-scrollbar pb-8" ref={chatContainerRef}>
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
                                            <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[70%]`}>
                                                {/* Image Rendering */}
                                                {msg.upload_url && msg.is_image && (
                                                    <div className={`p-2 rounded-2xl ${msg.role === "user" ? "bg-blue-600 rounded-br-none" : "bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-bl-none"} mb-1`}>
                                                        <img
                                                            src={msg.upload_url}
                                                            alt="Uploaded content"
                                                            className="rounded-xl max-w-full max-h-60 object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {/* Video Rendering */}
                                                {msg.upload_url && msg.is_video && (
                                                    <div className={`p-2 rounded-2xl ${msg.role === "user" ? "bg-blue-600 rounded-br-none" : "bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-bl-none"} mb-1`}>
                                                        <video
                                                            src={msg.upload_url}
                                                            controls
                                                            className="rounded-xl max-w-full max-h-60"
                                                        />
                                                    </div>
                                                )}

                                                {/* File Attachment Pill if not image/video or as supplement */}
                                                {msg.upload_name && !msg.is_image && !msg.is_video && (
                                                    <div className={`flex items-center gap-2 p-3 text-xs rounded-xl ${msg.role === "user"
                                                        ? "bg-blue-700/50 text-white"
                                                        : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                                                        }`}>
                                                        <FileText className="w-4 h-4" />
                                                        <span className="truncate">{msg.upload_name}</span>
                                                    </div>
                                                )}

                                                {/* Text Content or Analysis Card */}
                                                {(() => {
                                                    // Helper to check for JSON content
                                                    let structuredData = null;
                                                    if (msg.content) {
                                                        const trimmed = msg.content.trim();
                                                        try {
                                                            // Detect if the message is or contains a JSON object
                                                            if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                                                                const parsed = JSON.parse(trimmed);
                                                                if (parsed.verdict || parsed.score !== undefined || parsed.reason) {
                                                                    structuredData = parsed;
                                                                }
                                                            }
                                                        } catch (e) {
                                                            // Not valid JSON object, ignore
                                                        }
                                                    }

                                                    if (structuredData) {
                                                        return (
                                                            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl rounded-bl-none p-4 shadow-sm w-full max-w-md">
                                                                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100 dark:border-white/5">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                                            Analysis
                                                                        </div>
                                                                        <span className="text-xs text-gray-400 font-mono">
                                                                            {(() => {
                                                                                const timestamp = Number(msg.id);
                                                                                if (!isNaN(timestamp)) {
                                                                                    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                                                }
                                                                                return "Recent";
                                                                            })()}
                                                                        </span>
                                                                    </div>
                                                                    {structuredData.score !== undefined && (
                                                                        <div className="flex items-center gap-1.5">
                                                                            <span className="text-xs text-gray-500">Score</span>
                                                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                                                {structuredData.score > 1 ? structuredData.score : Math.round(structuredData.score * 100)}%
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {structuredData.verdict && (
                                                                    <div className={`text-sm font-bold mb-2 ${structuredData.verdict.toLowerCase().includes('denied')
                                                                        ? "text-red-600 dark:text-red-400"
                                                                        : "text-green-600 dark:text-green-400"
                                                                        }`}>
                                                                        {structuredData.verdict}
                                                                    </div>
                                                                )}

                                                                {structuredData.reason && (
                                                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-0">
                                                                        {structuredData.reason}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    }

                                                    // Standard Text Fallback
                                                    if (msg.content && msg.content !== `Uploaded file: ${msg.upload_name}`) {
                                                        return (
                                                            <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${msg.role === "user"
                                                                ? "bg-blue-600 text-white rounded-br-none"
                                                                : "bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm"
                                                                }`}>
                                                                {msg.content}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })()}
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isMessageSending && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center space-x-3 bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                                            <div className="flex space-x-1">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-75" />
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150" />
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium min-w-[140px]">
                                                {thinkingSteps[thinkingStep]}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 md:p-6 shrink-0 z-20 bg-white dark:bg-[#090909] border-t border-gray-100 dark:border-white/5">
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
                                            {uploading ? (
                                                <CircularProgress value={uploadProgress} />
                                            ) : (
                                                <Paperclip className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </div>

                                    {/* Text Area */}
                                    <div className="flex-1 relative">
                                        {uploadedFileName && (
                                            <div className="absolute -top-12 left-0 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                                                {uploadedFileUrl && uploadedFileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                                    <ImageIcon className="w-3 h-3" />
                                                ) : (
                                                    <FileText className="w-3 h-3" />
                                                )}
                                                <span className="truncate max-w-[200px] font-medium">{uploadedFileName}</span>
                                                <button onClick={() => {
                                                    setUploadedFileId(null);
                                                    setUploadedFileName(null);
                                                    setUploadedFileUrl(null);
                                                }} className="hover:bg-blue-100 dark:hover:bg-blue-800/30 p-0.5 rounded-full transition-colors ml-1">
                                                    <X className="w-3 h-3" />
                                                </button>
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
                                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-32 py-2.5 text-sm"
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
                        verdict={verdict}
                        reason={reason}
                    />
                </div>
            </main>
        </div>
    );
}

