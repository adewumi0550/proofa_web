"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/components/auth-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-context";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { t } = useLanguage();

    const navLinks = [
        { name: t('modelGarden'), href: "/model-garden" },
        { name: t('pricing'), href: "/pricing" },
        { name: t('community'), href: "/community" },
        { name: t('showOff'), href: "/show-off" },
    ];

    return (
        <nav className="fixed w-full z-50 top-10 left-0 border-b border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-lg supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30 transition-colors duration-300">
            <div className="w-full px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="relative h-8 w-8">
                                <Image
                                    src="/proofa.png"
                                    alt="Proofa Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-gray-400 font-sans tracking-tight">
                                PROOFA
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        {user ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 font-black text-[10px] uppercase tracking-widest transition-all">
                                        {t('dashboard')}
                                    </Button>
                                </Link>
                                <Button
                                    onClick={logout}
                                    variant="ghost"
                                    className="text-gray-500 hover:text-red-500 hover:bg-red-500/5 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-500/10 font-black text-[10px] uppercase tracking-widest transition-all gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t('logOut')}
                                </Button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white/20 shadow-lg overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition-transform ml-2">
                                    {/* User Avatar Placeholder */}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                                        {t('login')}
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                                        {t('getStarted')}
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center justify-between px-3 py-4 border-t border-gray-200 dark:border-white/10 mt-4">
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                                <LanguageSwitcher />
                            </div>
                            <div className="flex gap-2">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                                        {t('login')}
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsOpen(false)}>
                                    <Button size="sm" className="bg-blue-600">
                                        {t('getStarted')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
