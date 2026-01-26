
import { cn } from "@/lib/utils";

export function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl", stat.colorClassName || "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400")}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                        </div>
                    </div>
                    {stat.trend && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className={cn(
                                "text-xs font-semibold px-2 py-0.5 rounded-full",
                                stat.trend > 0 ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                            )}>
                                {stat.trend > 0 ? '+' : ''}{stat.trend}%
                            </span>
                            <span className="text-xs text-slate-400">vs last month</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
