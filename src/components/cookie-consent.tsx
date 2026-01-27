"use client";

import { useLanguage } from "@/components/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
    };

    const handleDecline = () => {
        localStorage.setItem("proofa_cookie_consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-2xl z-[100] animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center md:text-left">
                    {t('cookieMessage')}
                    <Link href="/cookie-policy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        {t('cookiePolicy')}
                    </Link>.
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Button
                        onClick={handleDecline}
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        {t('cookieDecline')}
                    </Button>
                    <Button
                        onClick={handleAccept}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {t('cookieAccept')}
                    </Button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="hidden md:flex ml-2 text-gray-400 hover:text-gray-500"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
