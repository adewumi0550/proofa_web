"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, CreditCard, Clock, Star, Award, MapPin, ChevronRight, Save, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/components/language-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { proofaApi } from "@/lib/api";
import { UserDropdown } from "@/components/dashboard/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteAccountModal } from "@/components/delete-account-modal";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Deletion State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
        }
    }, [user]);

    const handleDeleteAccount = async (reason: string) => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem("proofa_access_token");
            if (token) {
                await proofaApi.auth.delete(token, reason);
            }
            logout();
            router.push("/signup");
        } catch (error) {
            console.error("Failed to delete account:", error);
            logout();
            router.push("/signup");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleSaveProfile = async () => {
        if (!user?.access_token) return;
        setIsSaving(true);
        try {
            await proofaApi.auth.updateProfile({
                first_name: firstName,
                last_name: lastName
            }, user.access_token);

            toast.success("Profile updated successfully");
            setIsEditing(false);
            // Ideally reload user from auth context, but for now local state is fine
            // Since we can't easily trigger a reload of 'user' in auth context without exposing a method manually,
            // we will assume the change propagated or will on next refresh.
            // A full implementation would add refreshUser() to AuthContext.
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const activities = [
        { id: 1, action: "Certified Project", target: "Cyberpunk Manifesto", time: "2 hours ago", icon: ShieldCheck },
        { id: 2, action: "New Project", target: "Abstract Dreams", time: "1 day ago", icon: Zap },
        { id: 3, action: "Analysis Complete", target: "sketch_v1.png", time: "2 days ago", icon: Star },
        { id: 4, action: "Plan Upgraded", target: "Early Adopter Tier", time: "1 week ago", icon: CreditCard },
    ];

    const stats = [
        { label: "Trust Score", value: user ? `${user.trust_score || 0}/100` : null, icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Projects", value: user ? `${user.projects_count || 0}` : null, icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Certified", value: user ? `${user.certified_count || 0}` : null, icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="flex-1 h-full overflow-y-auto bg-[#fbfbfb] dark:bg-[#090909] p-8 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header with Controls similar to Dashboard */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/dashboard" className="font-semibold text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors">
                            {t('dashboard')}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>Profile</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <UserDropdown />
                    </div>
                </header>

                {/* Header Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[32px] bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-xl"
                >
                    <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800" />
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="p-1 rounded-full bg-white dark:bg-[#111]">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-white/10 dark:to-white/20 flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-white border-4 border-white dark:border-[#111]">
                                    {user?.first_name?.charAt(0) || "U"}
                                </div>
                            </div>

                            {!isEditing ? (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    variant="outline"
                                    className="rounded-full border-gray-200 dark:border-white/10 gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        variant="ghost"
                                        className="rounded-full hover:bg-gray-100 dark:hover:bg-white/10 h-10 w-10 p-0"
                                        disabled={isSaving}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={handleSaveProfile}
                                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div>
                            {!isEditing ? (
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                    {firstName} {lastName}
                                </h1>
                            ) : (
                                <div className="flex gap-4 mb-2 max-w-md">
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                                    />
                                    <Input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user?.location || "Global Citizen"}</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                                    {user?.persona || "Creator"}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4"
                        >
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-gray-900 dark:text-white">
                                    {stat.value !== null ? stat.value : <Skeleton className="h-8 w-16 rounded-md" />}
                                </div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 p-8 rounded-[32px] bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
                        <div className="space-y-6">
                            {activities.map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:border-blue-500 transition-colors">
                                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        {i !== activities.length - 1 && <div className="w-px h-full bg-gray-100 dark:bg-white/5 my-2" />}
                                    </div>
                                    <div className="pb-6">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {item.action} <span className="text-gray-500">on</span> <span className="font-bold">{item.target}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3" /> {item.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Subscription Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Current Plan */}
                        <div className="p-8 rounded-[32px] bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">{t('activeSubscription') || "Active Subscription"}</span>
                                </div>
                                <h3 className="text-2xl font-black mb-1 capitalize">{user?.plan || "Free"}</h3>
                                <p className="text-gray-400 text-sm mb-6">{t('poweringWorkflows') || "Powering your daily creative workflows."}</p>

                                <div className="space-y-3 pt-6 border-t border-white/10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">{t('credits') || "Credits"}</span>
                                        <span className="font-bold text-blue-400">{user?.credits || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">{t('status') || "Status"}</span>
                                        <span className="font-bold text-green-400">{t('active') || "Active"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2 truncate">{t('managingSubscriptions') || "Managing Subscriptions?"}</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mb-4 leading-relaxed">
                                {t('manageBillingDesc') || "You can now manage your billing and invoices on the dedicated Subscriptions page."}
                            </p>
                            <Link href="/subscriptions">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold">
                                    {t('goToSubscriptions') || "Go to Subscriptions"}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Danger Zone */}
                <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/10">
                    <div className="p-8 rounded-[32px] border border-red-200 dark:border-red-900/20 bg-red-50 dark:bg-red-900/5">
                        <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">Danger Zone</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-2xl">
                            Permanently delete your account and all of your content. This action is irreversible—please be certain.
                        </p>
                        <Button
                            onClick={() => setShowDeleteModal(true)}
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-900/20"
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>

                <DeleteAccountModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteAccount}
                    isLoading={isDeleting}
                />

            </div>
        </div>
    );
}
