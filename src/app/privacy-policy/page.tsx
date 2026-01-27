import Link from "next/link";
import { BetaWarningBox } from "@/components/beta-warning-box";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">1. Introduction</h2>
                        <BetaWarningBox />
                        <p className="text-muted-foreground leading-relaxed">
                            Welcome to Proofa. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                            This policy is drafted to comply with the General Data Protection Regulation (GDPR) and the
                            Bundesdatenschutzgesetz (BDSG).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">2. Data Controller</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The controller responsible for the processing of your data is:
                        </p>
                        <address className="not-italic text-muted-foreground mt-2 border-l-2 border-primary/50 pl-4">
                            <strong>Proofa GmbH i.G.</strong><br />
                            [Founder Name - Please Update]<br />
                            [Address - Please Update]<br />
                            Germany<br />
                            Email: <a href="mailto:privacy@proofa.tech" className="text-primary hover:underline">privacy@proofa.tech</a>
                        </address>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">3. Data We Collect</h2>
                        <p className="text-muted-foreground mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Identity Data:</strong> Username, wallet address (if applicable).</li>
                            <li><strong>Contact Data:</strong> Email address.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                        </ul>

                        <div className="mt-6 p-6 bg-secondary/10 border border-primary/20 rounded-xl">
                            <h3 className="text-xl font-medium text-foreground mb-3">Special Note: Authorship & Prompt Hashing</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A core feature of Proofa is the verification of your creative workflow. To protect your intellectual property
                                while preserving privacy, we generate a <strong>cryptographic hash</strong> of your initial creative prompt
                                combined with the unique identifiers of the generated art.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-2">
                                This creates a unique <strong>"Authorship Passport"</strong>. We store this hash (a pseudonymized digital fingerprint)
                                to validly prove your creation lineage. If you choose our <strong>Strictly Private Mode</strong>, we do
                                <strong>not</strong> store the raw text of your prompt, only the non-reversible hash. This ensures that your
                                creative secrets remain yours, while still being verifiable on the blockchain.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">4. Purpose of Processing</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use your data to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li>Provide and maintain our Service.</li>
                            <li>Generate and verify Authorship Passports (Performance of a Contract).</li>
                            <li>Notify you about changes to our Service.</li>
                            <li>Provide customer support.</li>
                            <li>Monitor the usage of the Service to detect, prevent and address technical issues.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">5. Data Storage & Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Your data is securely stored on servers located within the European Union (EU). We implement appropriate
                            technical and organizational measures (TOMs) to ensure a level of security appropriate to the risk,
                            including encryption of data in transit and at rest.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">6. Your Rights</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Under the GDPR, you have the following rights:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                            <li><strong>Right to Access:</strong> You can request copies of your personal data.</li>
                            <li><strong>Right to Rectification:</strong> You can request that we correct any information you believe is inaccurate.</li>
                            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request that we erase your personal data, under certain conditions.</li>
                            <li><strong>Right to Restrict Processing:</strong> You can request that we restrict the processing of your personal data.</li>
                            <li><strong>Right to Object:</strong> You can object to our processing of your personal data.</li>
                            <li><strong>Right to Data Portability:</strong> You can request that we transfer the data that we have collected to another organization, or directly to you.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">7. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br />
                            <a href="mailto:privacy@proofa.tech" className="text-primary hover:underline font-medium">privacy@proofa.tech</a>
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
