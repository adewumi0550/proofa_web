"use client";

import React from "react";
import { useAuth } from "@/components/auth-context";
import { motion } from "framer-motion";
import { CreditCard, Zap, ShieldCheck, Clock, CheckCircle2, Star, ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/language-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserDropdown } from "@/components/dashboard/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubscriptionsPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const planFeatures = [
        "Up to 3 active projects",
        "Standard AI model access",
        "Basic IP certification",
        "Standard support",
        "15 Monthly credits"
    ];

    return (
        <div className="flex-1 h-full overflow-y-auto bg-[#fbfbfb] dark:bg-[#090909] p-8 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/dashboard" className="font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors">
                            {t('dashboard')}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>{t('subscriptions')}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <UserDropdown />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Active Subscription Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-[32px] bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 rounded-full blur-[80px] opacity-20" />

                        <div className="relative z-10">
                            {isLoading ? (
                                <div className="space-y-6">
                                    <Skeleton className="h-4 w-32 bg-white/10" />
                                    <Skeleton className="h-12 w-3/4 bg-white/10" />
                                    <Skeleton className="h-4 w-1/2 bg-white/10" />
                                    <div className="pt-8 space-y-4">
                                        <Skeleton className="h-14 w-full bg-white/10 rounded-2xl" />
                                        <Skeleton className="h-4 w-1/3 bg-white/10" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="p-2 bg-blue-500/20 rounded-xl">
                                            <Star className="w-5 h-5 text-blue-400 fill-blue-400" />
                                        </div>
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{t('activeSubscription') || "Active Subscription"}</span>
                                    </div>

                                    <h2 className="text-4xl font-black mb-1 capitalize">{user?.plan || "Free"} {t('classic') || "Classic"}</h2>
                                    <p className="text-gray-400 text-sm mb-8">Your creative journey is powered by the {user?.plan || "Free"} plan.</p>

                                    <div className="space-y-4 pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <Zap className="w-5 h-5 text-yellow-400" />
                                                <span className="text-sm font-medium text-gray-300">Remaining Credits</span>
                                            </div>
                                            <span className="text-xl font-black text-white">{user?.credits || 0}</span>
                                        </div>
                                        <div className="flex justify-between text-sm px-1">
                                            <span className="text-gray-400">{t('billingCycle') || "Billing Cycle"}</span>
                                            <span className="font-bold">N/A (Early Access)</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {!isLoading && (
                            <div className="relative z-10 mt-12">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-2xl gap-2">
                                    {t('managePlan') || "Manage Plan"} <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </motion.div>

                    {/* Plan Details Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-[32px] bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('planDetails') || "Plan Details"}</h3>
                        <div className="space-y-4">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                ))
                            ) : (
                                planFeatures.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{feature}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2 truncate">Need more power?</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                Upgrade to <span className="font-bold">Pro Creator</span> to unlock 50 projects, premium models, and $1M IP Shield protection.
                            </p>
                            <Button variant="link" className="px-0 h-auto text-xs font-bold text-blue-600 mt-2">
                                {t('upgradePlan') || "Upgrade Plan"} →
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Billing History Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-8 rounded-[32px] bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Invoices</h3>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-white/10 font-bold text-xs">Download All</Button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full mb-4">
                                <Clock className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No billing history yet.</p>
                            <p className="text-xs text-gray-400 mt-1">Invoices will appear here once you make your first purchase.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
