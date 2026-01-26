import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import {
    Search,
    FileText,
    Bell,
    TrendingUp,
    Briefcase,
    CheckCircle2,
    ArrowRight,
    UserPlus,
    Send,
    Eye,
    Star,
    MapPin,
    Clock,
    Bookmark
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function SeekerLanding() {
    return (
        <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Gradient Orbs */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
                            <Briefcase className="h-4 w-4" />
                            For Job Seekers
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                            Find Your Dream Job,
                            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"> Faster</span>
                        </h1>

                        <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Discover thousands of opportunities from top companies. Apply with one click and track your applications.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/jobs">
                                <Button size="lg" className="h-14 px-8 rounded-2xl font-bold bg-white text-blue-900 hover:bg-white/90 shadow-2xl shadow-blue-500/30 flex items-center gap-2">
                                    <Search className="h-5 w-5" />
                                    Browse Jobs
                                </Button>
                            </Link>
                            <Link to="/auth?mode=signup&role=seeker">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-bold border-white/30 text-white hover:bg-white/10 flex items-center gap-2">
                                    Sign Up Free
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right - Job Cards Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Card Stack */}
                            <div className="space-y-4">
                                {[
                                    { title: 'Senior Frontend Developer', company: 'Google', location: 'Mountain View, CA', salary: '$150K - $200K', type: 'Full-time' },
                                    { title: 'Product Designer', company: 'Meta', location: 'Remote', salary: '$120K - $160K', type: 'Full-time' },
                                    { title: 'Data Scientist', company: 'Netflix', location: 'Los Angeles, CA', salary: '$140K - $180K', type: 'Full-time' },
                                ].map((job, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 hover:bg-white/15 transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">{job.title}</h3>
                                                <p className="text-white/60 font-medium">{job.company}</p>
                                            </div>
                                            <Bookmark className="h-5 w-5 text-white/40 hover:text-white cursor-pointer" />
                                        </div>
                                        <div className="flex flex-wrap gap-3 text-sm">
                                            <span className="flex items-center gap-1 text-white/60">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1 text-green-400 font-semibold">
                                                {job.salary}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                                                {job.type}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-bold">25,000+</p>
                                        <p className="text-slate-500 text-sm">Active Jobs</p>
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
                            Everything You Need to <span className="text-blue-600">Get Hired</span>
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Powerful tools designed to accelerate your job search
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Search, title: 'Smart Job Search', desc: 'Find jobs with advanced filters and AI matching', color: 'blue' },
                            { icon: Send, title: 'One-Click Apply', desc: 'Apply to multiple jobs instantly', color: 'cyan' },
                            { icon: Bell, title: 'Job Alerts', desc: 'Get notified when new jobs match your profile', color: 'indigo' },
                            { icon: Eye, title: 'Application Tracking', desc: 'Monitor your application status in real-time', color: 'purple' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
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
                            Land your dream job in 4 simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '01', icon: UserPlus, title: 'Create Profile', desc: 'Build your professional profile' },
                            { step: '02', icon: Search, title: 'Search Jobs', desc: 'Browse thousands of opportunities' },
                            { step: '03', icon: Send, title: 'Apply Easily', desc: 'One-click applications' },
                            { step: '04', icon: CheckCircle2, title: 'Get Hired', desc: 'Land your dream job' },
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
                                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-transparent dark:from-blue-600" />
                                )}
                                <div className="relative z-10">
                                    <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6">
                                        <item.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 mb-2 block">{item.step}</span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Categories */}
            <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Popular Job Categories
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Explore opportunities across industries
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '💻', title: 'Technology', count: '8,500+ jobs' },
                            { icon: '📊', title: 'Finance', count: '4,200+ jobs' },
                            { icon: '🎨', title: 'Design', count: '3,100+ jobs' },
                            { icon: '📈', title: 'Marketing', count: '5,800+ jobs' },
                            { icon: '⚕️', title: 'Healthcare', count: '6,300+ jobs' },
                            { icon: '🏗️', title: 'Engineering', count: '4,900+ jobs' },
                            { icon: '📚', title: 'Education', count: '2,700+ jobs' },
                            { icon: '🛒', title: 'Sales', count: '7,100+ jobs' },
                        ].map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{cat.icon}</span>
                                    <div>
                                        <h3 className="text-white font-bold group-hover:text-cyan-300 transition-colors">{cat.title}</h3>
                                        <p className="text-white/60 text-sm">{cat.count}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Credibility */}
            <section className="py-24 bg-slate-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
                            TRUSTED BY 500,000+ JOB SEEKERS
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
                                "I found my dream job within 2 weeks of signing up. The platform made it so easy to apply and track my applications. Highly recommended!"
                            </blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                                    A
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-slate-900 dark:text-white">Alex Rodriguez</p>
                                    <p className="text-slate-500 dark:text-slate-400">Software Engineer at Google</p>
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
                        Start Your Journey <span className="text-blue-600">Today</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
                        Join thousands of professionals who found their dream jobs on our platform
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/auth?mode=signup&role=seeker">
                            <Button size="lg" className="h-16 px-10 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-2xl shadow-blue-500/30">
                                Create Free Account
                            </Button>
                        </Link>
                        <Link to="/jobs">
                            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl font-bold text-lg border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10">
                                Browse Jobs First
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-6 text-slate-500 dark:text-slate-400">
                        Already have an account? <Link to="/auth?mode=login" className="text-blue-600 font-semibold hover:underline">Login</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}
