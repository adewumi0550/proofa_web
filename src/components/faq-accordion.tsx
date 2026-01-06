"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-4 text-left text-white hover:bg-white/5 transition-colors"
            >
                <span className="font-medium text-lg">{title}</span>
                <ChevronDown
                    className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")}
                />
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
