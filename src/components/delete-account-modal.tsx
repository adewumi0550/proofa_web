"use client";

import React, { useState } from "react";
import { X, AlertTriangle, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    isLoading: boolean;
}

const DELETION_REASONS = [
    "I no longer find the service useful",
    "It's too expensive",
    "I found a better alternative",
    "Technical issues/bugs",
    "Other"
];

export function DeleteAccountModal({ isOpen, onClose, onConfirm, isLoading }: DeleteAccountModalProps) {
    const [step, setStep] = useState<"warning" | "reason">("warning");
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [customReason, setCustomReason] = useState("");

    // Reset state when opening
    React.useEffect(() => {
        if (isOpen) {
            setStep("warning");
            setSelectedReason("");
            setCustomReason("");
        }
    }, [isOpen]);

    const handleConfirm = () => {
        const finalReason = selectedReason === "Other" ? customReason : selectedReason;
        onConfirm(finalReason || "No reason provided");
    };

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
                        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0A0A] shadow-2xl ring-1 ring-white/5"
                    >
                        {/* Header Image/Icon */}
                        <div className="h-32 bg-gradient-to-br from-red-900/20 via-orange-900/10 to-transparent relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid-dark.svg')] opacity-30" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/20 blur-[60px] rounded-full" />
                            <div className="absolute top-6 left-6 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-sm z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {step === "warning" ? (
                                    <motion.div
                                        key="warning"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Final Warning</h2>
                                            <p className="text-gray-400 leading-relaxed">
                                                You are about to permanently delete your account. This action <strong className="text-white">cannot be undone</strong>.
                                            </p>
                                        </div>

                                        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                <p className="text-sm text-gray-300">All your generated assets and passports will be lost.</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                <p className="text-sm text-gray-300">Active subscriptions will be cancelled immediately.</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                <p className="text-sm text-gray-300">You will lose access to all credits.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                variant="ghost"
                                                onClick={onClose}
                                                className="flex-1 h-12 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
                                            >
                                                Keep Account
                                            </Button>
                                            <Button
                                                onClick={() => setStep("reason")}
                                                className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg shadow-red-900/20 font-bold"
                                            >
                                                Continue
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="reason"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-2">We're sorry to see you go</h2>
                                            <p className="text-sm text-gray-400">Please tell us why you're leaving so we can improve.</p>
                                        </div>

                                        <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-3">
                                            {DELETION_REASONS.map((reason) => (
                                                <div key={reason} className={`
                                                    flex items-center space-x-2 rounded-xl border p-4 transition-all cursor-pointer
                                                    ${selectedReason === reason
                                                        ? "bg-blue-600/10 border-blue-500/50"
                                                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"}
                                                `}>
                                                    <RadioGroupItem value={reason} id={reason} className="border-white/20 text-blue-500" />
                                                    <Label htmlFor={reason} className="flex-1 cursor-pointer text-sm text-gray-200 font-medium">
                                                        {reason}
                                                    </Label>
                                                    {selectedReason === reason && <Check className="w-4 h-4 text-blue-500" />}
                                                </div>
                                            ))}
                                        </RadioGroup>

                                        {selectedReason === "Other" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                            >
                                                <Textarea
                                                    value={customReason}
                                                    onChange={(e) => setCustomReason(e.target.value)}
                                                    placeholder="Tell us a bit more..."
                                                    className="bg-white/5 border-white/10 text-white min-h-[80px] rounded-xl focus:border-blue-500/50"
                                                />
                                            </motion.div>
                                        )}

                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setStep("warning")}
                                                className="flex-1 h-12 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                onClick={handleConfirm}
                                                disabled={isLoading || !selectedReason}
                                                className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg shadow-red-900/20 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Deleting...</span>
                                                    </div>
                                                ) : (
                                                    "Delete Account"
                                                )}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
