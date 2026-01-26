import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BouncingDots } from '../components/BouncingDots'
import { Briefcase, Building2, MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

export default function MyApplications() {
    const { user } = useAuth()
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) fetchApplications()
    }, [user])

    const fetchApplications = async () => {
        try {
            const res = await fetch(`/api/applications/user/${user.id}`)
            const data = await res.json()
            if (data.success) setApplications(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <div className="min-h-[80vh] flex items-center justify-center bg-black">
            <BouncingDots />
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                    My <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Applications</span>
                </h1>
                <p className="text-slate-400 text-xl font-medium tracking-tight">Track the status of your sent job applications and potential interviews.</p>
            </div>

            <div className="grid gap-6">
                {applications.length === 0 ? (
                    <div className="py-24 text-center bg-zinc-900/40 backdrop-blur-xl rounded-[3rem] border border-white/5 shadow-2xl">
                        <div className="size-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                            <Briefcase className="size-10 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">No Applications Found</h3>
                        <p className="text-slate-400 font-medium mb-8">You haven't applied to any roles yet. Start your journey today!</p>
                        <Link to="/jobs">
                            <Button className="h-12 px-8 rounded-xl bg-brand-500 font-bold hover:bg-brand-600">Browse Open Roles</Button>
                        </Link>
                    </div>
                ) : (
                    applications.map(app => (
                        <div key={app._id} className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-brand-500/20 transition-all group flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                            <div className="flex-1 w-full relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-500/30 transition-colors">
                                        <Building2 className="size-6 text-brand-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-brand-400 transition-colors">
                                            {app.jobId?.title || 'Unknown Title'}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500 font-bold uppercase tracking-widest">
                                            <span>{app.jobId?.company || 'Unknown Company'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6 mt-6">
                                    <div className="flex items-center gap-2 text-slate-400 font-medium bg-white/5 px-4 py-2 rounded-xl">
                                        <MapPin className="size-4 text-brand-500" />
                                        {app.jobId?.location || 'Remote'}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 font-medium bg-white/5 px-4 py-2 rounded-xl">
                                        <Calendar className="size-4 text-brand-500" />
                                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto relative z-10 justify-between md:justify-end">
                                <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-inner
                                    ${app.status === 'hired' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                        app.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                            app.status === 'interview' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                    {app.status}
                                </div>

                                <Link to={`/jobs/${app.jobId?._id}`}>
                                    <button className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all border border-white/10 group/btn">
                                        <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

