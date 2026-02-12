"use client";

import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-context";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function VisualContext() {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="py-24 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <FadeIn>
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('vc_title')}</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {t('vc_subtitle')}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Dashboard Screenshot */}
                    <FadeIn delay={0.1}>
                        <div className="space-y-6">
                            <div
                                className="aspect-[16/10] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-white/5 relative group cursor-pointer"
                                onClick={() => setSelectedImage("dashboard")}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors z-10 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        <ZoomIn className="w-4 h-4" />
                                        <span className="text-sm font-medium">View Fullscreen</span>
                                    </div>
                                </div>

                                {/* Light Mode Image */}
                                <Image
                                    src="/dashboard_EN_light.png"
                                    alt="Forensic Audit Trail (Light)"
                                    className="w-full h-full object-cover dark:hidden"
                                    width={1200}
                                    height={800}
                                />
                                {/* Dark Mode Image */}
                                <Image
                                    src="/dashboard_EN_dark.png"
                                    alt="Forensic Audit Trail (Dark)"
                                    className="w-full h-full object-cover hidden dark:block"
                                    width={1200}
                                    height={800}
                                />
                            </div>
                            <div className="flex items-center gap-4 px-4 text-gray-500">
                                <span className="text-[10px] font-black font-mono uppercase tracking-widest">Fig 01. Forensic Audit Trail View</span>
                                <div className="h-px flex-1 bg-gray-100 dark:bg-white/5"></div>
                                <p className="text-sm text-gray-400">{t('vc_audit_caption')}</p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Passport Screenshot */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-6">
                            <div
                                className="aspect-[16/10] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-white/5 relative group cursor-pointer"
                                onClick={() => setSelectedImage("passport")}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors z-10 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        <ZoomIn className="w-4 h-4" />
                                        <span className="text-sm font-medium">View Fullscreen</span>
                                    </div>
                                </div>

                                {/* Light Mode Image */}
                                <Image
                                    src="/passport_EN_light.png"
                                    alt="Authorship Passport (Light)"
                                    className="w-full h-full object-cover dark:hidden"
                                    width={1200}
                                    height={800}
                                />
                                {/* Dark Mode Image */}
                                <Image
                                    src="/passport_EN_dark.png"
                                    alt="Authorship Passport (Dark)"
                                    className="w-full h-full object-cover hidden dark:block"
                                    width={1200}
                                    height={800}
                                />
                            </div>
                            <div className="flex items-center gap-4 px-4 text-gray-500">
                                <span className="text-[10px] font-black font-mono uppercase tracking-widest">Fig 02. Authorship Passport Issuance</span>
                                <div className="h-px flex-1 bg-gray-100 dark:bg-white/5"></div>
                                <p className="text-sm text-gray-400">{t('vc_passport_caption')}</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-7xl max-h-screen overflow-hidden rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedImage === "dashboard" && (
                                <>
                                    <Image
                                        src="/dashboard_EN_light.png"
                                        alt="Forensic Audit Trail (Light)"
                                        className="w-full h-auto max-h-[90vh] object-contain dark:hidden"
                                        width={1920}
                                        height={1080}
                                    />
                                    <Image
                                        src="/dashboard_EN_dark.png"
                                        alt="Forensic Audit Trail (Dark)"
                                        className="w-full h-auto max-h-[90vh] object-contain hidden dark:block"
                                        width={1920}
                                        height={1080}
                                    />
                                </>
                            )}
                            {selectedImage === "passport" && (
                                <>
                                    <Image
                                        src="/passport_EN_light.png"
                                        alt="Authorship Passport (Light)"
                                        className="w-full h-auto max-h-[90vh] object-contain dark:hidden"
                                        width={1920}
                                        height={1080}
                                    />
                                    <Image
                                        src="/passport_EN_dark.png"
                                        alt="Authorship Passport (Dark)"
                                        className="w-full h-auto max-h-[90vh] object-contain hidden dark:block"
                                        width={1920}
                                        height={1080}
                                    />
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
