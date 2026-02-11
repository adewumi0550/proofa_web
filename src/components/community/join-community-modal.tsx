"use client";

import React from "react";
import { X, Users, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

interface JoinCommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    communityName: string;
    isLoading?: boolean;
}

export function JoinCommunityModal({
    isOpen,
    onClose,
    onConfirm,
    communityName,
    isLoading = false
}: JoinCommunityModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0A0A] shadow-2xl ring-1 ring-white/5"
                    >
                        {/* Header Image/Icon */}
                        <div className="h-24 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid-dark.svg')] opacity-30" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
                            <div className="absolute top-6 left-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-sm z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Join Community?</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Are you sure you want to join <strong className="text-white">{communityName}</strong>? You will be able to post and interact with other members.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    className="flex-1 h-12 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-900/20 font-bold"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Joining...</span>
                                        </div>
                                    ) : (
                                        <>
                                            Join Now
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
