"use client";

import { Waitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Lock, Video, Image, Music, MessageSquareText, Globe, Activity, Scale, ShieldCheck, Archive } from "lucide-react";
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Bento Tile 1: The Passport (Large Hero) */}
            <FadeIn delay={0.1} className="md:col-span-2 md:row-span-2">
              <div className="group relative p-8 lg:p-12 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-2xl transition-all duration-500 h-full overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div className="text-sm font-black text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-widest">{t('feat_passport_title')}</div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 max-w-sm">{t('feat_passport_desc')}</h3>
                </div>

                {/* Isometric Mockup Visualization */}
                <div className="relative mt-12 w-full h-64 lg:h-80 bg-white/40 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5 p-4 transform lg:rotate-[-5deg] lg:translate-x-4 group-hover:rotate-0 group-hover:translate-x-0 transition-all duration-700 shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50"></div>
                  <div className="flex flex-col gap-4">
                    <div className="h-4 w-1/3 bg-blue-500/10 rounded-full animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="h-2 w-full bg-gray-200 dark:bg-white/5 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-gray-200 dark:bg-white/5 rounded-full"></div>
                    </div>
                    <div className="h-32 w-full bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-12 h-12 text-blue-500/20 animate-float" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 h-1 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-blue-500 animate-gradient-x"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                      <span>SIGN_REF: 0x82...F2</span>
                      <span className="text-blue-500 font-bold">VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Aura */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
              </div>
            </FadeIn>

            {/* Bento Tile 2: The Audit (Utility) */}
            <FadeIn delay={0.2}>
              <div className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition-all duration-500 h-full overflow-hidden relative">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform duration-500">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-widest">{t('feat_audit_title')}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('feat_audit_desc')}
                </p>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-1 bg-purple-500/20 flex-1 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 animate-pulse" style={{ animationDelay: `${i * 200}ms`, width: `${40 + i * 15}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full"></div>
              </div>
            </FadeIn>

            {/* Bento Tile 3: The Ledger (Utility) */}
            <FadeIn delay={0.3}>
              <div className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition-all duration-500 h-full overflow-hidden relative">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform duration-500">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-pink-600 dark:text-pink-400 mb-2 uppercase tracking-widest">{t('feat_ledger_title')}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('feat_ledger_desc')}
                </p>

                <div className="mt-8 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 font-mono text-[9px] text-gray-500 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                  <span className="truncate">BLOCK_HASH: 7a83...f92</span>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/5 blur-[50px] rounded-full"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Under the Hood Section (Moved up) */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <div className="group p-8 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 shadow-sm relative overflow-hidden blur-[1px] opacity-70 grayscale-[0.5] select-none transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider transform -rotate-12 shadow-xl border border-white/20">
                    {t('comingSoon')}
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe className="w-24 h-24 rotate-12" />
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

      {/* How It Works (Step-by-Step) (Moved up) */}
      <FadeIn delay={0.4} className="mt-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">{t('hiw_stepTitle')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('hiw_title')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* The "Winding Serpentine Path" - Dynamic SVG Connector */}
            <div className="absolute inset-x-0 inset-y-12 pointer-events-none hidden md:block">
              <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
                <path
                  d="M 10 0 
                     C 10 83, 90 83, 90 166 
                     C 90 250, 10 250, 10 333 
                     C 10 416, 90 416, 90 500 
                     C 90 583, 10 583, 10 666 
                     C 10 750, 90 750, 90 833 
                     C 90 916, 10 916, 10 1000"
                  fill="none"
                  stroke="url(#hiw_serpentine_grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-50 dark:opacity-60"
                />
                <defs>
                  <linearGradient id="hiw_serpentine_grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="16%" stopColor="#8B5CF6" />
                    <stop offset="33%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="66%" stopColor="#3B82F6" />
                    <stop offset="83%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Mobile Fallback Line */}
            {/* Mobile Fallback Line - Now with Premium Gradient */}
            <div className="absolute left-[39px] top-0 bottom-0 w-[3px] md:hidden bg-[linear-gradient(to_bottom,#3B82F6_0%,#8B5CF6_16%,#10B981_33%,#EC4899_50%,#3B82F6_66%,#8B5CF6_83%,#10B981_100%)] shadow-[0_0_15px_rgba(59,130,246,0.4)] opacity-80"></div>

            <div className="space-y-32 md:space-y-64">
              {[
                {
                  step: "01",
                  title: t('hiw_step1_title'),
                  desc: t('hiw_step1_desc'),
                  color: "blue",
                  icon: Globe,
                  glow: "bg-blue-500/10",
                  curveOffset: "md:left-[10%]"
                },
                {
                  step: "02",
                  title: t('hiw_step2_title'),
                  desc: t('hiw_step2_desc'),
                  color: "purple",
                  icon: Activity,
                  glow: "bg-purple-500/10",
                  curveOffset: "md:left-[90%]"
                },
                {
                  step: "03",
                  title: "ADK Multi-Layer Discovery",
                  desc: t('hiw_step3_desc'),
                  color: "emerald",
                  icon: Scale,
                  glow: "bg-emerald-500/10",
                  curveOffset: "md:left-[10%]"
                },
                {
                  step: "04",
                  title: t('hiw_step4_title'),
                  desc: t('hiw_step4_desc'),
                  color: "pink",
                  icon: ShieldCheck,
                  glow: "bg-pink-500/10",
                  curveOffset: "md:left-[90%]"
                },
                {
                  step: "05",
                  title: t('hiw_step5_title'),
                  desc: t('hiw_step5_desc'),
                  color: "blue",
                  icon: Archive,
                  glow: "bg-blue-500/10",
                  curveOffset: "md:left-[10%]"
                },
                {
                  step: "06",
                  title: t('hiw_step6_title'),
                  desc: t('hiw_step6_desc'),
                  color: "purple",
                  icon: Zap,
                  glow: "bg-purple-500/10",
                  curveOffset: "md:left-[90%]"
                },
                {
                  step: "07",
                  title: t('hiw_step7_title'),
                  desc: t('hiw_step7_desc'),
                  color: "emerald",
                  icon: Lock,
                  glow: "bg-emerald-500/10",
                  curveOffset: "md:left-[10%]"
                }
              ].map((item, index) => (
                <FadeIn key={item.step} delay={index * 0.05}>
                  <div className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Step Indicator Anchored to the Serpentine Path */}
                    <div className={`absolute left-[39px] ${item.curveOffset} top-12 w-4 h-4 -ml-2 -mt-2 rounded-full border-4 border-white dark:border-black bg-gray-200 dark:bg-white/10 z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-700`}>
                      <div className={`absolute inset-0 rounded-full animate-pulse bg-${item.color}-500/40 blur-[4px]`}></div>
                    </div>

                    {/* Step Visual Wrapper */}
                    <div className="relative flex-shrink-0">
                      {/* Ambient Aura Glow */}
                      <div className={`absolute inset-0 ${item.glow} blur-[60px] rounded-full scale-150`}></div>

                      {/* Icon Box */}
                      <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white dark:bg-gray-900 border border-${item.color}-500/20 shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-500`}>
                        <item.icon className={`w-10 h-10 md:w-12 md:h-12 text-${item.color}-500`} />
                      </div>

                      {/* Step Number Chip */}
                      <div className="absolute -top-4 -right-4 z-20 px-3 py-1 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] font-black tracking-widest shadow-lg">
                        {item.step}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className={`flex-1 text-center md:text-left ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                      <div className={`inline-block mb-4 px-3 py-1 rounded-full bg-${item.color}-500/5 border border-${item.color}-500/10 text-[10px] font-black text-${item.color}-600 dark:text-${item.color}-400 uppercase tracking-[0.2em]`}>
                        Stage {item.step}
                      </div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

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
      </div >

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
