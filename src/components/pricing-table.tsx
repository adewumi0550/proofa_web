"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-context";

export function PricingTable() {
    const { t } = useLanguage();

    const plans = [
        {
            name: t('freeExplorer'),
            price: "$0",
            period: "/mo",
            description: "Basic verification for hobbyists.",
            features: [
                { name: t('maxProjects'), included: true },
                { name: t('stdModels'), included: true },
                { name: t('commSupport'), included: true },
                { name: t('noTechSupport'), included: false },
                { name: t('apiAccess'), included: false },
            ],
            cta: t('startFree'),
            popular: false,
        },
        {
            name: t('proCreator'),
            price: "$29",
            period: "/mo",
            description: "Full authorship rights for pros.",
            features: [
                { name: t('fiftyProjects'), included: true },
                { name: t('premModels'), included: true },
                { name: t('prioSupport'), included: true },
                { name: t('gasFees'), included: true },
                { name: t('apiAccess'), included: false },
            ],
            cta: t('goPro'),
            popular: true,
        },
        {
            name: t('classic'),
            price: "Custom",
            period: "",
            description: "Enterprise-grade legal immunity.",
            features: [
                { name: t('unlProjects'), included: true },
                { name: t('ipShield'), included: true },
                { name: t('apiLicensing'), included: true },
                { name: t('persManager'), included: true },
                { name: t('custContracts'), included: true },
            ],
            cta: t('contactSales'),
            popular: false,
        },
    ];

    return (
        <div className="py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('pricing')}</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        {t('monetizeAndProtect')}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        {t('pricingSubtitle')}
                    </p>
                </div>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-3xl p-8 ring-1 xl:p-10 transition-all duration-300 hover:scale-105 ${plan.popular
                                ? "bg-white dark:bg-white/5 ring-blue-50 shadow-2xl shadow-blue-500/20"
                                : "bg-gray-50 dark:bg-white/5 ring-gray-200 dark:ring-white/10 hover:ring-gray-300 dark:hover:ring-white/20"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-x-4">
                                <h3 id={plan.name} className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                {plan.popular && (
                                    <span className="rounded-full bg-blue-100 dark:bg-blue-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600 dark:text-blue-400">
                                        {t('mostPopular')}
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{plan.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.price}</span>
                                {plan.period && (
                                    <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">{plan.period}</span>
                                )}
                            </p>
                            <a
                                href="#"
                                aria-describedby={plan.name}
                                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${plan.popular
                                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600"
                                    : "bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 focus-visible:outline-gray-200 dark:focus-visible:outline-white"
                                    }`}
                            >
                                {plan.cta}
                            </a>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {plan.features.map((feature) => (
                                    <li key={feature.name} className="flex gap-x-3">
                                        {feature.included ? (
                                            <Check className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                                        ) : (
                                            <X className="h-6 w-5 flex-none text-gray-400 dark:text-gray-600" aria-hidden="true" />
                                        )}
                                        <span className={feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-600"}>{feature.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
