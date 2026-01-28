"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SecurityPage() {
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

                <h1 className="text-4xl font-bold mb-8">{t('securityTitle')}</h1>
                <div className="prose prose-invert max-w-none space-y-8">
                    <div className="prose prose-invert max-w-none space-y-12">
                        {/* Section 1 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-primary">{t('sec_dataProt_title')}</h2>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                {t('sec_dataProt_subtitle')}
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">Encryption in Transit:</strong> {t('sec_dataProt_transit').replace('Encryption in Transit: ', '')}</li>
                                <li><strong className="text-foreground">Encryption at Rest:</strong> {t('sec_dataProt_rest').replace('Encryption at Rest: ', '')}</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-primary">{t('sec_auth_title')}</h2>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                {t('sec_auth_subtitle')}
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">Privacy of Intent:</strong> {t('sec_auth_privacy').replace('Privacy of Intent: ', '')}</li>
                                <li><strong className="text-foreground">Immutability:</strong> {t('sec_auth_immutability').replace('Immutability: ', '')}</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-primary">{t('sec_infra_title')}</h2>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">EU-Based Hosting:</strong> {t('sec_infra_eu').replace('EU-Based Hosting: ', '')}</li>
                                <li><strong className="text-foreground">Access Control:</strong> {t('sec_infra_access').replace('Access Control: ', '')}</li>
                            </ul>
                        </section>
                        <div className="pt-8 border-t border-border mt-12">
                            <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                                &larr; {t('back')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
