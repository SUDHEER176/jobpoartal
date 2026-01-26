import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import {
    PlusCircle,
    Users,
    FileText,
    TrendingUp,
    Bell,
    ArrowRight,
    Users2,
    Zap,
    Briefcase,
    Search
} from 'lucide-react'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { StatsGrid } from '@/components/dashboard/StatsGrid'

export default function RecruiterDashboard({ dbUser }) {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchJobs = async () => {
        try {
            const res = await fetch(`/api/jobs/recruiter/${dbUser._id}`)
            const data = await res.json()
            if (data.success) setJobs(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [dbUser])

    const totalApplicants = jobs.reduce((acc, job) => acc + (job.applicantsCount || 0), 0)
    const hiredCount = 0 // Would need a separate endpoint for cross-job hire count or calculate from apps

    const stats = [
        { label: "Active Jobs", value: jobs.filter(j => j.status !== 'closed').length.toString(), icon: Briefcase, colorClassName: "bg-blue-500/10 text-blue-400" },
        { label: "Total Applicants", value: totalApplicants.toString(), icon: Users, colorClassName: "bg-indigo-500/10 text-indigo-400" },
        { label: "Interviews", value: "0", icon: Bell, colorClassName: "bg-orange-500/10 text-orange-400" },
        { label: "Hired", value: "0", icon: Zap, colorClassName: "bg-green-500/10 text-green-400" }
    ];

    const topJobs = jobs.slice(0, 3).map(job => ({
        id: job._id,
        title: job.title,
        applicants: job.applicantsCount || 0,
        views: job.views || 0,
        status: job.status || 'Active'
    }));

    const topJobsRows = topJobs.map((job) => (
        <tr key={job.id} className="group/row hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <td className="py-6 px-4">
                <Link to={`/job-applications/${job.id}`}>
                    <p className="font-black text-slate-900 dark:text-white group-hover/row:text-brand-400 transition-colors uppercase tracking-tight">{job.title}</p>
                </Link>
            </td>
            <td className="py-6 text-center">
                <span className="font-bold text-brand-400 bg-brand-500/10 px-4 py-1.5 rounded-xl">{job.applicants}</span>
            </td>
            <td className="py-6 text-center text-slate-400 font-bold tracking-tighter">
                {job.views.toLocaleString()}
            </td>
            <td className="py-6 text-right px-4">
                <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${job.status === 'Active' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-slate-500'
                    }`}>
                    {job.status}
                </span>
            </td>
        </tr>
    ));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                        Recruiter <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Dashboard</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">Manage your listings and discover top talent.</p>
                </div>
                <Link to="/post-job" className="w-full md:w-auto">
                    <Button size="lg" className="w-full h-14 px-8 rounded-2xl font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20 shadow-xl flex items-center justify-center gap-2">
                        <PlusCircle className="h-5 w-5" />
                        Post New Job
                    </Button>
                </Link>
            </div>

            <StatsGrid stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Areas */}
                <div className="lg:col-span-2 space-y-8">
                    <DashboardCard
                        title="Active Job Listings"
                        description="Monitor performance of your current listings."
                        icon={FileText}
                        footer={
                            <Link to="/my-jobs">
                                <Button variant="ghost" className="w-full text-brand-600 hover:text-brand-700 font-semibold group flex items-center justify-center gap-2">
                                    View All Job Listings
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-slate-200 dark:border-white/5">
                                    <tr className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
                                        <th className="pb-6 px-4">Job Title</th>
                                        <th className="pb-6 text-center">Applicants</th>
                                        <th className="pb-6 text-center">Views</th>
                                        <th className="pb-6 text-right px-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                                    {topJobsRows}
                                </tbody>
                            </table>
                        </div>
                    </DashboardCard>
                </div>

                {/* Sidebar Areas */}
                <div className="space-y-8">
                    <DashboardCard
                        title="Talent Search"
                        icon={Search}
                        iconClassName="bg-blue-500/10 text-blue-400"
                    >
                        <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-semibold">Instantly reach out to candidates that match your requirements.</p>
                        <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-black border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center gap-3">
                            <Users2 className="h-5 w-5" />
                            Search Candidates
                        </Button>
                    </DashboardCard>

                    <DashboardCard
                        title="Hiring Pipeline"
                        icon={TrendingUp}
                        iconClassName="bg-blue-500/10 text-blue-400"
                    >
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-black mb-3 lowercase tracking-wide">
                                    <span className="text-slate-400">Interviewing</span>
                                    <span className="text-brand-400">42%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 rounded-full shadow-[0_0_15px_rgba(var(--brand-rgb),0.5)]" style={{ width: '42%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-black mb-3 lowercase tracking-wide">
                                    <span className="text-slate-500 dark:text-slate-400">Sourcing</span>
                                    <span className="text-indigo-600 dark:text-indigo-400">68%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: '68%' }} />
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
}
