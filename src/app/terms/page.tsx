"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsOfService() {
    const { t } = useLanguage();
    const router = useRouter();

    // Helper to split text by double newlines for paragraph rendering
    const renderText = (text: string) => {
        return text.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
            </p>
        ));
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back')}
                </button>

                <h1 className="text-4xl font-bold mb-8">{t('termsTitle')}</h1>
                <div className="prose prose-invert max-w-none space-y-8">
                    <p className="text-muted-foreground">
                        {t('termsLastUpdated')}
                    </p>

                    {/* 1. Agreement */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('termsAgreementTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('termsAgreementText'))}
                        </div>
                        {/* Beta Warning */}
                        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 font-medium">
                            {t('termsBetaWarning')}
                        </div>
                    </section>

                    {/* 2. User Representations */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('termsRepsTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('termsRepsText'))}
                        </div>
                    </section>

                    {/* 3. Nature of Service */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('termsNatureTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('termsNatureText'))}
                        </div>
                    </section>

                    {/* 4. Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('termsIpTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('termsIpText'))}
                        </div>
                    </section>

                    {/* 5. Liability */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('termsLiabilityTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('termsLiabilityText'))}
                        </div>
                    </section>

                    <div className="pt-8 border-t border-border mt-12">
                        <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                            &larr; {t('back')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
