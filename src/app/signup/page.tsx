"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialLoginButtons } from "@/components/social-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // In a real app, router.push("/onboarding/role")
        }, 3000);
    }

    return (
        <div className="min-h-screen py-20 flex items-center justify-center bg-white dark:bg-black transition-colors duration-300 px-4">
            <FadeIn className="w-full max-w-md flex flex-col items-center">
                <Link href="/" className="mb-8 flex items-center gap-2">
                    <div className="relative h-10 w-10">
                        <Image
                            src="/proofa.png"
                            alt="Proofa Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-sans">PROOFA</span>
                </Link>

                <div className="w-full max-w-md space-y-8 bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Start certifying your AI workflows</p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            disabled={isLoading}
                                            className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            disabled={isLoading}
                                            className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="email">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="password">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        disabled={isLoading}
                                        className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 my-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-black dark:ring-offset-gray-800"
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 dark:text-gray-400"
                                    >
                                        I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                                    </label>
                                </div>

                                <Link href="/onboarding/role" className="w-full">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                                        {isLoading && (
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        )}
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-50 dark:bg-black px-2 text-gray-500">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <SocialLoginButtons />
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
