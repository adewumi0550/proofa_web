export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
            <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-gray-400 font-sans tracking-tight animate-pulse">
                    PROOFA
                </span>
            </div>
        </div>
    );
}
