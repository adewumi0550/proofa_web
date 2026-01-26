"use client";

import { ShowOffView } from "@/components/dashboard/show-off-view";
import { FadeIn } from "@/components/fade-in";

export default function ShowOffPage() {
    return (
        <div className="bg-[#fbfbfb] dark:bg-[#090909] min-h-[calc(100vh-4rem)] pt-12 transition-colors duration-500 pb-20 overflow-x-hidden uppercase">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-6">
                    <ShowOffView />
                </div>
            </FadeIn>
        </div>
    );
}
