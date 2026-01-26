
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export function DashboardCard({
    title,
    description,
    icon: Icon,
    children,
    footer,
    className,
    iconClassName = "bg-brand-100 text-brand-600",
    variant = "default"
}) {
    return (
        <div className={cn(
            "relative overflow-hidden group transition-all duration-500 rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/10",
            className
        )}>
            {/* Background Icon Decoration */}
            {Icon && (
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-32 w-32 dark:text-white" />
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full p-8">
                {Icon && (
                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", iconClassName)}>
                        <Icon className="h-6 w-6" />
                    </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                {description && <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">{description}</p>}

                <div className="flex-1">
                    {children}
                </div>

                {footer && (
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
