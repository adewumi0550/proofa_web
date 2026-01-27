"use client";

import { useLanguage } from "@/components/language-context";

export function BetaBanner() {
    const { t } = useLanguage();

    return (
        <div className="fixed top-0 left-0 w-full h-10 bg-amber-500/90 text-black text-center flex items-center justify-center px-4 text-xs sm:text-sm font-semibold backdrop-blur-sm z-[100]">
            {t('betaWarning')}
        </div>
    );
}
