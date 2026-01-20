"use client";

import { PricingTable } from "@/components/pricing-table";
import { PricingComparison } from "@/components/pricing-comparison"; // Kept for now, but should ideally be updated inside the component too if we want full translation.
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-context";

export default function PricingPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] pt-12 pb-24 transition-colors duration-300">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('pricingTitle')}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{t('pricingSubtitle')}</p>
                    </div>

                    <div className="mb-24">
                        <PricingTable />
                    </div>

                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('comparePlans')}</h2>
                    <PricingComparison />
                </div>
            </FadeIn>
        </div>
    );
}
