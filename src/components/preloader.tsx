"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ProofaPreloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple timeout to demonstrate loading. 
        // In a real app you might track route changes or auth state.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative w-24 h-24 mb-6"
                    >
                        <Image src="/proofa.png" alt="Proofa" fill className="object-contain" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <h1 className="text-2xl font-black tracking-wider text-gray-900 dark:text-white">PROOFA</h1>
                        <div className="w-12 h-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-600 w-full"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
