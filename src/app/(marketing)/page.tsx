"use client";

import { Waitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Lock, Video, Image, Music, MessageSquareText, Globe } from "lucide-react";
import { PricingTable } from "@/components/pricing-table";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-context";
import { TeamSection } from "@/components/team-section";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";

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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 mb-8">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 w-full sm:w-auto">
                  {t('getStarted')}
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 w-full sm:w-auto border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                  {t('viewAllFeatures')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Stats/Social Proof Section */}
      <FadeIn delay={0.2}>
        <div className="border-y border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 backdrop-blur-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[
                { name: "Veo 3", typeKey: "videoGeneration", icon: Video, link: "https://deepmind.google/technologies/veo/" },
                { name: "Nano Banana", typeKey: "imageGeneration", icon: Image, link: "https://nano-banana.ai/" },
                { name: "Imagen", typeKey: "imageGeneration", icon: Image, link: "https://deepmind.google/technologies/imagen-3/" },
                { name: "Gemini", typeKey: "textGeneration", icon: MessageSquareText, link: "https://deepmind.google/technologies/gemini/" },
                { name: "Lyria", typeKey: "musicGeneration", icon: Music, link: "https://deepmind.google/technologies/lyria/" },
                { name: "Suno", typeKey: "musicGeneration", icon: Music, link: "https://suno.com/" },
              ].map((model) => (
                <Link
                  key={model.name}
                  href={model.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-white/5 mb-3 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-500">
                    <model.icon className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors duration-500" />
                  </div>
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-500">
                    {model.name}
                  </span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                    {t(model.typeKey as any)}
                  </span>
                </Link>
              ))}
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
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">The Passport</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('feat_passport_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('feat_passport_desc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">The Audit</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('feat_audit_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('feat_audit_desc')}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-2">The Ledger</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('feat_ledger_title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('feat_ledger_desc')}
                </p>
              </div>
            </FadeIn>
          </div>


        </div>
      </div>

      {/* Technical Deep-Dive Section (For Google Cloud Audit & Enterprise trust) */}
      <div className="py-24 bg-gray-50 dark:bg-white/2 border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('hiw_tech_title')}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t('hiw_tech_subtitle')}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={0.1}>
              <div className="group p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Lock className="w-24 h-24 rotate-12" />
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('hiw_vault_title')}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('hiw_vault_desc')}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                  <span className="text-[10px] font-black font-mono text-blue-500 uppercase tracking-widest">Protocol: AES-256 / SHA-256</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap className="w-24 h-24 rotate-12" />
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-500">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('hiw_antifraud_title')}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('hiw_antifraud_desc')}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                  <span className="text-[10px] font-black font-mono text-purple-500 uppercase tracking-widest">Engine: Gemini 1.5 Pro</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield className="w-24 h-24 rotate-12" />
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('hiw_pqc_title')}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('hiw_pqc_desc')}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                  <span className="text-[10px] font-black font-mono text-emerald-500 uppercase tracking-widest">Algorithm: Dilithium3</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="group p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ArrowRight className="w-24 h-24 rotate-12" />
                </div>
                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-500">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('hiw_orchestration_title')}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('hiw_orchestration_desc')}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                  <span className="text-[10px] font-black font-mono text-pink-500 uppercase tracking-widest">Compliance: KYC-Ready / OAuth2</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Technical Workflow Diagram */}
          <FadeIn delay={0.5}>
            <div className="mt-20 p-8 rounded-2xl bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 shadow-inner">
              <h3 className="text-center text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-12">{t('wf_title')}</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-0"></div>

                {[
                  { key: 'wf_step1', icon: Lock },
                  { key: 'wf_step2', icon: Zap },
                  { key: 'wf_step3', icon: Shield },
                  { key: 'wf_step4', icon: ArrowRight },
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
                    <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500/20 shadow-xl flex items-center justify-center mb-6 group hover:border-blue-500 transition-colors duration-500">
                      <step.icon className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">{t(step.key as any)}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Visual Context Section */}
      <div className="py-24 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('vc_title')}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {t('vc_subtitle')}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-white/5 relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-8">
                    <p className="text-white text-sm font-bold">{t('vc_audit_caption')}</p>
                  </div>
                  <img
                    src="/forensic_audit_trail_mockup_1770844934976.png"
                    alt="Forensic Audit Trail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-4 px-4 text-gray-500">
                  <span className="text-[10px] font-black font-mono uppercase tracking-widest">Fig 01. Forensic Audit Trail View</span>
                  <div className="h-px flex-1 bg-gray-100 dark:bg-white/5"></div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-white/5 relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-8">
                    <p className="text-white text-sm font-bold">{t('vc_passport_caption')}</p>
                  </div>
                  <img
                    src="/authorship_passport_mockup_1770844951895.png"
                    alt="Authorship Passport"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-4 px-4 text-gray-500">
                  <span className="text-[10px] font-black font-mono uppercase tracking-widest">Fig 02. Authorship Passport Issuance</span>
                  <div className="h-px flex-1 bg-gray-100 dark:bg-white/5"></div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <FadeIn delay={0.4} className="mt-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('hiw_stepTitle')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('hiw_title')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: t('hiw_step1_title'),
                desc: t('hiw_step1_desc')
              },
              {
                step: "02",
                title: t('hiw_step2_title'),
                desc: t('hiw_step2_desc')
              },
              {
                step: "03",
                title: t('hiw_step3_title'),
                desc: t('hiw_step3_desc')
              },
              {
                step: "04",
                title: t('hiw_step4_title'),
                desc: t('hiw_step4_desc')
              }
            ].map((item, index) => (
              <div key={item.step} className="relative p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-4xl font-black text-gray-100 dark:text-white/5 mb-4 absolute top-4 right-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <Testimonials />

      <TeamSection />

      {/* Pricing Section */}
      <div className="bg-gray-50 dark:bg-black transition-colors duration-300 border-t border-gray-200 dark:border-white/5">
        <FadeIn>
          <PricingTable />
        </FadeIn>
      </div>

      <Faq />

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
    </div >
  );
}
