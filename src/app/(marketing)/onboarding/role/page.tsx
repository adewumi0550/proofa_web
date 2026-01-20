"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, GraduationCap, Feather, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
    {
        id: "student",
        title: "Student",
        icon: GraduationCap,
        description: "I'm learning and experimenting with AI tools.",
    },
    {
        id: "poet",
        title: "Poet / Artist",
        icon: Feather,
        description: "I use AI to enhance my creative expression.",
    },
    {
        id: "educator",
        title: "Educator",
        icon: BookOpen,
        description: "I teach others how to use AI responsibly.",
    },
    {
        id: "other",
        title: "Other",
        icon: User,
        description: "I'm exploring for other professional reasons.",
    },
];

export default function RoleSelectionPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { completeProfile } = useAuth();

    async function handleComplete() {
        if (!selectedRole) return;

        setIsLoading(true);
        const toastId = toast.loading("Saving profile...");

        try {
            await completeProfile(selectedRole);
            toast.success("Profile updated!", { id: toastId });
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Failed to complete profile", error);
            toast.error("Failed to save profile. Please try again.", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-4">
            <Link href="/" className="mb-8 flex items-center gap-2">
                <Logo className="h-10 w-10 text-blue-500" />
            </Link>

            <div className="w-full max-w-2xl space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tell us about yourself</h2>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Select the role that best describes you to personalize your experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={cn(
                                "relative flex flex-col p-6 cursor-pointer rounded-xl border-2 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10",
                                selectedRole === role.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/5"
                            )}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn(
                                    "p-3 rounded-lg",
                                    selectedRole === role.id ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                                )}>
                                    <role.icon className="w-6 h-6" />
                                </div>
                                {selectedRole === role.id && (
                                    <div className="bg-blue-500 rounded-full p-1 text-white">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{role.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-8">
                    <Button
                        size="lg"
                        className="px-8 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                        disabled={!selectedRole || isLoading}
                        onClick={handleComplete}
                    >
                        {isLoading && (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        )}
                        Complete Setup
                    </Button>
                </div>
            </div>
        </div>
    );
}
