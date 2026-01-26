"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        setTimeout(() => {
            const savedLang = localStorage.getItem('proofa-language') as Language;
            if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
                setLanguageState(savedLang);
            } else {
                const browserLang = navigator.language.split('-')[0];
                if (browserLang === 'de') setLanguageState('de');
                else setLanguageState('en');
            }
        }, 0);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('proofa-language', lang);
    };

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key] || translations['en'][key];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
