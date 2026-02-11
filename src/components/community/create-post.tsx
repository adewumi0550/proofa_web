"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Image as ImageIcon, Lock, Globe, X } from "lucide-react";
import { NFTWidget } from "./nft-widget";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { useAuth } from "@/components/auth-context";

interface CreatePostProps {
    onPost: (postData: any) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [showNFTWidget, setShowNFTWidget] = useState(false);
    const [mintNFT, setMintNFT] = useState(false);
    const [coinAmount, setCoinAmount] = useState(0);

    const handleSubmit = () => {
        if (!content.trim()) return;

        onPost({
            content,
            isPrivate,
            mintNFT,
            coinAmount,
            timestamp: "Just now",
            // Image would be handled here
        });

        // Reset
        setContent("");
        setMintNFT(false);
        setCoinAmount(0);
        setShowNFTWidget(false);
    };

    return (
        <div className="p-4 rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm mb-6">
            <div className="flex gap-4">
                <Avatar className="w-10 h-10 border border-gray-100 dark:border-white/10 hidden sm:block">
                    <AvatarImage src={user?.avatar_url} />
                    <AvatarFallback>{user?.first_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                    <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[80px] bg-gray-50 dark:bg-white/5 border-none resize-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-500"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {showNFTWidget && (
                        <div className="relative">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                                onClick={() => setShowNFTWidget(false)}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                            <NFTWidget onMintChange={setMintNFT} onCoinAmountChange={setCoinAmount} />
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500 rounded-full gap-2 px-3">
                                <ImageIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Media</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`rounded-full gap-2 px-3 ${showNFTWidget ? 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'text-gray-500 hover:text-purple-500'}`}
                                onClick={() => setShowNFTWidget(!showNFTWidget)}
                            >
                                <span className="font-bold">NFT/Coin</span>
                            </Button>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full gap-2 px-3">
                                        {isPrivate ? <Lock className="w-4 h-4 text-yellow-500" /> : <Globe className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{isPrivate ? "Private" : "Public"}</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-2" align="start">
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => setIsPrivate(false)}
                                            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-sm text-left"
                                        >
                                            <Globe className="w-4 h-4" />
                                            <div>
                                                <p className="font-bold">Public</p>
                                                <p className="text-xs text-gray-500">Anyone can see this</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setIsPrivate(true)}
                                            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-sm text-left"
                                        >
                                            <Lock className="w-4 h-4 text-yellow-500" />
                                            <div>
                                                <p className="font-bold">Private</p>
                                                <p className="text-xs text-gray-500">Only members can see</p>
                                            </div>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6"
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
