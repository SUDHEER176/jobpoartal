import { useState } from 'react'
import { Button } from '../components/ui'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BouncingDots } from '../components/BouncingDots'

export default function PostJob() {
    const { dbUser } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        company: dbUser?.profile?.company || '',
        location: '',
        type: 'Full-time',
        salaryRange: '',
        description: '',
        requirements: ''
    })

    // Basic access check
    if (dbUser?.role !== 'recruiter') {
        return <div className="p-10 text-center">Access Denied. Recruiters only.</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    recruiterId: dbUser.userId,
                    requirements: formData.requirements.split('\n').filter(Boolean)
                })
            })
            const data = await res.json()
            if (data.success) {
                navigate('/dashboard')
            } else {
                alert(data.error)
            }
        } catch (err) {
            alert('Error posting job')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                    Post a <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">New Job</span>
                </h1>
                <p className="text-slate-400 text-xl font-medium">Reach thousands of qualified candidates in seconds.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl shadow-brand-500/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Job Title</label>
                        <input
                            required
                            placeholder="e.g. Senior Product Designer"
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Company</label>
                        <input
                            required
                            placeholder="Your Company Name"
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Location</label>
                        <input
                            required
                            placeholder="e.g. Remote, New York"
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Employment Type</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium appearance-none"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option className="bg-zinc-900 text-white">Full-time</option>
                            <option className="bg-zinc-900 text-white">Part-time</option>
                            <option className="bg-zinc-900 text-white">Contract</option>
                            <option className="bg-zinc-900 text-white">Internship</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Salary Range</label>
                    <input
                        placeholder="e.g. $80k - $120k"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium"
                        value={formData.salaryRange}
                        onChange={e => setFormData({ ...formData, salaryRange: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Description</label>
                    <textarea
                        required
                        rows={5}
                        placeholder="Describe the role, responsibilities, and team..."
                        className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium resize-none"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-black uppercase tracking-wider text-slate-400 ml-1">Requirements (one per line)</label>
                    <textarea
                        rows={4}
                        placeholder="List the key skills and qualifications..."
                        className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all font-medium resize-none"
                        value={formData.requirements}
                        onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                    />
                </div>

                {/* ... (inside PostJob component) */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 rounded-2xl text-xl font-black bg-brand-500 hover:bg-brand-600 text-white shadow-xl shadow-brand-500/20 transition-all active:scale-[0.98]"
                >
                    {loading ? (
                        <BouncingDots className="w-2 h-2" />
                    ) : 'Post Job Opening'}
                </Button>

            </form>
        </div>
    )
}
