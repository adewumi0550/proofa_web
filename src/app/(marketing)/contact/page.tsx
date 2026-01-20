"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language-context";

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-black min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="max-w-md w-full px-6 py-12 bg-white/5 rounded-2xl border border-white/10 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">{t('contactTitle')}</h1>
                <p className="text-gray-400 mb-8">{t('contactSubtitle')}</p>

                <form className="space-y-4">
                    <Input placeholder={t('yourName')} className="bg-black/50 border-white/10 text-white" />
                    <Input placeholder={t('yourEmail')} type="email" className="bg-black/50 border-white/10 text-white" />
                    <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                        placeholder={t('howCanWeHelp')}
                    ></textarea>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">{t('sendMessage')}</Button>
                </form>
            </div>
        </div>
    );
}
