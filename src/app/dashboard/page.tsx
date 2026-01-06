import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="bg-white dark:bg-black min-h-[calc(100vh-4rem)] flex items-center justify-center transition-colors duration-300">
            <div className="text-center px-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Creator Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Manage your certified assets, track model usage, and view your earnings.
                </p>
                <div className="p-8 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <p className="text-sm text-gray-500">Dashboard functionality is coming soon for early access users.</p>
                </div>
                <div className="mt-8">
                    <Button variant="outline" className="border-gray-300 dark:border-white/20">Return Home</Button>
                </div>
            </div>
        </div>
    );
}
