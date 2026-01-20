"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset password</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {isSubmitted
                                ? "Check your email for instructions"
                                : "Enter your email to receive reset instructions"}
                        </p>
                    </div>

                    {isSubmitted ? (
                        <div className="space-y-6">
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-sm rounded-lg border border-green-200 dark:border-green-800 text-center">
                                If an account exists for that email, we have sent password reset instructions.
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/login">Back to Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="grid gap-6">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="email">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    required
                                    className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                />
                            </div>
                            <Button disabled={isLoading}>
                                {isLoading && (
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                )}
                                Send Reset Link
                            </Button>
                            
                            <div className="text-center text-sm">
                                <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </FadeIn>
        </div>
    );
}
