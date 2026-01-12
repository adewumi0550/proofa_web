"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialLoginButtons } from "@/components/social-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email") as string;

        try {
            await login(email);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Login failed. Is backend running?");
        } finally {
            setIsLoading(false);
        }
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4">
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
                                        className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="password">
                                            Password
                                        </label>
                                        <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-500">
                                            Forgot?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        disabled={isLoading}
                                        className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                    />
                                </div>
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    )}
                                    Sign In with Email
                                </Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-50 dark:bg-black px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <SocialLoginButtons />
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Don&apos;t have an account? </span>
                        <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
