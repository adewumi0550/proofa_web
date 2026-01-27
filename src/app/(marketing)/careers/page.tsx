"use client";

import { useLanguage } from "@/components/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-black text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('careersTitle')}
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                {t('noOpenings')}
            </p>
            <Link href="/">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
