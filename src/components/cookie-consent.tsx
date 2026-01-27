"use client";

import { useLanguage } from "@/components/language-context";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("proofa_cookie_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("proofa_cookie_consent", "accepted");
        setIsVisible(false);
        // Page reload might be needed to enable features immediately if they rely on init check
        window.location.reload();
    };

    const handleDecline = () => {
        localStorage.setItem("proofa_cookie_consent", "declined");
        setIsVisible(false);
        window.location.reload();
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-center items-end pointer-events-none"
            >
                <div className="w-full max-w-2xl bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto">
                    {/* Header with Icon */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide">
                            {t('consentTitle')}
                        </h3>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        {/* Content */}
                        <div className="text-gray-600 dark:text-gray-300 space-y-4 text-sm md:text-base leading-relaxed">
                            <p className="whitespace-pre-line">
                                {t('consentText')}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 pt-2">
                            <Button
                                onClick={handleAccept}
                                size="lg"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl text-sm md:text-base shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
                            >
                                {t('consentAccept')}
                            </Button>
                            <Button
                                onClick={handleDecline}
                                variant="outline"
                                size="lg"
                                className="flex-1 h-12 rounded-xl border-gray-200 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 font-medium text-sm md:text-base"
                            >
                                {t('consentDecline')}
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                Privacy by Design
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
