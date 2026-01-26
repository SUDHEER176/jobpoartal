import { cn } from "@/lib/utils";
import { Sparkles, ShieldCheck, MessageSquare, Zap } from "lucide-react";

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-blue-500",
    titleClassName = "text-blue-500",
}) {
    return (
        <div
            className={cn(
                "relative flex h-40 w-[24rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-zinc-900/90 backdrop-blur-md px-6 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-zinc-900/50 after:to-transparent after:content-[''] hover:border-blue-500/50 hover:bg-zinc-800 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] [&>*]:flex [&>*]:items-center [&>*]:gap-2 border-white/10 shadow-xl",
                className
            )}
        >
            <div>
                <span className="relative inline-block rounded-full bg-blue-500/20 p-2 ring-1 ring-blue-500/50">
                    {icon}
                </span>
                <p className={cn("text-xl font-bold text-slate-100", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-lg text-slate-300">{description}</p>
            <p className="text-slate-500 font-medium">{date}</p>
        </div>
    );
}

export function Features() {
    const cards = [
        {
            title: "AI Smart Matching",
            description: "Jobs that match your skills perfectly",
            date: "Algorithmic Precision",
            icon: <Zap className="size-5 text-blue-400" />,
            className: "[grid-area:stack] hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-zinc-950/50 grayscale-[30%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0 hover:z-50 shadow-2xl",
        },
        {
            title: "Verified Companies",
            description: "Apply to trusted employers only",
            date: "100% Vetted",
            icon: <ShieldCheck className="size-5 text-emerald-400" />,
            className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-zinc-950/50 grayscale-[30%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0 hover:z-50 shadow-2xl",
        },
        {
            title: "Direct Connection",
            description: "Chat directly with recruiters",
            date: "Real-time Chat",
            icon: <MessageSquare className="size-5 text-pink-400" />,
            className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-8 hover:z-50 shadow-2xl bg-zinc-800 border-white/20",
        },
    ];

    return (
        <section className="flex min-h-[60vh] w-full items-center justify-center py-32 overflow-hidden">
            <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 transform scale-110">
                {cards.map((cardProps, index) => (
                    <DisplayCard key={index} {...cardProps} />
                ))}
            </div>
        </section>
    );
}
