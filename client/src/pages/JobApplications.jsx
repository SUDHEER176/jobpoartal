import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui'
import { User, Briefcase, FileText, ChevronDown } from 'lucide-react'
import { BouncingDots } from '../components/BouncingDots'

export default function JobApplications() {
    const { jobId } = useParams()
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchApplications()
    }, [jobId])

    const fetchApplications = async () => {
        try {
            const res = await fetch(`/api/applications/job/${jobId}`)
            const data = await res.json()
            if (data.success) setApplications(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (appId, newStatus) => {
        try {
            const res = await fetch(`/api/applications/${appId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            const data = await res.json()
            if (data.success) {
                setApplications(apps => apps.map(app =>
                    app._id === appId ? { ...app, status: newStatus } : app
                ))
            }
        } catch (error) {
            alert('Failed to update status')
        }
    }

    // ... (inside JobApplications component)
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <BouncingDots />
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                    Management <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Hub</span>
                </h1>
                <p className="text-slate-400 text-xl font-medium tracking-tight">Review and manage candidate applications for this position.</p>
            </div>

            <div className="grid gap-6">
                {applications.length === 0 ? (
                    <div className="py-24 text-center bg-zinc-900/40 backdrop-blur-xl rounded-[3rem] border border-white/5 shadow-2xl">
                        <div className="size-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                            <Briefcase className="size-10 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">No Applications Yet</h3>
                        <p className="text-slate-500 font-medium">Sit tight! Qualified candidates will appear here soon.</p>
                    </div>
                ) : applications.map(app => (
                    <div key={app._id} className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-brand-500/20 transition-all group flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                            <User className="size-24 text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="size-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center text-xl font-black text-brand-400">
                                    {app.applicantId.substring(0, 1).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-black text-xl text-white tracking-tight">Applicant #{app.applicantId.slice(-4)}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Applied {new Date(app.appliedAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-black uppercase tracking-widest mt-4 transition-colors">
                                <FileText className="size-4" />
                                View Resume
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
                            <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-inner
                        ${app.status === 'hired' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                    app.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                {app.status}
                            </div>
                            <div className="relative w-full sm:w-48">
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-brand-500/50 appearance-none transition-all cursor-pointer"
                                    value={app.status}
                                    onChange={(e) => updateStatus(app._id, e.target.value)}
                                >
                                    <option value="applied" className="bg-zinc-900">Applied</option>
                                    <option value="reviewed" className="bg-zinc-900">Reviewed</option>
                                    <option value="interview" className="bg-zinc-900">Interview</option>
                                    <option value="hired" className="bg-zinc-900">Hired</option>
                                    <option value="rejected" className="bg-zinc-900">Rejected</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
