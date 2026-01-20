"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Users2, Trophy, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/fade-in";
import { useLanguage } from "@/components/language-context";

export default function CommunityPage() {
    const { t } = useLanguage();
    const discussions = [
        {
            id: 1,
            title: "Best practices for copyrighting GenAI outputs?",
            author: "User_101",
            avatarColor: "bg-blue-400",
            replies: 24,
            likes: 156,
            time: "2h ago",
            tag: "Legal",
            preview: "I've been using the new V3 pipeline and I'm wondering how the metadata embedding handles post-processing in Photoshop..."
        },
        {
            id: 2,
            title: "Showcase: My first certified collection sold out!",
            author: "Artist_X",
            avatarColor: "bg-purple-400",
            replies: 89,
            likes: 432,
            time: "5h ago",
            tag: "Success Story",
            preview: "Thanks to Proofa's instant licensing, a game studio picked up my environment assets this morning. Here's a breakdown of the workflow..."
        },
        {
            id: 3,
            title: "Request: Support for ComfyUI custom nodes",
            author: "Dev_Mike",
            avatarColor: "bg-green-400",
            replies: 12,
            likes: 45,
            time: "1d ago",
            tag: "Feature Request",
            preview: "Is there an ETA for the official plugin support for custom node workflows? I need to certify the intermediate latents."
        }
    ];

    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] pt-12 pb-24 transition-colors duration-300">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('community')}</h1>
                            <p className="text-gray-600 dark:text-gray-400">{t('communitySubtitle')}</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {t('newDiscussion')}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('categories')}</h3>
                                <div className="space-y-2">
                                    {[t('catGeneral'), t('catShowcase'), t('catLegal'), t('catSupport'), t('catRequests')].map((cat) => (
                                        <div key={cat} className="flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-600 dark:text-gray-400 transition-colors">
                                            <span>{cat}</span>
                                            <span className="bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded-full text-xs">12</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-500/20">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-orange-500" /> {t('topContributors')}
                                </h3>
                                <div className="space-y-3 mt-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500`}></div>
                                            <div className="text-sm">
                                                <p className="font-medium text-gray-900 dark:text-white">Creator_{i}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">1.2k Rep</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Feed */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input className="pl-10 bg-white dark:bg-white/5 border-gray-200 dark:border-white/10" placeholder="Search discussions..." />
                                </div>
                                <Button variant="outline" className="border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </div>

                            {discussions.map((post) => (
                                <div key={post.id} className="bg-white dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer group">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-full ${post.avatarColor} flex-shrink-0`}></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                                                <span>•</span>
                                                <span>{post.time}</span>
                                                <span>•</span>
                                                <span className="bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">{post.tag}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">{post.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{post.preview}</p>

                                            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2 hover:text-blue-500">
                                                    <MessageSquare className="w-4 h-4" />
                                                    {post.replies} Replies
                                                </div>
                                                <div className="flex items-center gap-2 hover:text-pink-500">
                                                    <Users2 className="w-4 h-4" />
                                                    {post.likes} Interested
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="text-center pt-8">
                                <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{t('loadMore')}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
