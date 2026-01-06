import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
    return (
        <div className="bg-black min-h-[calc(100vh-4rem)]">
            {/* Hero */}
            <div className="py-20 px-6 text-center border-b border-white/10">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Power Tools for <span className="text-blue-500">AI Creators</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-8">
                    The first professional suite designed for the post-generation workflow.
                </p>
            </div>

            {/* Feature Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 text-2xl">🛡️</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Forensic Watermarking</h3>
                    <p className="text-gray-400">Embed invisible, resilient metadata into every pixel and frame. Prove ownership even after your content has been screen-recorded or compressed.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-purple-600/20 text-purple-400 rounded-xl flex items-center justify-center mb-6 text-2xl">⚡</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Prompt Versioning</h3>
                    <p className="text-gray-400">Git-like history for your prompt engineering. Branch, merge, and rollback your creative parameters across different models.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-green-600/20 text-green-400 rounded-xl flex items-center justify-center mb-6 text-2xl">💰</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Smart Licensing</h3>
                    <p className="text-gray-400">Deploy instant licensing contracts. Allow brands to purchase rights to your generations directly through the Proofa marketplace.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-pink-600/20 text-pink-400 rounded-xl flex items-center justify-center mb-6 text-2xl">🌐</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Cross-Model Registry</h3>
                    <p className="text-gray-400">One dashboard for Midjourney, DALL-E 3, Stable Diffusion, and more. Unify your portfolio regardless of the tool you used.</p>
                </div>
            </div>

            <div className="text-center pb-20">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full font-bold">
                    Explore All Features
                </Button>
            </div>
        </div>
    );
}
