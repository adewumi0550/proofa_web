"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Impressum() {
    const { t } = useLanguage();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back')}
                </button>

                <h1 className="text-4xl font-bold mb-8">{t('impressumTitle')}</h1>
                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">{t('impressumLegalTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Anna Muzykina</strong><br />
                            Hermann-Ehlers str. 20<br />
                            59229 Ahlen, NRW<br />
                            Germany
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">{t('impressumRepresentedTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Anna Muzykina
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">{t('impressumContactTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Phone: +49 155 6134 0369<br />
                            E-Mail: <a href="mailto:admin@proofa.tech" className="text-primary hover:underline">admin@proofa.tech</a><br />
                            LinkedIn: <a href="https://www.linkedin.com/in/anna-muzykina/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anna Muzykina</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">{t('impressumRegisterTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('impressumRegisterText')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">{t('impressumVatTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {t('impressumVatText')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-primary">{t('impressumResponsibleTitle')}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Anna Muzykina<br />
                            Hermann-Ehlers str. 20<br />
                            59229 Ahlen, NRW<br />
                            Germany
                        </p>
                    </section>

                    <section className="mt-12 pt-8 border-t border-border">
                        <h2 className="text-xl font-semibold mb-4 text-foreground">{t('impressumDisclaimer')}</h2>

                        <h3 className="text-lg font-medium text-foreground mt-4 mb-2">{t('impressumLiabilityContentTitle')}</h3>
                        <p className="text-muted-foreground text-sm">
                            {t('impressumLiabilityContentText')}
                        </p>

                        <h3 className="text-lg font-medium text-foreground mt-4 mb-2">{t('impressumLiabilityLinksTitle')}</h3>
                        <p className="text-muted-foreground text-sm">
                            {t('impressumLiabilityLinksText')}
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
