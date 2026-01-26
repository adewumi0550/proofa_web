"use client";

import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/language-context";

export function Faq() {
    const { t } = useLanguage();

    const faqs = [
        {
            question: t('faq_q1'),
            answer: t('faq_a1')
        },
        {
            question: t('faq_q2'),
            answer: t('faq_a2')
        },
        {
            question: t('faq_q3'),
            answer: t('faq_a3')
        },
        {
            question: t('faq_q4'),
            answer: t('faq_a4')
        },
        {
            question: t('faq_q5'),
            answer: t('faq_a5')
        }
    ];

    // 1. Structural Logic: Single state variable
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Toggle logic: Close if clicking open item, otherwise open new index
    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <FadeIn>
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('faqTitle')}</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {t('faqSubtitle')}
                        </p>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            {t('faqDesc')}
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-200 dark:border-white/10 last:border-0"
                                >
                                    {/* Trigger */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer relative z-10 bg-transparent"
                                        aria-expanded={activeIndex === index}
                                    >
                                        <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors select-none">
                                            {faq.question}
                                        </span>
                                        {/* 2. Behavior: Icon Rotation */}
                                        <ChevronDown
                                            className={`h-5 w-5 text-gray-500 transition-transform duration-300 pointer-events-none ${activeIndex === index ? "rotate-180 text-blue-600" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* 2. Behavior: Grid Animation */}
                                    <div
                                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${activeIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="text-gray-600 dark:text-gray-400 text-base leading-relaxed pb-6 pr-12">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
