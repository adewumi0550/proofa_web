"use client";

import { useLanguage } from "@/components/language-context";

export function BetaWarningBox() {
    const { t } = useLanguage();

    return (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <p className="text-yellow-500 font-medium text-sm">
                {t('betaWarning')}
            </p>
        </div>
    );
}
