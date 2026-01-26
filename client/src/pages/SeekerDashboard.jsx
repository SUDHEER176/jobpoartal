import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import {
    Search,
    CheckCircle,
    TrendingUp,
    Clock,
    Bookmark,
    User,
    ArrowRight,
    MapPin,
    Building2,
    Briefcase,
    Zap
} from 'lucide-react'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { socket } from '@/lib/socket'

export default function SeekerDashboard({ dbUser }) {
    const [applications, setApplications] = useState([])
    const [loadingApps, setLoadingApps] = useState(true)
    const [liveJobs, setLiveJobs] = useState([]);

    const fetchApplications = async () => {
        try {
            const res = await fetch(`/api/applications/user/${dbUser._id}`)
            const data = await res.json()
            if (data.success) setApplications(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingApps(false)
        }
    }

    useEffect(() => {
        fetchApplications()

        socket.connect();
        socket.on('newJob', (job) => {
            setLiveJobs(prev => [job, ...prev].slice(0, 5));
        });

        return () => {
            socket.off('newJob');
            socket.disconnect();
        };
    }, []);

    const stats = [
        { label: "Applied Jobs", value: applications.length.toString(), icon: Briefcase, colorClassName: "bg-blue-500/10 text-blue-400" },
        { label: "Interviews", value: applications.filter(a => a.status === 'interview').length.toString(), icon: Clock, colorClassName: "bg-purple-500/10 text-purple-400" },
        { label: "Hired", value: applications.filter(a => a.status === 'hired').length.toString(), icon: CheckCircle, colorClassName: "bg-green-500/10 text-green-400" },
        { label: "Saved Jobs", value: "0", icon: Bookmark, colorClassName: "bg-yellow-500/10 text-yellow-400" }
    ];

    const recentApplications = applications.slice(0, 3).map(app => ({
        id: app._id,
        title: app.jobId?.title || 'Unknown Role',
        company: app.jobId?.company || 'Unknown Company',
        location: app.jobId?.location || 'Remote',
        status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
        date: new Date(app.appliedAt).toLocaleDateString()
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                    Seeker <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Dashboard</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">Track your career progress and find new opportunities.</p>
            </div>

            <StatsGrid stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Areas */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Live Jobs Feed */}
                    {liveJobs.length > 0 && (
                        <DashboardCard
                            title="Live Openings"
                            description="Real-time job postings just for you."
                            icon={Zap}
                            iconClassName="bg-yellow-500/20 text-yellow-400"
                            className="border-yellow-500/20 shadow-xl shadow-yellow-500/5 animate-pulse-slow"
                        >
                            <div className="space-y-4">
                                {liveJobs.map((job, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-6 rounded-[1.5rem] bg-brand-500/5 border border-brand-500/10 hover:bg-brand-500/10 transition-all group/item">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                                                <Zap className="size-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{job.title}</h4>
                                                <p className="text-slate-500 dark:text-slate-400 font-medium">{job.company} • {job.location}</p>
                                            </div>
                                        </div>
                                        <Link to={`/jobs/${job._id || idx}`}>
                                            <Button size="sm" className="rounded-xl font-bold bg-brand-500 hover:bg-brand-600 text-white">View Now</Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>
                    )}

                    {/* Recent Applications */}
                    <DashboardCard
                        title="Recent Applications"
                        description="Keep track of your latest job applications."
                        icon={Briefcase}
                        footer={
                            <Link to="/my-applications">
                                <Button variant="ghost" className="w-full text-brand-600 hover:text-brand-700 font-semibold group flex items-center justify-center gap-2">
                                    View All Applications
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        }
                    >
                        <div className="space-y-4">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="flex items-center justify-between p-6 rounded-[1.5rem] bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-zinc-900/80 hover:border-brand-500/20 transition-all group/item">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover/item:text-brand-400 transition-colors">{app.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
                                            <span className="flex items-center gap-2 font-semibold">
                                                <Building2 className="size-4" />
                                                {app.company}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <MapPin className="size-4" />
                                                {app.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${app.status === 'In Review' ? 'bg-blue-500/10 text-blue-400' :
                                            app.status === 'Interviewed' ? 'bg-blue-500/20 text-blue-500' :
                                                'bg-red-500/10 text-red-500'
                                            }`}>
                                            {app.status}
                                        </span>
                                        <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-tighter">{app.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* Sidebar Areas */}
                <div className="space-y-8">
                    <DashboardCard
                        title="Quick Actions"
                        icon={TrendingUp}
                        iconClassName="bg-orange-500/10 text-orange-400"
                    >
                        <div className="grid gap-4">
                            <Link to="/jobs">
                                <Button className="w-full h-14 rounded-2xl text-lg font-black shadow-brand-500/20 shadow-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center gap-3">
                                    <Search className="h-5 w-5" />
                                    Explore Jobs
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-900 dark:text-white flex items-center justify-center gap-3">
                                <User className="h-5 w-5" />
                                Update Profile
                            </Button>
                        </div>
                    </DashboardCard>

                    <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-xl text-slate-900 dark:text-white shadow-2xl overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 h-40 w-40 bg-brand-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
                        <h3 className="text-2xl font-bold mb-3 relative z-10">Premium Plan</h3>
                        <p className="text-slate-400 mb-6 leading-relaxed relative z-10 font-medium tracking-tight">Get 3x more visibility with our professional plan.</p>
                        <Button className="w-full bg-brand-500 text-white hover:bg-brand-600 font-extrabold rounded-2xl h-12 relative z-10">
                            Upgrade Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
