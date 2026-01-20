"use client";

import { useLanguage } from '@/components/language-context';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const flags = {
    en: '🇺🇸',
    ru: '🇷🇺',
    de: '🇩🇪',
};

const labels = {
    en: 'English',
    ru: 'Русский',
    de: 'Deutsch',
};

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 px-2 rounded-full">
                    <span className="text-xl leading-none w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 pb-[2px]">
                        {flags[language]}
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-xl p-1.5">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="gap-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 py-2">
                    <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden pb-[2px]">{flags.en}</span>
                    <span className="font-medium text-sm">{labels.en}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ru')} className="gap-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 py-2">
                    <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden pb-[2px]">{flags.ru}</span>
                    <span className="font-medium text-sm">{labels.ru}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('de')} className="gap-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 py-2">
                    <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden pb-[2px]">{flags.de}</span>
                    <span className="font-medium text-sm">{labels.de}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
