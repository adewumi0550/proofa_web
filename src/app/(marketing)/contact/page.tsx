"use client";

import { useLanguage } from "@/components/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const { t } = useLanguage();
    const [captchaAnswer, setCaptchaAnswer] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (captchaAnswer !== "5") {
            alert("Incorrect captcha!");
            return;
        }
        alert("Message sent! (Simulation)");
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-24 pb-12 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Column: Founder Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                            {t('contactTitle')}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            {t('contactSubtitle')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Email */}
                        <a href="mailto:admin@proofa.tech" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/10 group">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wider">Email</p>
                                <p className="text-lg font-medium">admin@proofa.tech</p>
                            </div>
                        </a>

                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/anna-muzykina/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 transition-colors border border-[#0077b5]/20 group">
                            <div className="h-12 w-12 rounded-full bg-[#0077b5] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <Linkedin className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-[#0077b5] uppercase tracking-wider">LinkedIn</p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">Anna Muzykina</p>
                            </div>
                        </a>

                        {/* Phone/WhatsApp */}
                        <a href="https://wa.me/4915561340369" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors border border-green-500/20 group">
                            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-green-600 dark:text-green-500 uppercase tracking-wider">Mobile / WhatsApp</p>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">+49 155 61340369</p>
                            </div>
                        </a>

                        {/* Location */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
                            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Location</p>
                                <p className="text-lg font-medium">{t('locationCity')} 🇩🇪</p>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                        <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                        <p className="text-sm text-blue-700 dark:text-blue-200">
                            {t('trustBadge')}
                        </p>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Message Us</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('yourName')}</label>
                                <Input id="name" required className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 focus:border-blue-500 text-gray-900 dark:text-white placeholder:text-gray-400" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('yourEmail')}</label>
                                <Input id="email" type="email" required className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 focus:border-blue-500 text-gray-900 dark:text-white placeholder:text-gray-400" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="topic" className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('howCanWeHelp')}</label>
                            <select id="topic" className="w-full h-10 rounded-md bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="focus_group">{t('topicFocusGroup')}</option>
                                <option value="partnership">{t('topicPartnership')}</option>
                                <option value="support">{t('topicSupport')}</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('messageLabel')}</label>
                            <Textarea id="message" required className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 focus:border-blue-500 min-h-[150px] text-gray-900 dark:text-white placeholder:text-gray-400" placeholder="Hello Proofa team..." />
                        </div>

                        {/* Simple Captcha */}
                        <div className="space-y-2 pt-2">
                            <label htmlFor="captcha" className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('captchaHint')}</label>
                            <Input
                                id="captcha"
                                required
                                className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 focus:border-blue-500 w-full sm:w-1/2 text-gray-900 dark:text-white placeholder:text-gray-400"
                                placeholder="?"
                                value={captchaAnswer}
                                onChange={(e) => setCaptchaAnswer(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 mt-4">
                            <Send className="mr-2 h-4 w-4" /> {t('sendMessage')}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[120px]" />
            </div>
        </div>
    );
}
