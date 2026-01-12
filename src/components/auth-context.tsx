"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { proofaApi, RegisterResponse } from "@/lib/api";

import { useRouter } from "next/navigation";

interface AuthContextType {
    user: RegisterResponse | null;
    isAuthenticated: boolean;
    login: (email: string, password?: string) => Promise<void>;
    register: (userData: { email: string; password?: string; fullName?: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<RegisterResponse | null>(null);
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
        // For Proofa Demo, Login is essentially re-registering or mocking fetch
        await register({ email, password });
    };

    const register = async (userData: { email: string; password?: string; fullName?: string }) => {
        try {
            // Split Full Name
            const [firstName, ...lastNameParts] = (userData.fullName || "").split(" ");
            const lastName = lastNameParts.join(" ");

            const res = await proofaApi.auth.register(userData.email, userData.password || "", firstName || "", lastName || "");
            console.log("Registered:", res.data);

            // Backend might return empty email/id in demo mode sometimes, so fallback
            let storedUser = res.data;
            if (!storedUser.email) storedUser.email = userData.email;

            localStorage.setItem("proofa_user", JSON.stringify(storedUser));
            setUser(storedUser);
            router.push("/onboarding/role");
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("proofa_user");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
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
