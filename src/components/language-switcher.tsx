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
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="gap-2 cursor-pointer">
                    <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden pb-[2px]">{flags.en}</span> {labels.en}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ru')} className="gap-2 cursor-pointer">
                    <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden pb-[2px]">{flags.ru}</span> {labels.ru}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('de')} className="gap-2 cursor-pointer">
                    <span className="text-xl leading-none w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden pb-[2px]">{flags.de}</span> {labels.de}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
