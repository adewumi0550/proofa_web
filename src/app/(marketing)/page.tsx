"use client";

import { Waitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { PricingTable } from "@/components/pricing-table";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-context";
import { TeamSection } from "@/components/team-section";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] bg-white dark:bg-black transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-100 dark:bg-[url('/grid-dark.svg')]"></div>

      {/* Hero Section */}
      <FadeIn>
        <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient-x font-bold">
                {t('buildingFuture')}
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sans tracking-tight font-bold mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white animate-gradient-x pb-2">
                {t('heroTitle')}
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {t('heroSubtitle')}
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 mb-8">
              <Waitlist />
            </div>

            <p className="mt-8 text-sm text-gray-500 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              {t('joinWaitlist')}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats/Social Proof Section */}
      <FadeIn delay={0.2}>
        <div className="border-y border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">2,850</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('statsFoundingUsers')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">9,500</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('statsModelsTracked')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">$1.2M+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('statsAssetValue')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">140+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('statsLicensedEngines')}</div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Features Preview Section */}
      <div className="py-24 bg-white dark:bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('deployFaster')}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t('scaleCreativity')}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                {t('proofaInfrastructure')}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('legalImmunity')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('legalImmunityDesc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('instantLicensing')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('instantLicensingDesc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('privateRegistry')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('privateRegistryDesc')}
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="mt-16 text-center">
            <Link href="/features">
              <Button variant="outline" className="text-base px-8 py-6 rounded-full border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                {t('viewAllFeatures')} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Team Section */}
      <TeamSection />

      {/* Pricing Section */}
      <div className="bg-gray-50 dark:bg-black transition-colors duration-300 border-t border-gray-200 dark:border-white/5">
        <FadeIn>
          <PricingTable />
        </FadeIn>
      </div>

      {/* CTA Footer Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent"></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('readyToCertify')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              {t('joinWaitlistToday')}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12">
                  {t('checkPricing')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                  {t('contactEducation')}
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
