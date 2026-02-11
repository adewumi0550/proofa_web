"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    Heart,
    MessageCircle,
    Share2,
    MoreHorizontal,
    Coins,
    Sparkles,
    Lock,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
    id: string;
    author: {
        name: string;
        handle: string;
        avatar?: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    isPrivate?: boolean;
    hasNFT?: boolean;
    coinAmount?: number;
    image?: string;
}

export function PostCard({
    id,
    author,
    content,
    timestamp,
    likes,
    comments,
    isPrivate,
    hasNFT,
    coinAmount,
    image
}: PostCardProps) {
    const [liked, setLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-gray-100 dark:border-white/10">
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{author.name}</h4>
                            <span className="text-gray-500 text-xs">@{author.handle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{timestamp}</span>
                            <span>•</span>
                            {isPrivate ? (
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Lock className="w-3 h-3" />
                                    <span>Private</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Globe className="w-3 h-3" />
                                    <span>Public</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                    {content}
                </p>

                {image && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10">
                        <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[400px]" />
                    </div>
                )}
            </div>

            {/* Badges / NFT / Coins */}
            {(hasNFT || (coinAmount && coinAmount > 0)) && (
                <div className="flex items-center gap-2 mb-4">
                    {hasNFT && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Minted NFT</span>
                        </div>
                    )}
                    {coinAmount && coinAmount > 0 && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold border border-yellow-200 dark:border-yellow-800/30">
                            <Coins className="w-3.5 h-3.5" />
                            <span>{coinAmount} Coins</span>
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={cn(
                            "gap-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500",
                            liked ? "text-red-500" : "text-gray-500"
                        )}
                    >
                        <Heart className={cn("w-5 h-5", liked && "fill-current")} />
                        <span className="font-medium">{likeCount}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">{comments}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10">
                        <Coins className="w-5 h-5" />
                        <span className="font-medium">Tip</span>
                    </Button>
                </div>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full">
                    <Share2 className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
