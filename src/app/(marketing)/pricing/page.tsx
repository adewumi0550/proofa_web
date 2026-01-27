"use client";

import { PricingTable } from "@/components/pricing-table";
import { FadeIn } from "@/components/fade-in";
import { BetaWarningBox } from "@/components/beta-warning-box";

export default function PricingPage() {
    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] pt-12 pb-24 transition-colors duration-300">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-24">
                        <PricingTable />
                    </div>

                    <div className="mt-16 max-w-2xl mx-auto">
                        <BetaWarningBox />
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
