import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { toast } from "sonner";
import { useState } from "react";
import { useLanguage } from "@/components/language-context";

export function SocialLoginButtons() {
    const { loginWithGoogle } = useAuth();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    async function handleGoogleLogin() {
        setIsLoading(true);
        try {
            await loginWithGoogle();
            toast.success("Signed in with Google");
        } catch (error: any) {
            console.error(error);
            // Firebase errors look like auth/popup-closed-by-user
            toast.error("Google sign-in failed. Check the console or config.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <Button
                variant="outline"
                className="w-full h-12 text-base font-medium relative hover:bg-gray-50 dark:hover:bg-white/5 border-gray-300 dark:border-white/20 text-black dark:text-white"
                onClick={handleGoogleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                ) : (
                    <svg className="h-5 w-5 mr-2 absolute left-4" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21c.88-2.6 3.31-4.53 6.16-4.53z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                )}
                {t('continueGoogle')}
            </Button>

            <Button variant="outline" className="w-full h-12 text-base font-medium relative hover:bg-gray-50 dark:hover:bg-white/5 border-gray-300 dark:border-white/20 text-black dark:text-white">
                <svg className="h-5 w-5 mr-2 absolute left-4 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.75-.72 1.63.18 2.89 1 3.62 2.12-3.34 1.73-2.68 6.44.59 7.75-.62 1.58-1.52 3.14-3.04 3.04zm-1.74-13.8c.61-1.09.28-2.65-1.1-2.94-1.31-.22-2.73 1.1-2.27 2.74.45 1.62 2.76 1.32 3.37.2z" />
                </svg>
                {t('continueApple')}
            </Button>
        </div>
    );
}
