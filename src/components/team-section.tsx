"use client";

import { FadeIn } from "@/components/fade-in";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin: string;
    description: string;
}

const team: TeamMember[] = [
    {
        name: "Anna Muzykina",
        role: "Founder & CEO",
        image: "/team/anna.jpg",
        linkedin: "https://www.linkedin.com/in/anna-muzykina/",
        description:
            'The visionary and architectural heart of Proofa. Anna is the creator of the original concept of "Human Creative Energy" and the architect of the platform’s logic. Combining her background as a developer with a deep understanding of the LegalTech landscape, she drives the platform\'s introduction to the world. Anna ensures that every line of code and every feature aligns with the core mission: protecting the "Human Spark" in the age of AI.',
    },
    {
        name: "Denys Doroshev",
        role: "Co-founder & COO",
        image: "/team/denys_v2.png",
        linkedin: "https://www.linkedin.com/in/denys-doroshev/",
        description:
            "The strategic engine of the project. Denys is responsible for the operational stability and growth of Proofa. He manages the complex world of documentation, controls legal and business meetings, and identifies key market opportunities. His focus is on building the bridge between Proofa’s innovative technology and its practical application in the business and legal sectors.",
    },
    {
        name: "Saheed Adewumi",
        role: "Co-founder & CTO",
        image: "/team/saheed_v2.png",
        linkedin: "https://www.linkedin.com/in/saheed-adewumi-015489159/",
        description:
            "The technical powerhouse. Saheed leads the development and execution of the platform’s complex architecture. Working in close collaboration with Anna, he translates her vision and creative logic into a robust, scalable codebase. As the hands-on lead for Proofa’s technical infrastructure, he ensures the platform remains at the cutting edge of Web3 and AI-verification technology.",
    },
];

export function TeamSection() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    return (
        <section className="py-24 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-5 dark:bg-[url('/grid-dark.svg')]"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <FadeIn>
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                            Our Leadership
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Meet the Team
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            The minds behind Proofa dedicated to protecting human creativity.
                        </p>
                    </div>
                </FadeIn>

                <ul
                    role="list"
                    className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    {team.map((person, index) => (
                        <FadeIn key={person.name} delay={index * 0.1}>
                            <li
                                className="group cursor-pointer"
                                onClick={() => setSelectedMember(person)}
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="mx-auto h-48 w-48 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-md mb-6 relative">
                                        <Image
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={person.image}
                                            alt={person.name}
                                            width={192}
                                            height={192}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                        {person.name}
                                    </h3>
                                    <p className="text-base leading-7 text-blue-600 dark:text-blue-400 text-center mb-4">
                                        {person.role}
                                    </p>
                                    <div className="flex justify-center">
                                        <div
                                            className="text-gray-400 hover:text-blue-500 transition-colors z-10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Link
                                                href={person.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="sr-only">LinkedIn</span>
                                                <Linkedin className="h-6 w-6" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </FadeIn>
                    ))}
                </ul>

                <AnimatePresence>
                    {selectedMember && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedMember(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                            />

                            {/* Modal Container to center the modal */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-white/10 pointer-events-auto relative max-h-[90vh] flex flex-col"
                                >
                                    <button
                                        onClick={() => setSelectedMember(null)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors z-10"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="p-8 overflow-y-auto">
                                        <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-md mb-6 relative flex-shrink-0">
                                            <Image
                                                className="h-full w-full object-cover"
                                                src={selectedMember.image}
                                                alt={selectedMember.name}
                                                width={128}
                                                height={128}
                                            />
                                        </div>

                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {selectedMember.name}
                                            </h3>
                                            <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                                {selectedMember.role}
                                            </p>
                                            <Link
                                                href={selectedMember.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                                            >
                                                <Linkedin className="h-5 w-5 mr-1" />
                                                <span className="text-sm">LinkedIn Profile</span>
                                            </Link>
                                        </div>

                                        <div className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                            {selectedMember.description}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
