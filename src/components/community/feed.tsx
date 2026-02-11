"use client";

import React, { useState } from "react";
import { PostCard } from "./post-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface FeedProps {
    posts: any[];
}

export function Feed({ posts }: FeedProps) {
    const [activeTab, setActiveTab] = useState("all");

    const filteredPosts = posts.filter(post => {
        if (activeTab === "all") return true;
        if (activeTab === "public") return !post.isPrivate;
        if (activeTab === "private") return post.isPrivate;
        return true;
    });

    return (
        <div className="space-y-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-transparent border-b border-gray-200 dark:border-white/10 w-full justify-start h-auto p-0 rounded-none mb-6">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none pb-3 px-4 font-medium text-gray-500 data-[state=active]:text-blue-600"
                    >
                        All Posts
                    </TabsTrigger>
                    <TabsTrigger
                        value="public"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none pb-3 px-4 font-medium text-gray-500 data-[state=active]:text-blue-600"
                    >
                        Public
                    </TabsTrigger>
                    <TabsTrigger
                        value="private"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none pb-3 px-4 font-medium text-gray-500 data-[state=active]:text-blue-600"
                    >
                        Private
                    </TabsTrigger>
                </TabsList>

                <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                layout
                            >
                                <PostCard {...post} />
                            </motion.div>
                        ))}
                        {filteredPosts.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-gray-500"
                            >
                                <p>No posts found in this filter.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Tabs>
        </div>
    );
}
