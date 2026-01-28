"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm, isLoading }: DeleteAccountModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/5 p-6">
                            <div className="flex items-center gap-3 text-red-500">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Delete Account</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-sm text-white/70 leading-relaxed mb-4">
                                Are you sure you want to delete your account? This action is <strong className="text-white">irreversible</strong>.
                            </p>
                            <ul className="space-y-3 text-sm text-white/60 mb-6 bg-white/5 p-4 rounded-lg border border-white/5">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span>All your personal data will be permanently erased.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span>Your Authorship Passports will be anonymized.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span>You will lose access to all generated credits.</span>
                                </li>
                            </ul>

                            <div className="flex gap-3 justify-end mt-2">
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="text-white/70 hover:text-white hover:bg-white/5"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className="bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-900/20"
                                >
                                    {isLoading ? "Deleting..." : "Delete My Account"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
