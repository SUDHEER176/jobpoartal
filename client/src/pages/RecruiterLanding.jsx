import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import {
    Briefcase,
    FileText,
    Search,
    BarChart3,
    Users,
    CheckCircle2,
    ArrowRight,
    UserPlus,
    ClipboardList,
    Download,
    TrendingUp,
    Building2,
    Star
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function RecruiterLanding() {
    return (
        <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Gradient Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
                            <Building2 className="h-4 w-4" />
                            For Recruiters & Companies
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                            Hire the Right Talent,
                            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Faster</span>
                        </h1>

                        <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Post jobs, manage applicants, and build your team from one powerful platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/auth?mode=signup&role=recruiter">
                                <Button size="lg" className="h-14 px-8 rounded-2xl font-bold bg-white text-purple-900 hover:bg-white/90 shadow-2xl shadow-purple-500/30 flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Post a Job
                                </Button>
                            </Link>
                            <Link to="/auth?mode=signup&role=recruiter">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-bold border-white/30 text-white hover:bg-white/10 flex items-center gap-2">
                                    Sign Up Free
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right - Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Dashboard Card */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-3 w-3 rounded-full bg-red-400" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                    <div className="h-3 w-3 rounded-full bg-green-400" />
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                                        <p className="text-3xl font-black text-white">24</p>
                                        <p className="text-white/60 text-sm font-medium">Active Jobs</p>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                                        <p className="text-3xl font-black text-white">156</p>
                                        <p className="text-white/60 text-sm font-medium">Applicants</p>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                                        <p className="text-3xl font-black text-white">12</p>
                                        <p className="text-white/60 text-sm font-medium">Hired</p>
                                    </div>
                                </div>

                                {/* Candidate Cards */}
                                <div className="space-y-3">
                                    {['John Smith', 'Sarah Johnson', 'Mike Chen'].map((name, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-3">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                                {name[0]}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white font-semibold text-sm">{name}</p>
                                                <p className="text-white/50 text-xs">Senior Developer</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${i === 0 ? 'bg-green-500/20 text-green-400' :
                                                    i === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                {i === 0 ? 'Shortlisted' : i === 1 ? 'Interview' : 'New'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Analytics Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-bold">+45%</p>
                                        <p className="text-slate-500 text-sm">Hire Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section className="py-24 bg-slate-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            Everything You Need to <span className="text-purple-600">Hire</span>
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Powerful tools designed to streamline your recruitment process
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Briefcase, title: 'Post Jobs Easily', desc: 'Create and publish job listings in minutes', color: 'purple' },
                            { icon: FileText, title: 'Manage Applicants', desc: 'View, shortlist, and track candidates', color: 'blue' },
                            { icon: Search, title: 'Smart Candidate Search', desc: 'Find talent with filters and search tools', color: 'indigo' },
                            { icon: BarChart3, title: 'Hiring Insights', desc: 'See application stats and job performance', color: 'pink' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
                            >
                                <div className={`h-14 w-14 rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`h-7 w-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Start hiring in 4 simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '01', icon: UserPlus, title: 'Create Account', desc: 'Sign up as a recruiter in minutes' },
                            { step: '02', icon: Briefcase, title: 'Post Your Job', desc: 'Create detailed job listings' },
                            { step: '03', icon: ClipboardList, title: 'Receive Applications', desc: 'Get qualified candidates' },
                            { step: '04', icon: CheckCircle2, title: 'Hire the Best', desc: 'Select and hire top talent' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative text-center"
                            >
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-300 to-transparent dark:from-purple-600" />
                                )}
                                <div className="relative z-10">
                                    <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/20 mb-6">
                                        <item.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <span className="text-sm font-black text-purple-600 dark:text-purple-400 mb-2 block">{item.step}</span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recruiter Tools Highlight */}
            <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Powerful Recruiter Tools
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Everything you need to manage your hiring pipeline
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: ClipboardList, title: 'Job Posting Dashboard', desc: 'Manage all your job listings in one place' },
                            { icon: Users, title: 'Applicant Tracking', desc: 'Track candidates through your pipeline' },
                            { icon: CheckCircle2, title: 'Status Updates', desc: 'Pending, Shortlisted, Rejected, Hired' },
                            { icon: Download, title: 'Resume Downloads', desc: 'View and download candidate resumes' },
                        ].map((tool, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                                    <tool.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                                <p className="text-white/60 text-sm">{tool.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Credibility */}
            <section className="py-24 bg-slate-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">
                            TRUSTED BY 1,000+ COMPANIES
                        </p>

                        {/* Company Logos */}
                        <div className="flex flex-wrap justify-center gap-8 mb-16 opacity-50 dark:opacity-30">
                            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company, i) => (
                                <div key={i} className="text-2xl font-black text-slate-400 dark:text-slate-600">
                                    {company}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl text-center">
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                                "This platform transformed our hiring process. We reduced our time-to-hire by 60% and found amazing talent we wouldn't have discovered otherwise."
                            </blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                    S
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-900 dark:text-white">Sarah Mitchell</p>
                                    <p className="text-slate-500 dark:text-slate-400">HR Director, TechCorp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Start Hiring <span className="text-purple-600">Today</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                        Join thousands of companies finding top talent on our platform
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/auth?mode=signup&role=recruiter">
                            <Button size="lg" className="h-16 px-10 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-2xl shadow-purple-500/30">
                                Create Recruiter Account
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-6 text-slate-500 dark:text-slate-400">
                        Already have an account? <Link to="/auth?mode=login" className="text-purple-600 font-semibold hover:underline">Login</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}
