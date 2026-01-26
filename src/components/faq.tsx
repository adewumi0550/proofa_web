"use client";

import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is a Digital Authorship Passport?",
        answer: "It is a technical record of your work’s development. Proofa captures the activity logs and specific iterations of your creative process to establish a verifiable link between you and the final output."
    },
    {
        question: "How does the verification work?",
        answer: "The platform utilizes proprietary logic to audit your workflow. By analyzing the sequence of your creative decisions, the system generates a score that confirms human-led authorship over automated generation."
    },
    {
        question: "Which models are supported in the workspace?",
        answer: "The environment allows you to orchestrate various professional models. Our logic is model-agnostic; it monitors the creator's interaction with the tools, not the tools themselves."
    },
    {
        question: "Is my creative process private?",
        answer: "Yes. Your workflow data is stored on a secure, private ledger. This allows you to maintain a permanent record of your authorship without exposing your work or your prompts to the public."
    },
    {
        question: "What does 'Future Licensing' mean?",
        answer: "Securing a Passport today creates a foundational record of your authorship. This technical proof is designed to be the basis for future asset management and commercial use within our evolving ecosystem."
    }
];

export function Faq() {
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
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">FAQ: Technical & Secure</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Common Questions
                        </p>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Everything you need to know about securing your creative future.
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
