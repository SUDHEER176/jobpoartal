"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const defaultData = [
    {
        id: 1,
        question: "How does the AI matching work?",
        answer: "Our advanced AI analyzes your profile, skills, and experience against thousands of job descriptions. It looks for semantic matches, not just keywords, to ensure you see roles where you'll truly excel."
    },
    {
        id: 2,
        question: "Is my personal information safe?",
        answer: "Absolutely. We use bank-level encryption to protect your data. You have full control over who sees your profile, and we never sell your information to third parties."
    },
    {
        id: 3,
        question: "What makes 'Verified Jobs' different?",
        answer: "Verified Jobs have been manually vetted by our trust and safety team. We confirm the company's identity and the validity of the open role to protect you from scams and ghost jobs."
    },
    {
        id: 4,
        question: "Can I apply for jobs globally?",
        answer: "Yes! We specialize in both local and remote global opportunities. You can filter by region, time zone alignment, and relocation support to find the perfect international role."
    },
    {
        id: 5,
        question: "Is there a cost for job seekers?",
        answer: "No, our core features for job seekers are 100% free. You can search, apply, and get matched without paying a dime. We also offer optional premium career coaching."
    }
];

export function FAQSection({
    data = defaultData,
    className,
    questionClassName,
    answerClassName,
}) {
    const [openItem, setOpenItem] = React.useState(null);
    const containerRef = React.useRef(null);
    const contentRefs = React.useRef(new Map());

    // Register GSAP plugins
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
    }, []);

    // Set up GSAP animations
    useGSAP(() => {
        if (!containerRef.current || data.length === 0) return;

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${data.length * 200}`, // adjust spacing
                scrub: 0.3,
                pin: true,
                markers: false,
            },
        });

        data.forEach((item, index) => {
            const contentRef = contentRefs.current.get(item.id.toString());
            if (contentRef) {
                tl.add(() => {
                    setOpenItem(item.id.toString());
                }, index * 2); // spacing between triggers
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [data]);

    return (
        <div
            ref={containerRef}
            className={cn("max-w-4xl mx-auto text-center py-24 relative z-20", className)}
        >
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
                    Frequently Asked Questions
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
                    Everything you need to know about finding your dream career with us.
                </p>
            </div>

            <Accordion.Root type="single" collapsible value={openItem || ""}>
                {data.map((item) => (
                    <Accordion.Item value={item.id.toString()} key={item.id} className="mb-6">
                        <Accordion.Header>
                            <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4 cursor-pointer group">
                                <div
                                    className={cn(
                                        "relative flex w-full items-center justify-between rounded-2xl p-6 transition-all duration-300 border border-slate-200 dark:border-white/5",
                                        openItem === item.id.toString()
                                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/30 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10"
                                            : "bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10",
                                        questionClassName
                                    )}
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        {item.icon && (
                                            <span
                                                className={cn(
                                                    "absolute bottom-6",
                                                    item.iconPosition === "right" ? "right-0" : "left-0"
                                                )}
                                                style={{
                                                    transform: item.iconPosition === "right" ? "rotate(7deg)" : "rotate(-4deg)",
                                                }}
                                            >
                                                {item.icon}
                                            </span>
                                        )}
                                        <span className={cn(
                                            "font-semibold text-xl",
                                            openItem === item.id.toString() ? "text-blue-600 dark:text-blue-300" : "text-slate-900 dark:text-white"
                                        )}>
                                            {item.question}
                                        </span>
                                    </div>

                                    <span
                                        className={cn(
                                            "transition-colors duration-300",
                                            openItem === item.id.toString() ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                                        )}
                                    >
                                        {openItem === item.id.toString() ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                                    </span>
                                </div>
                            </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Content asChild forceMount>
                            <motion.div
                                ref={(el) => {
                                    if (el) contentRefs.current.set(item.id.toString(), el);
                                }}
                                initial="collapsed"
                                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                                variants={{
                                    open: { opacity: 1, height: "auto", marginTop: "1rem" },
                                    collapsed: { opacity: 0, height: 0, marginTop: "0" },
                                }}
                                transition={{ duration: 0.4 }}
                                className="overflow-hidden"
                            >
                                <div className="flex justify-start px-4">
                                    <div
                                        className={cn(
                                            "rounded-2xl p-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-left w-full font-medium",
                                            answerClassName
                                        )}
                                    >
                                        {item.answer}
                                    </div>
                                </div>
                            </motion.div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    );
}
