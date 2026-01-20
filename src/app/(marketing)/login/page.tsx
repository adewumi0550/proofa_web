"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialLoginButtons } from "@/components/social-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { FadeIn } from "@/components/fade-in";
import { Eye, EyeOff } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { toast } from "sonner";
import { useLanguage } from "@/components/language-context";


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        const error = searchParams.get("error");
        if (error === "session_expired") {
            toast.error(t('sessionExpired') || "Session expired. Please sign in again.", {
                id: "session-expired",
            });
        }
    }, [searchParams, t]);

    const isValid = email.length > 0 && password.length > 0;

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (error: any) {
            console.error(error);
            let message = error.response?.data?.message || error.message || "Login failed. Please check your credentials.";

            // Map backend error codes to user-friendly messages
            if (error.response?.data?.error === "INVALID_LOGIN_CREDENTIALS") {
                message = "Invalid credentials";
            }

            toast.error(message);
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
                            sizes="40px"
                            className="object-contain"
                        />
                    </div>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-sans">PROOFA</span>
                </Link>

                <div className="w-full max-w-md space-y-8 bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white animate-gradient-x pb-1">{t('welcomeBack')}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('enterDetails')}</p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="email">
                                        {t('email')}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-gray-300" htmlFor="password">
                                            {t('password')}
                                        </label>
                                        <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-500">
                                            {t('forgotPassword')}
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            disabled={isLoading}
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-white dark:bg-black border-gray-300 dark:border-white/10 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !isValid}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading && (
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    )}
                                    {t('signIn')}
                                </Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-50 dark:bg-black px-2 text-gray-500">
                                    {t('orContinuingWith')}
                                </span>
                            </div>
                        </div>

                        <SocialLoginButtons />
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t('dontHaveAccount')} </span>
                        <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                            {t('createAccount')}
                        </Link>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
