import { useState } from "react";
import { UserPlus, Search, Send, Briefcase, Building2, ClipboardList, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const seekerSteps = [
    {
        icon: UserPlus,
        title: "Create Profile",
        description: "Build your professional profile and showcase your skills."
    },
    {
        icon: Search,
        title: "Search Jobs",
        description: "Filter through thousands of tailored job listings."
    },
    {
        icon: Send,
        title: "Apply Easily",
        description: "Submit applications with a single click."
    },
    {
        icon: Briefcase,
        title: "Get Hired",
        description: "Land your dream job and grow your career."
    }
];

const recruiterSteps = [
    {
        icon: Building2,
        title: "Company Setup",
        description: "Create your employer profile and brand."
    },
    {
        icon: ClipboardList,
        title: "Post Job",
        description: "Create detailed job descriptions to attract talent."
    },
    {
        icon: Search,
        title: "Review Apps",
        description: "Manage and filter candidate applications."
    },
    {
        icon: CheckCircle2,
        title: "Hire Talent",
        description: "Select, interview, and onboard the best candidates."
    }
];

export function HowItWorks() {
    const [role, setRole] = useState('seeker');
    const steps = role === 'seeker' ? seekerSteps : recruiterSteps;

    return (
        <section className="py-24 px-4 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">How It <span className="text-blue-500">Works</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
                        Simplified steps to achieve your {role === 'seeker' ? 'career goals' : 'hiring targets'}.
                    </p>

                    {/* Role Toggle */}
                    <div className="mt-10 flex justify-center">
                        <div className="relative flex bg-slate-200 dark:bg-zinc-900 p-1.5 rounded-2xl w-full max-w-sm border border-slate-300 dark:border-white/5">
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20"
                                initial={false}
                                animate={{
                                    left: role === 'seeker' ? '0.375rem' : 'calc(50% + 0.1875rem)',
                                    right: role === 'seeker' ? 'calc(50% + 0.1875rem)' : '0.375rem',
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => setRole('seeker')}
                                className={cn(
                                    "relative z-10 flex-1 py-3 text-sm font-black uppercase tracking-widest transition-colors duration-300",
                                    role === 'seeker' ? "text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                )}
                            >
                                Job Seeker
                            </button>
                            <button
                                onClick={() => setRole('recruiter')}
                                className={cn(
                                    "relative z-10 flex-1 py-3 text-sm font-black uppercase tracking-widest transition-colors duration-300",
                                    role === 'recruiter' ? "text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                )}
                            >
                                Recruiter
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[4rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <AnimatePresence mode="wait">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={`${role}-${index}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="relative flex flex-col items-center text-center group"
                                    >
                                        {/* Icon Circle */}
                                        <div className="relative z-10 mb-8 flex size-32 items-center justify-center rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:rotate-3 group-hover:shadow-blue-500/10">
                                            <Icon className="size-12 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300" />

                                            {/* Step Number Badge */}
                                            <div className="absolute -right-4 -top-4 flex size-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-xl shadow-blue-500/30">
                                                {index + 1}
                                            </div>
                                        </div>

                                        <h3 className="mb-3 text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

