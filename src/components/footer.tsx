"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-context";
import { Facebook, Linkedin } from "lucide-react";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-white/10 bg-black text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-8">
                    <div className="space-y-4 max-w-xs">
                        <div className="flex items-center gap-2">
                            <div className="relative h-6 w-6">
                                <Image
                                    src="/proofa.png"
                                    alt="Proofa Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-lg font-bold text-white">{t('proofa')}</span>
                        </div>
                        <p className="text-sm">
                            {t('footerDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 w-full md:w-auto">
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{t('product')}</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="/model-garden" className="hover:text-blue-400 transition-colors">{t('modelGarden')}</a></li>
                                <li><a href="/pricing" className="hover:text-blue-400 transition-colors">{t('pricing')}</a></li>
                                <li><a href="/show-off" className="hover:text-blue-400 transition-colors">{t('showOff')}</a></li>
                                <li><a href="/features" className="hover:text-blue-400 transition-colors">Features</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{t('company')}</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="/about" className="hover:text-blue-400 transition-colors">{t('aboutUs')}</a></li>
                                <li><a href="/community" className="hover:text-blue-400 transition-colors">{t('community')}</a></li>
                                <li><a href="/careers" className="hover:text-blue-400 transition-colors">{t('careers')}</a></li>
                                <li><a href="/contact" className="hover:text-blue-400 transition-colors">{t('contact')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">{t('legal')}</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="/impressum" className="hover:text-blue-400 transition-colors">Impressum</a></li>
                                <li><a href="/terms" className="hover:text-blue-400 transition-colors">{t('termsService')}</a></li>
                                <li><a href="/cookie-policy" className="hover:text-blue-400 transition-colors">{t('cookiePolicy')}</a></li>
                                <li><a href="/security" className="hover:text-blue-400 transition-colors">{t('security')}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center md:flex-row md:justify-between gap-4">
                    <p className="text-xs text-gray-500 order-2 md:order-1">
                        {t('rightsReserved')}
                    </p>
                    <div className="flex gap-6 order-1 md:order-2">
                        <a
                            href="https://www.facebook.com/groups/proofa/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/proofa/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
