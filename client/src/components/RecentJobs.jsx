import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Briefcase, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'

// Sample Data with Logos
const SAMPLE_JOBS = [
    {
        id: 1,
        title: "Senior Product Designer",
        company: "Google",
        type: "Full time",
        salary: "$120k-$180k",
        location: "Mountain View, CA",
        postedAt: "10 min ago",
        category: "Design",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    },
    {
        id: 2,
        title: "Software Engineer, Frontend",
        company: "Meta",
        type: "Full time",
        salary: "$130k-$190k",
        location: "Menlo Park, CA",
        postedAt: "15 min ago",
        category: "Engineering",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Meta_Platforms_Inc._logo.svg",
    },
    {
        id: 3,
        title: "AWS Cloud Architect",
        company: "Amazon",
        type: "Contract",
        salary: "$140k-$200k",
        location: "Seattle, WA",
        postedAt: "30 min ago",
        category: "Cloud",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
    },
    {
        id: 4,
        title: "iOS Developer",
        company: "Apple",
        type: "Full time",
        salary: "$110k-$160k",
        location: "Cupertino, CA",
        postedAt: "1 hour ago",
        category: "Mobile",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
        id: 5,
        title: "Senior Data Scientist",
        company: "Netflix",
        type: "Full time",
        salary: "$180k-$250k",
        location: "Los Gatos, CA",
        postedAt: "2 hours ago",
        category: "Data",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
    },
]

export function RecentJobs() {
    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background Gradient Blend */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                        Recent Jobs <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Available</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                        Explore the latest career opportunities from top-tier companies worldwide.
                    </p>
                </div>

                <Link to="/jobs" className="text-base font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
                    View all <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>

            {/* Jobs Cards Container */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4 relative z-10">
                {SAMPLE_JOBS.map((job) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{
                            y: -4,
                            scale: 1.005,
                            transition: { duration: 0.2 }
                        }}
                        className="group relative bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-xl p-5 md:p-6 hover:border-blue-500/50 hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)] transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row gap-6 md:items-center">

                            {/* Logo */}
                            <div className="shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 dark:border-white/10 p-2 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={job.logo}
                                        alt={`${job.company} logo`}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://ui-avatars.com/api/?background=random&color=fff&name=" + job.company.charAt(0);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors truncate">
                                        {job.title}
                                    </h3>
                                    <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold whitespace-nowrap border border-blue-500/20">
                                        {job.postedAt}
                                    </span>
                                </div>

                                <p className="text-slate-500 dark:text-slate-400 font-medium mb-5 truncate flex items-center gap-2">
                                    {job.company}
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span className="text-slate-400 text-sm font-normal">top rated</span>
                                </p>

                                {/* Meta Tags - Styled as Pills */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors">
                                        <Briefcase className="w-4 h-4 text-blue-500" />
                                        {job.category}
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        {job.type}
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors">
                                        <DollarSign className="w-4 h-4 text-blue-500" />
                                        {job.salary}
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        {job.location}
                                    </div>
                                </div>
                            </div>

                            {/* Actions (Mobile: Stacked, Desktop: Right Aligned) */}
                            <div className="flex items-center gap-4 mt-4 md:mt-0 border-t md:border-t-0 border-slate-200 dark:border-white/5 pt-4 md:pt-0 pl-0 md:pl-4">
                                <span className="md:hidden px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20">
                                    {job.postedAt}
                                </span>

                                <div className="ml-auto flex items-center gap-3">
                                    <button className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-all">
                                        <Bookmark className="w-5 h-5" />
                                    </button>
                                    <Link to={`/jobs/${job.id}`}>
                                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                                            Apply Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
