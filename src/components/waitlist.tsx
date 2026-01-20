"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/components/language-context";

export function Waitlist() {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setLoading(false);
            setEmail("");
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="relative flex items-center max-w-lg mx-auto bg-gray-100 dark:bg-zinc-900 rounded-full p-2 border border-blue-500/20 shadow-lg">
                <Input
                    type="email"
                    placeholder={t('enterEmailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                    disabled={loading || status === "success"}
                />
                <Button
                    type="submit"
                    disabled={loading || status === "success"}
                    className="rounded-full bg-white dark:bg-white text-gray-900 hover:bg-gray-50 font-medium px-6 transition-all duration-300 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : status === "success" ? "Joined!" : t('joinWaitlistBtn')}
                </Button>
            </form>
            {status === "success" && (
                <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-bottom-2">
                    Thanks for joining! We'll be in touch soon. 🚀
                </p>
            )}
        </div>
    );
}
