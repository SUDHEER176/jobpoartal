import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button, cn } from '../components/ui'
import { PlusCircle, MapPin, Briefcase, Clock, DollarSign, ArrowLeft, Edit2, Trash2, Users, ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { BouncingDots } from '../components/BouncingDots'

export default function MyJobs() {
    const { user, dbUser, loading: authLoading } = useAuth()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMyJobs = async () => {
        if (!user) return
        setLoading(true)
        try {
            const res = await fetch(`/api/jobs/recruiter/${user.id}`)
            const data = await res.json()
            if (data.success) setJobs(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job listing?')) return
        try {
            const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setJobs(jobs.filter(job => job._id !== id))
            }
        } catch (error) {
            alert('Failed to delete job')
        }
    }

    useEffect(() => {
        fetchMyJobs()
    }, [user])

    if (authLoading || (loading && jobs.length === 0)) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <BouncingDots />
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-brand-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4 transition-all group"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Dashboard
                    </button>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                        My Job <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Listings</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-medium">Manage and track all the positions you've posted.</p>
                </div>
                <Link to="/post-job" className="w-full md:w-auto">
                    <Button size="lg" className="w-full rounded-2xl font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-xl shadow-brand-500/20 px-8 h-14 flex items-center gap-2">
                        <PlusCircle className="h-5 w-5" />
                        Post New Job
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {jobs.length === 0 ? (
                    <div className="py-32 text-center bg-zinc-900/40 backdrop-blur-xl rounded-[3rem] border border-white/5 shadow-2xl">
                        <div className="bg-white/5 h-20 w-20 rounded-3xl border border-white/5 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <Briefcase className="h-8 w-8 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No jobs posted yet</h3>
                        <p className="text-slate-500 mb-10 max-w-md mx-auto">Start by posting your first job opening to find the perfect candidates for your team.</p>
                        <Link to="/post-job">
                            <Button className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-all px-8 h-12 font-bold">Post Your First Job</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-brand-500/20 transition-all group flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                                <div className="flex-1 w-full relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                            <Briefcase className="size-6 text-brand-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-brand-400 transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                                                <Clock className="size-3" />
                                                Posted {new Date(job.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-6">
                                        <div className="flex items-center gap-2 text-slate-400 font-medium bg-white/5 px-4 py-2 rounded-xl text-sm leading-none">
                                            <MapPin className="size-4 text-brand-500" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 font-medium bg-white/5 px-4 py-2 rounded-xl text-sm leading-none">
                                            <DollarSign className="size-4 text-brand-500" />
                                            {job.salaryRange || 'Competitive'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10">
                                    <Link to={`/job-applications/${job._id}`} className="flex-1 sm:flex-none">
                                        <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 text-white font-bold flex items-center justify-center gap-2 px-6">
                                            <Users className="size-4" />
                                            Applicants
                                        </Button>
                                    </Link>
                                    <Button onClick={() => deleteJob(job._id)} variant="ghost" className="h-12 w-12 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-500/10 border border-white/5">
                                        <Trash2 className="size-5" />
                                    </Button>
                                    <Link to={`/jobs/${job._id}`}>
                                        <button className="h-12 w-12 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 flex items-center justify-center text-brand-400 transition-all border border-brand-500/20 group/btn">
                                            <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

