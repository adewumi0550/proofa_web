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
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface PromptOrchestratorProps {
    onPromptSent: (content: string) => boolean | Promise<boolean> | void;
    onFileUpload: (file: File) => void;
    messages: Message[];
}

export function PromptOrchestrator({ onPromptSent, onFileUpload, messages }: PromptOrchestratorProps) {
    const [input, setInput] = useState("");
    const [selectedModel, setSelectedModel] = useState("Pro v1.5 Engine");
    const [activeMode, setActiveMode] = useState<"art" | "video" | "music" | "voice">("art");
    const [isModelsOpen, setIsModelsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [availableModels] = useState([
        "Pro v1.5 Engine",
        "Creative Diffusion",
        "Sonic Synth",
        "Motion Core",
        "Voice Weaver",
        "Analysis Hub"
    ]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const result = await onPromptSent(input);
        if (result !== false) setInput("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileUpload(file);
    };

    return (
        <div className="flex flex-col h-full crystal-view rounded-2xl overflow-hidden">

            {/* Model Selection & Mode Bar */}
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
                    <ModeTab active={activeMode === 'art'} icon={<ImageIcon className="w-4 h-4" />} label="Art" onClick={() => setActiveMode('art')} />
                    <ModeTab active={activeMode === 'video'} icon={<Video className="w-4 h-4" />} label="Video" onClick={() => setActiveMode('video')} />
                    <ModeTab active={activeMode === 'music'} icon={<Music className="w-4 h-4" />} label="Music" onClick={() => setActiveMode('music')} />
                    <ModeTab active={activeMode === 'voice'} icon={<Mic className="w-4 h-4" />} label="Voice" onClick={() => setActiveMode('voice')} />
                </div>
            </div>

            {/* Message History */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar"
            >
                {messages.length === 0 ? (
                    <div
                        className={`
                            h-full flex flex-col items-center justify-center transition-all duration-300 rounded-[32px]
                            ${isDragging ? 'bg-blue-500/5 scale-105 border-2 border-dashed border-blue-500/50' : 'opacity-40'}
                        `}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            const file = e.dataTransfer.files[0];
                            if (file) onFileUpload(file);
                        }}
                    >
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                w-20 h-20 border-2 border-dashed rounded-3xl flex items-center justify-center mb-6 transition-all duration-500
                                ${isDragging ? 'bg-blue-500 border-blue-400 scale-110 rotate-90' : 'border-gray-300 dark:border-white/20 hover:border-blue-500 hover:bg-blue-500/5'}
                            `}
                        >
                            <Plus className={`w-8 h-8 transition-colors ${isDragging ? 'text-white' : 'text-gray-400'}`} />
                        </button>
                        <p className={`text-[11px] font-black uppercase tracking-[0.4em] transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-500'}`}>
                            {isDragging ? 'Drop Image Here' : 'Workspace Active'}
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
                                {m.content}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Section */}
            {/* Input Section */}
            <div className="p-6 pt-0">
                <div className="flex items-end gap-4 glass-button border-0 rounded-2xl p-2 pl-4 shadow-none hover:shadow-lg">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 mb-1 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                        <Upload className="w-5 h-5" />
                    </button>

                    <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mb-2" />

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={`Enter creative command for ${activeMode} mode...`}
                        className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-bold text-gray-900 dark:text-white resize-none min-h-[80px] py-3 custom-scrollbar placeholder:text-gray-400"
                    />

                    <Button
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[10px] mb-1 shadow-lg shadow-blue-500/20"
                    >
                        Send
                    </Button>
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
