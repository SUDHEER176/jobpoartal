import { cn } from "@/lib/utils";
import {
    Users,
    Search,
    BarChart3,
    Briefcase,
    CheckCircle2,
    Zap,
    Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className={cn(
            "group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/50 p-8 hover:bg-slate-100 dark:hover:bg-zinc-900/80 transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10",
            className
        )}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 p-3 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                <Icon className="size-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors uppercase tracking-tight">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

export function RecruiterFeatures() {
    return (
        <section className="py-24 px-4 bg-white dark:bg-black relative transition-colors duration-300 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6 border border-purple-500/20"
                    >
                        <Sparkles className="size-4" />
                        <span>Employer Solutions</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
                    >
                        Hire the Right Talent, <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Faster</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium"
                    >
                        Leverage our powerful recruitment platform to streamline your hiring pipeline and build your dream team.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Briefcase}
                        title="Post Jobs Easily"
                        description="Create and publish job listings in minutes with our intuitive interface. Reach thousands of qualified candidates effortlessly."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Users}
                        title="Manage Applicants"
                        description="Track applications through every stage of the hiring process. Sort, filter, and shortlist candidates with ease."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Search}
                        title="Smart Candidate Search"
                        description="Use advanced filters and AI-powered sorting to find the perfect match for your requirements."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="Hiring Insights"
                        description="Monitor your job performance and application trends with real-time analytics and reporting."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Status Updates"
                        description="Keep candidates informed with instant status changes—Pending, Shortlisted, Interviewed, or Hired."
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={CheckCircle2}
                        title="Vetted Talent"
                        description="Access a community of verified professionals across technology, design, and management."
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
}
