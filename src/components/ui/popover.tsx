"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>> | ((open: boolean) => void);
} | null>(null);

const Popover = ({ children, open: controlledOpen, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = onOpenChange ?? setUncontrolledOpen;

    return (
        <PopoverContext.Provider value={{ open, setOpen }}>
            <div className="relative inline-block">{children}</div>
        </PopoverContext.Provider>
    );
};

const PopoverTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, onClick, children, ...props }, ref) => {
    const context = React.useContext(PopoverContext);
    if (!context) throw new Error("PopoverTrigger must be used within Popover");

    return (
        <button
            ref={ref}
            onClick={(e) => {
                context.setOpen(!context.open);
                onClick?.(e);
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </button>
    );
});
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end" }
>(({ className, align = "center", style, ...props }, ref) => {
    const context = React.useContext(PopoverContext);
    if (!context || !context.open) return null;

    const alignClass = align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 mt-2",
                alignClass,
                className
            )}
            style={style}
            {...props}
        />
    );
});
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
