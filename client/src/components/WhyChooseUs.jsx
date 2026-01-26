import { cn } from "@/lib/utils";
import {
    Globe,
    Zap,
    ShieldCheck,
    TrendingUp,
    Users,
    Award,
    Sparkles
} from "lucide-react";
import { motion } from "motion/react";

const FeatureCard = ({ icon: Icon, title, description, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className={cn(
            "group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/50 p-8 hover:bg-slate-100 dark:hover:bg-zinc-900/80 transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 text-left",
            className
        )}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
            <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <Icon className="size-6" />
            </div>
            <h3 className="mb-3 text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors uppercase tracking-tight">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors leading-relaxed font-medium">{description}</p>
        </div>
    </motion.div>
);

export function WhyChooseUs() {
    return (
        <section className="py-24 px-4 bg-white dark:bg-black relative transition-colors duration-300 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20"
                    >
                        <Sparkles className="size-4" />
                        <span>World-Class Features</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
                    >
                        Why Top Talent <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Chooses Us</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium"
                    >
                        We provide the holistic ecosystem you need to build a thriving career.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Globe}
                        title="Global Opportunities"
                        description="Access pre-vetted companies worldwide. Remote in Bali or relocation to Berlin—we connect you across 50+ countries."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="AI Smart Matching"
                        description="Our proprietary algorithms find roles that perfectly align with your unique skills and career goals."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={ShieldCheck}
                        title="100% Verified"
                        description="Every company is manually vetted. Say goodbye to ghost jobs and scam listings forever."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        title="Salary Insights"
                        description="Real-time market data to help you negotiate the compensation you deserve based on your role."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Users}
                        title="Direct Connection"
                        description="Skip the ATS black hole. Chat directly with hiring managers and team leads about current openings."
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={Award}
                        title="Career Growth"
                        description="Access exclusive workshops and certification paths to stay ahead of the curve in your industry."
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
}
