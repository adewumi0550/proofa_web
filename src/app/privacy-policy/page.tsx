"use client";

import Link from "next/link";
import { BetaWarningBox } from "@/components/beta-warning-box";
import { useLanguage } from "@/components/language-context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
    const { t } = useLanguage();
    const router = useRouter();

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

                <h1 className="text-4xl font-bold mb-8">{t('privacyTitle')}</h1>
                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyIntroTitle')}</h2>
                        <BetaWarningBox />
                        <p className="text-muted-foreground leading-relaxed">
                            {t('privacyIntroText')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyControllerTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('privacyControllerText')}
                        </p>
                        <address className="not-italic text-muted-foreground mt-2 border-l-2 border-primary/50 pl-4">
                            <strong>Proofa GmbH i.G.</strong><br />
                            [Founder Name - Please Update]<br />
                            [Address - Please Update]<br />
                            Germany<br />
                            Email: <a href="mailto:privacy@proofa.tech" className="text-primary hover:underline">privacy@proofa.tech</a>
                        </address>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyCollectTitle')}</h2>
                        <p className="text-muted-foreground mb-4">
                            {t('privacyCollectIntro')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>{t('privacyCollectList1')}</li>
                            <li>{t('privacyCollectList2')}</li>
                            <li>{t('privacyCollectList3')}</li>
                        </ul>

                        <div className="mt-6 p-6 bg-secondary/10 border border-primary/20 rounded-xl">
                            <h3 className="text-xl font-medium text-foreground mb-3">{t('privacySpecialTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('privacySpecialText1')}
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-2">
                                {t('privacySpecialText2')}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyPurposeTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('privacyPurposeText')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyStorageTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('privacyStorageText')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyRightsTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('privacyRightsText')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">{t('privacyContactTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('privacyContactText')}
                            <br />
                            <a href="mailto:privacy@proofa.tech" className="text-primary hover:underline font-medium">privacy@proofa.tech</a>
                        </p>
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
