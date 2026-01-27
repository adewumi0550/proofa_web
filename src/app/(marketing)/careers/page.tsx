"use client";

import { useLanguage } from "@/components/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white dark:bg-black text-center px-6 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('careersTitle')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                {t('noOpenings')}
            </p>
            <Link href="/">
                <Button variant="outline" className="border-gray-200 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
