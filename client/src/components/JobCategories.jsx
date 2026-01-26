import { Code, PenTool, BarChart3, Megaphone, Laptop, Brain, Stethoscope, Building2 } from 'lucide-react';

const categories = [
    { icon: Code, name: "Development", count: "12k+" },
    { icon: PenTool, name: "Design", count: "8k+" },
    { icon: BarChart3, name: "Finance", count: "3k+" },
    { icon: Megaphone, name: "Marketing", count: "5k+" },
    { icon: Laptop, name: "IT Support", count: "4k+" },
    { icon: Brain, name: "AI / ML", count: "2k+" },
    { icon: Stethoscope, name: "Healthcare", count: "9k+" },
    { icon: Building2, name: "Sales", count: "6k+" },
];

export function JobCategories() {
    return (
        <section className="py-24 bg-white dark:bg-black border-y border-slate-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
                        Popular Categories
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Explore thousands of open roles across top industries.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/50 p-6 hover:bg-slate-100 dark:hover:bg-zinc-800/80 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-slate-200 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
                                        <Icon className="size-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-500">{cat.count} jobs</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
