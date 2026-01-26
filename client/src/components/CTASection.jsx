import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
    const { user } = useAuth();
    return (
        <section className="py-24 px-4 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-xl p-12 md:p-24 text-center shadow-xl shadow-blue-500/5">

                    {/* Decorative Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 mb-8">
                            <Sparkles className="size-4" />
                            <span>Start your journey today</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Start your future career today.</span>
                        </h2>

                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                            Join thousands of professionals who have already found their dream jobs.
                            Create your profile in minutes and let opportunities come to you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to={user ? "/dashboard" : "/auth?mode=signup"} className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 rounded-full transition-all hover:scale-105">
                                    {user ? "Go to Dashboard" : "Get Started Now"}
                                    <ArrowRight className="ml-2 size-5" />
                                </Button>
                            </Link>
                            <Link to="/jobs" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-full backdrop-blur-sm transition-all hover:scale-105">
                                    Browse Jobs
                                </Button>
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-slate-500 font-medium">
                            No credit card required. Free for job seekers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
