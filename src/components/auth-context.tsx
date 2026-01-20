"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { proofaApi, User } from "@/lib/api";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password?: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    register: (userData: { email: string; password?: string; fullName?: string; newsletterSubscribed?: boolean; termsAccepted?: boolean }) => Promise<void>;
    completeProfile: (persona: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Initial check (mock persistence)
    useEffect(() => {
        const stored = localStorage.getItem("proofa_user");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log("Restoring user from storage:", parsed);
                if (parsed && parsed.email) {
                    setUser(parsed);
                } else {
                    console.warn("Stored user invalid, clearing.");
                    localStorage.removeItem("proofa_user");
                }
            } catch (e) {
                console.error("Failed to parse user from storage", e);
                localStorage.removeItem("proofa_user");
            }
        }
    }, []);

    const login = async (email: string, password?: string) => {
        try {
            if (!password) throw new Error("Password is required");

            const res = await proofaApi.auth.login(email, password);
            console.log("Logged in:", res.data);

            if (!res.data.success || !res.data.data) {
                throw new Error(res.data.message || "Invalid response from server");
            }

            const { user, access_token } = res.data.data;

            // Attach token if missing in user object but present in response
            if (access_token && !user.access_token) {
                user.access_token = access_token;
            }

            localStorage.setItem("proofa_user", JSON.stringify(user));
            setUser(user);

            // Redirect logic same as social login
            if (!user.persona) {
                router.push("/onboarding/role");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const idToken = await userCredential.user.getIdToken();

            const res = await proofaApi.auth.socialLogin(idToken);
            console.log("Social Login:", res.data);

            if (!res.data.success || !res.data.data) {
                console.error("Invalid response structure:", res.data);
                throw new Error(res.data.message || "Invalid response from server");
            }

            const { user, access_token } = res.data.data;

            if (access_token && !user.access_token) {
                user.access_token = access_token;
            }

            localStorage.setItem("proofa_user", JSON.stringify(user));
            setUser(user);

            // Redirect logic
            if (!user.persona) {
                router.push("/onboarding/role");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Google login failed", error);
            throw error;
        }
    };

    const register = async (userData: { email: string; password?: string; fullName?: string; newsletterSubscribed?: boolean; termsAccepted?: boolean }) => {
        try {
            // Split Full Name
            const [firstName, ...lastNameParts] = (userData.fullName || "").split(" ");
            const lastName = lastNameParts.join(" ");

            const res = await proofaApi.auth.register(
                userData.email,
                userData.password || "",
                firstName || "",
                lastName || "",
                userData.newsletterSubscribed ?? true,
                userData.termsAccepted ?? true
            );
            console.log("Registered:", res.data);

            if (!res.data.success || !res.data.data) {
                throw new Error(res.data.message || "Registration failed");
            }

            const { user, access_token } = res.data.data;
            if (access_token && !user.access_token) {
                user.access_token = access_token;
            }

            localStorage.setItem("proofa_user", JSON.stringify(user));
            setUser(user);
            router.push("/onboarding/role");
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const completeProfile = async (persona: string) => {
        try {
            // Use stored token or fallback for demo
            const token = user?.access_token || "";

            const res = await proofaApi.auth.completeProfile(persona, token);
            console.log("Profile completed:", res.data);

            if (!res.data.success || !res.data.data) {
                throw new Error(res.data.message || "Failed to complete profile");
            }

            // Update local user state
            const updatedUser = { ...user!, persona };
            localStorage.setItem("proofa_user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error("Complete profile failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("proofa_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginWithGoogle, register, completeProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
