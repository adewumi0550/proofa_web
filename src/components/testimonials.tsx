"use client";

import { FadeIn } from "@/components/fade-in";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/language-context";

export function Testimonials() {
    const { t } = useLanguage();

    const testimonials = [
        {
            content: t('testimonial_elena'),
            author: "Elena R.",
            role: "Creative Director, Studio X", // Keeping this hardcoded or use a key if strictly needed, but role_elena exists
            roleKey: "role_elena",
            rating: 5
        },
        {
            content: t('testimonial_marcus'),
            author: "Marcus J.",
            roleKey: "role_marcus",
            rating: 5
        },
        {
            content: t('testimonial_sarah'),
            author: "Sarah L.",
            roleKey: "role_sarah",
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-white/5 border-y border-gray-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <FadeIn>
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('socialProofTitle')}</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {t('trustedByTitle')}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="flex flex-col h-full justify-between p-8 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                        "{testimonial.content}"
                                    </blockquote>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-500">{t(testimonial.roleKey as any)}</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
