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
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/components/language-context";

const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the Terms and Privacy Policy",
    }),
});

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(true);

    const router = useRouter();
    const { register } = useAuth();
    const { t } = useLanguage();

    // Basic validation to enable button
    const isValid = firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        password.length >= 8 &&
        termsAccepted;

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            password,
            termsAccepted,
            newsletterSubscribed: true,
        };

        // Validate using Zod for detailed checks
        const result = signupSchema.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach((err: z.ZodIssue) => {
                toast.error(err.message);
            });
            return;
        }

        setIsLoading(true);
        const toastId = toast.loading("Creating account...");

        try {
            await register({
                email: data.email,
                password: data.password,
                fullName: `${data.firstName} ${data.lastName}`.trim(),
                newsletterSubscribed: data.newsletterSubscribed,
                termsAccepted: data.termsAccepted,
            });
            toast.success("Account created successfully!", { id: toastId });
            // On success, redirect to onboarding
            router.push("/onboarding/role");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            // Try to extract message from axios error
            const message = error.response?.data?.message || error.message || "Registration failed";
            toast.error(message, { id: toastId });
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
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white animate-gradient-x pb-1">{t('createAccount')}</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('startCertifying')}</p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1">{t('firstName')}</label>
                                        <Input
                                            name="firstName"
                                            placeholder="John"
                                            disabled={isLoading}
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1">{t('lastName')}</label>
                                        <Input
                                            name="lastName"
                                            placeholder="Doe"
                                            disabled={isLoading}
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1">{t('email')}</label>
                                    <Input
                                        name="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white dark:bg-black border-gray-300 dark:border-white/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1">{t('password')}</label>
                                    <div className="relative">
                                        <Input
                                            name="password"
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            disabled={isLoading}
                                            required
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

                                <div className="space-y-3">
                                    <div className="flex items-start space-x-2 my-2">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            id="terms"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-black dark:ring-offset-gray-800"
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 dark:text-gray-400"
                                        >
                                            I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                                        </label>
                                    </div>

                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || !isValid}
                                >
                                    {isLoading && (
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    )}
                                    {t('createAccount')}
                                </Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-50 dark:bg-black px-2 text-gray-500">
                                    {t('orSignUpWith')}
                                </span>
                            </div>
                        </div>

                        <SocialLoginButtons />
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t('alreadyHaveAccount')} </span>
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            {t('signIn')}
                        </Link>
                    </div>
                </div >
            </FadeIn >
        </div >
    );
}
