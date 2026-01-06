import { Check, X, Minus } from "lucide-react";

export function PricingComparison() {
    const features = [
        {
            category: "Certification",
            items: [
                { name: "Daily Generations", free: "10", pro: "Unlimited", classic: "Unlimited" },
                { name: "Verification Level", free: "Basic", pro: "Standard", classic: "Advanced" },
                { name: "Metadata Embedding", free: false, pro: true, classic: true },
                { name: "Blockchain Timestamp", free: false, pro: true, classic: true },
            ]
        },
        {
            category: "Protection",
            items: [
                { name: "IP Indemnity", free: false, pro: "$10,000", classic: "$1,000,000" },
                { name: "Takedown Assistance", free: false, pro: "Standard", classic: "Priority" },
                { name: "Legal Consultation", free: false, pro: false, classic: true },
            ]
        },
        {
            category: "Workflow",
            items: [
                { name: "Model Registry", free: "Private Only", pro: "Public/Private", classic: "Custom" },
                { name: "API Access", free: false, pro: false, classic: true },
                { name: "Team Members", free: "1", pro: "5", classic: "Unlimited" },
            ]
        }
    ];

    return (
        <div className="py-24 bg-white dark:bg-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Compare Plans</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Detailed breakdown of features and limits.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-semibold">Feature</th>
                                <th className="p-4 border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold text-center w-1/4">Free Explorer</th>
                                <th className="p-4 border-b border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 font-semibold text-center w-1/4">Pro Creator</th>
                                <th className="p-4 border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold text-center w-1/4">Classic</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((section) => (
                                <>
                                    <tr key={section.category}>
                                        <td colSpan={4} className="p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider mt-4">
                                            {section.category}
                                        </td>
                                    </tr>
                                    {section.items.map((item) => (
                                        <tr key={item.name} className="border-b border-gray-200 dark:border-white/5">
                                            <td className="p-4 text-gray-600 dark:text-gray-300">{item.name}</td>
                                            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                                                {typeof item.free === 'boolean' ? (
                                                    item.free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                                                ) : (
                                                    item.free
                                                )}
                                            </td>
                                            <td className="p-4 text-center text-gray-900 dark:text-white font-medium bg-blue-50/50 dark:bg-blue-900/10">
                                                {typeof item.pro === 'boolean' ? (
                                                    item.pro ? <Check className="w-5 h-5 text-blue-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                                                ) : (
                                                    item.pro
                                                )}
                                            </td>
                                            <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                                                {typeof item.classic === 'boolean' ? (
                                                    item.classic ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                                                ) : (
                                                    item.classic
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
