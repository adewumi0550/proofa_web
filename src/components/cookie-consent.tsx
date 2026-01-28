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
                className="fixed bottom-0 left-0 w-full z-[100] p-2 md:p-6 flex justify-center items-end md:justify-end pointer-events-none"
            >
                <div className="w-full max-w-[340px] md:max-w-md bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
                    {/* Header with Icon */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center gap-3">
                        <div className="p-1.5 bg-white/20 rounded-lg">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-white tracking-wide">
                            {t('consentTitle')}
                        </h3>
                    </div>

                    <div className="p-4 space-y-3">
                        {/* Content */}
                        <div className="text-gray-600 dark:text-gray-300 space-y-2 text-xs leading-relaxed">
                            <p className="whitespace-pre-line">
                                {t('consentText')}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2 pt-1">
                            <Button
                                onClick={handleAccept}
                                size="sm"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-9 rounded-lg text-xs shadow-md transition-all hover:scale-[1.02]"
                            >
                                {t('consentAccept')}
                            </Button>
                            <Button
                                onClick={handleDecline}
                                variant="ghost"
                                size="sm"
                                className="w-full h-8 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-transparent font-medium text-[10px]"
                            >
                                {t('consentDecline')}
                            </Button>
                        </div>

                        <div className="text-center pt-1">
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
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
