"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Users, Folder, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function UserDropdown() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white dark:ring-black outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                    {user?.first_name?.charAt(0) || "U"}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-2">
                        <p className="text-base font-bold leading-none">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs leading-none text-muted-foreground opacity-70">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuGroup className="space-y-1">
                    <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <User className="mr-3 h-4 w-4 text-blue-500" />
                            <span className="font-medium">Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/communities">
                        <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <Users className="mr-3 h-4 w-4 text-purple-500" />
                            <span className="font-medium">Join communities</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                        <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <Folder className="mr-3 h-4 w-4 text-orange-500" />
                            <span className="font-medium">Manage Projects</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/subscriptions">
                        <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                            <CreditCard className="mr-3 h-4 w-4 text-green-500" />
                            <span className="font-medium">Subscriptions</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer py-2.5 px-3 rounded-lg text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-bold">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
