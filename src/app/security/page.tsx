import Link from "next/link";

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Security at Proofa</h1>
                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">Data Protection</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Security is our top priority. We use industry-standard encryption to protect your data both in transit and at rest. Your Authorship Passports are secured using cryptographic hashing.
                        </p>
                    </section>
                    <div className="pt-8 border-t border-border mt-12">
                        <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
                            &larr; Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
