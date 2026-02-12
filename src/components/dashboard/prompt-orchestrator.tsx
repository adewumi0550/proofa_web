"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    Upload,
    Cpu,
    Video,
    Music,
    Mic,
    Plus,
    ChevronDown,
    Trash2,
    Image as ImageIcon,
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from "@/components/language-context";
import { translations } from "@/lib/translations";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface PromptOrchestratorProps {
    onPromptSent: (content: string, file?: File) => boolean | Promise<boolean> | void;
    // onFileUpload removed as we handle it internally and pass with prompt
    messages: Message[];
}

export function PromptOrchestrator({ onPromptSent, messages }: PromptOrchestratorProps) {
    const { t } = useLanguage();
    const [input, setInput] = useState("");
    const [stagedFile, setStagedFile] = useState<File | null>(null); // New state for staged file
    const [selectedModel, setSelectedModel] = useState("Pro v1.5 Engine");
    const [activeMode, setActiveMode] = useState<"art" | "video" | "music" | "voice">("art");
    const [isModelsOpen, setIsModelsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    // Models per mode configuration
    const modelsByMode: Record<string, string[]> = {
        art: ["Pro v1.5 Engine", "Creative Diffusion", "Analysis Hub"],
        video: ["Pro v1.5 Engine", "Motion Core", "Nano banana", "Veo", "Analysis Hub"],
        music: ["Pro v1.5 Engine", "Sonic Synth", "Analysis Hub"],
        voice: ["Pro v1.5 Engine", "Voice Weaver", "Analysis Hub"],
    };

    const availableModels = modelsByMode[activeMode] || modelsByMode.art;

    // Reset selected model if not available in new mode
    useEffect(() => {
        if (!availableModels.includes(selectedModel)) {
            setSelectedModel(availableModels[0]);
        }
    }, [activeMode, availableModels, selectedModel]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() && !stagedFile) return;

        // Pass both input and stagedFile
        const result = await onPromptSent(input, stagedFile || undefined);

        if (result !== false) {
            setInput("");
            setStagedFile(null); // Clear staged file after send
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setStagedFile(file); // Stage it
    };

    // ... (Drag handlers mostly same, but update drop)
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current += 1;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current -= 1;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounter.current = 0;

        const file = e.dataTransfer.files[0];
        if (file) setStagedFile(file); // Stage it
    };

    return (
        <div
            className="flex flex-col h-full crystal-view rounded-2xl overflow-hidden relative"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-blue-600/10 backdrop-blur-sm border-2 border-dashed border-blue-500 rounded-2xl flex flex-col items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-2xl flex flex-col items-center pointer-events-none"
                        >
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                                <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{t('dropFileHere')}</h3>
                            <p className="text-sm font-bold text-gray-500">{t('addAssets')}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ... (Model Selection & Mode Bar unchanged) ... */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50 dark:bg-white/2">
                <div className="relative">
                    <button
                        onClick={() => setIsModelsOpen(!isModelsOpen)}
                        className="flex items-center gap-3 px-4 py-2 glass-button rounded-xl text-xs font-bold transition-all"
                    >
                        <Cpu className="w-4 h-4 text-blue-500" />
                        {selectedModel}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isModelsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isModelsOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsModelsOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-950 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl z-20"
                                >
                                    <div className="py-2">
                                        {availableModels.map((model) => (
                                            <button
                                                key={model}
                                                className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${selectedModel === model ? 'text-blue-500' : 'text-gray-500'}`}
                                                onClick={() => { setSelectedModel(model); setIsModelsOpen(false); }}
                                            >
                                                {model}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex gap-2">
                    <ModeTab active={activeMode === 'art'} icon={<ImageIcon className="w-4 h-4" />} label={t('modeArt')} onClick={() => setActiveMode('art')} />
                    <ModeTab active={activeMode === 'video'} icon={<Video className="w-4 h-4" />} label={t('modeVideo')} onClick={() => setActiveMode('video')} />
                    <ModeTab active={activeMode === 'music'} icon={<Music className="w-4 h-4" />} label={t('modeMusic')} onClick={() => setActiveMode('music')} />
                    <ModeTab active={activeMode === 'voice'} icon={<Mic className="w-4 h-4" />} label={t('modeVoice')} onClick={() => setActiveMode('voice')} />
                </div>
            </div>

            {/* Message History */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar"
            >
                {/* ... (Existing Message Map) ... */}
                {messages.length === 0 ? (
                    <div
                        className={`
                            h-full flex flex-col items-center justify-center transition-all duration-300 rounded-[32px]
                            ${isDragging ? 'opacity-0' : 'opacity-100'}
                        `}
                    >
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-blue-500 hover:bg-blue-500/5 rounded-3xl flex items-center justify-center mb-6 transition-all duration-300 group"
                        >
                            <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </button>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500">
                            {t('workspaceActive')}
                        </p>
                    </div>
                ) : (
                    messages.map((m) => (
                        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                max-w-[80%] px-6 py-4 rounded-2xl text-sm font-bold leading-relaxed
                ${m.role === 'user'
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/10'
                                    : 'crystal-view text-gray-900 dark:text-gray-100 border-0'}
              `}>
                                <ReactMarkdown
                                    components={{
                                        p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                                        strong: ({ node, ...props }) => <span {...props} className="font-black text-blue-600 dark:text-blue-400" />
                                    }}
                                >
                                    {m.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Section - Smart & Responsive */}
            <div className="shrink-0 p-4 md:p-6 pt-0">
                <div className="relative group p-[1px] rounded-[24px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 hover:from-blue-500/40 hover:via-purple-500/40 hover:to-blue-500/40 transition-all duration-300">
                    <div className="flex flex-col bg-white dark:bg-[#0A0A0A] backdrop-blur-xl rounded-[23px] p-2 shadow-2xl shadow-blue-900/5">

                        {/* Staged File Preview */}
                        {stagedFile && (
                            <div className="flex items-center justify-between px-4 py-2 mb-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center shrink-0">
                                        <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <span className="text-xs font-bold text-blue-900 dark:text-blue-100 truncate">{stagedFile.name}</span>
                                </div>
                                <button
                                    onClick={() => setStagedFile(null)}
                                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className="flex items-end gap-2 pl-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 mb-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-500 dark:text-gray-300 rounded-full transition-all"
                                title="Add Attachment"
                            >
                                <Plus className="w-5 h-5" />
                            </button>

                            <div className="h-8 w-px bg-gray-100 dark:bg-white/5 mb-2 mx-1" />

                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder={stagedFile ? t('describeFile') : t('enterCreativeCommand').replace('{mode}', t(`mode${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)}` as keyof typeof translations.en))}
                                className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm md:text-base font-medium text-gray-900 dark:text-white resize-none min-h-[56px] py-4 px-2 custom-scrollbar placeholder:text-gray-400"
                                style={{ maxHeight: '200px' }}
                            />

                            <Button
                                onClick={handleSend}
                                disabled={!input.trim() && !stagedFile}
                                className={`
                                    mb-1 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                                    ${(input.trim() || stagedFile)
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 scale-100'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 scale-90 cursor-not-allowed'}
                                `}
                            >
                                <Send className="w-5 h-5 ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModeTab({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                ${active
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}
            `}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}
