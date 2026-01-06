import { AccordionItem } from "@/components/faq-accordion";

export default function FAQPage() {
    return (
        <div className="bg-black min-h-[calc(100vh-4rem)] py-20">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h1>

                <div className="space-y-2">
                    <AccordionItem title="What is Proofa?">
                        Proofa is a decentralized registry and legal certification layer for AI workflows. We help creators prove authorship and license their outputs from models like Midjourney, ChatGPT, and Veo.
                    </AccordionItem>

                    <AccordionItem title="How does the certification work?">
                        We cryptographically timestamp your prompts, seed data, and generation metadata. This creates a forensic audit trail that establishes your "human-in-the-loop" contribution, which is essential for copyright claims.
                    </AccordionItem>

                    <AccordionItem title="Do you support video models?">
                        Yes! We support all major video generation models including Runway Gen-2, Pika, and Google Veo.
                    </AccordionItem>

                    <AccordionItem title="Is this legally binding?">
                        Proofa provides a robust evidence package that has been crafted by IP attorneys. While no tool guarantees copyright (only a court can decide), Proofa maximizes your claim strength by documenting creative control.
                    </AccordionItem>
                </div>
            </div>
        </div>
    );
}
