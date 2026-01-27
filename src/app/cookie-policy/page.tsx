"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CookiePolicy() {
    const { t } = useLanguage();
    const router = useRouter();

    // Helper to render text with line breaks
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

                <h1 className="text-4xl font-bold mb-8">{t('cookiePolicyTitle')}</h1>
                <div className="prose prose-invert max-w-none space-y-8">
                    <p className="text-muted-foreground">
                        {t('cookieLastUpdated')}
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('cookieGeneralTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('cookieGeneralText'))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('cookieNecessaryTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('cookieNecessaryText'))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('cookieStorageTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('cookieStorageText'))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('cookieTrackingTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('cookieTrackingText'))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('cookieChoicesTitle')}</h2>
                        <div className="text-muted-foreground leading-relaxed">
                            {renderText(t('cookieChoicesText'))}
                        </div>
                    </section>

                    <section className="pt-8 border-t border-border mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
                            Privacy by Design
                        </h2>
                        <div className="bg-muted p-6 rounded-lg border border-border">
                            <p className="text-sm font-medium leading-relaxed">
                                {t('consentCookieClause')}
                            </p>
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
