import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { Button } from '../components/ui'
import {
    MapPin,
    Briefcase,
    DollarSign,
    Building2,
    Calendar,
    ArrowLeft,
    Check,
    Globe,
    Users,
    Bookmark,
    Share2,
    FileText,
    Upload
} from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { BouncingDots } from '../components/BouncingDots'
import { supabase } from '../lib/supabaseClient'

export default function JobDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, dbUser, refreshUser } = useAuth()

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to={`/auth?mode=login&redirect=/jobs/${id}`} replace />
    }

    // Redirect seekers to onboarding if pending
    if (dbUser?.role === 'seeker' && dbUser?.onboardingStatus === 'pending') {
        return <Navigate to="/onboarding" replace />
    }
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [applying, setApplying] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [resumeRef, setResumeRef] = useState(null)
    const fileInputRef = useRef(null)
    const [hasApplied, setHasApplied] = useState(false)

    useEffect(() => {
        fetch(`/api/jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setJob(data.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    const submitApplication = async (resumeUrl) => {
        setApplying(true)
        try {
            const res = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: id,
                    applicantId: user.id,
                    resumeUrl: resumeUrl
                })
            })
            const data = await res.json()
            if (data.success) {
                setHasApplied(true)
                alert('Application submitted successfully!')
            } else {
                alert(data.error)
            }
        } catch (error) {
            alert('Failed to apply')
        } finally {
            setApplying(false)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file')
            return
        }

        setUploading(true)
        try {
            const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
            const fileName = `${user.id}/${Date.now()}_${cleanFileName}`

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(fileName)

            // Update user profile via API to persist the resume URL
            const res = await fetch('/api/auth/onboarding', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    resume: publicUrl
                })
            })

            if (res.ok) {
                await refreshUser() // Refresh local user state
                // Auto-apply after successful upload
                await submitApplication(publicUrl)
            } else {
                throw new Error('Failed to update profile')
            }
        } catch (error) {
            console.error('Upload Error:', error)
            alert('Failed to upload resume')
        } finally {
            setUploading(false)
        }
    }

    const handleApply = async () => {
        if (!user) return navigate('/auth')
        if (dbUser.role === 'recruiter') return alert('Recruiters cannot apply.')

        // Enforce resume requirement
        if (!dbUser.profile?.resume) {
            alert('Please upload a resume to apply.')
            return
        }

        await submitApplication(dbUser.profile.resume)
    }

    const deleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job listing?')) return
        try {
            const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                navigate('/my-jobs')
            }
        } catch (error) {
            alert('Failed to delete job')
        }
    }

    // ... (inside JobDetails)
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <BouncingDots />
        </div>
    )

    if (!job) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
            <div className="bg-white/5 p-12 rounded-[2.5rem] border border-white/5 text-center shadow-2xl shadow-brand-500/5">
                <h3 className="text-2xl font-black text-white mb-2">Job not found</h3>
                <p className="text-slate-500 mb-8">This position may have been filled or removed.</p>
                <Button onClick={() => navigate('/jobs')} variant="outline" className="rounded-xl border-white/10 text-white hover:bg-white/5">Back to Listings</Button>
            </div>
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
            <button
                onClick={() => navigate('/jobs')}
                className="flex items-center gap-2 text-slate-400 hover:text-brand-400 font-black uppercase tracking-[0.2em] text-[10px] mb-12 transition-all group"
            >
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                Back to Opportunities
            </button>

            {/* Header Card */}
            <div className="bg-zinc-900/40 backdrop-blur-2xl p-10 md:p-14 rounded-[3.5rem] mb-12 border border-white/5 shadow-2xl shadow-brand-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-widest mb-6 shadow-inner">
                            <Building2 className="h-4 w-4" />
                            {job.company}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.1]">{job.title}</h1>

                        <div className="flex flex-wrap gap-x-10 gap-y-4 text-slate-400 font-bold tracking-tight">
                            <span className="flex items-center gap-3"><MapPin className="h-6 w-6 text-brand-400" /> {job.location}</span>
                            <span className="flex items-center gap-3"><Briefcase className="h-6 w-6 text-brand-400" /> {job.type}</span>
                            {job.salaryRange && <span className="flex items-center gap-3"><DollarSign className="h-6 w-6 text-brand-400" /> {job.salaryRange}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[280px]">
                        {/* Recruiter Controls */}
                        {dbUser?.role === 'recruiter' && dbUser._id === job.recruiterId ? (
                            <div className="flex flex-col gap-4">
                                <Link to={`/job-applications/${job._id}`} className="w-full">
                                    <Button size="lg" className="w-full h-16 rounded-2xl text-lg font-black bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/20 text-white flex items-center justify-center gap-3">
                                        <Users className="h-6 w-6" />
                                        View Applicants
                                    </Button>
                                </Link>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 hover:bg-white/5 text-white flex items-center justify-center gap-2">
                                        <Edit2 className="h-5 w-5" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" onClick={() => deleteJob(job._id)} className="flex-1 h-14 rounded-2xl border-white/10 hover:bg-red-500/10 hover:text-red-500 text-white flex items-center justify-center gap-2">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            /* Seeker Apply Flow */
                            !hasApplied ? (
                                <>
                                    {dbUser?.profile?.resume ? (
                                        <>
                                            <Button size="lg" onClick={handleApply} disabled={applying} className="w-full h-16 rounded-2xl text-lg font-black bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/20 text-white">
                                                {applying ? (
                                                    <BouncingDots className="w-2 h-2" />
                                                ) : 'Submit Application'}
                                            </Button>
                                            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                                                <FileText className="size-3 text-brand-400" />
                                                <span className="truncate max-w-[150px]">
                                                    {dbUser.profile.resume.split('/').pop().split('_').pop()}
                                                </span>
                                                <a href={dbUser.profile.resume} target="_blank" rel="noreferrer" className="text-brand-400 hover:underline ml-1">
                                                    (View)
                                                </a>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept=".pdf"
                                                onChange={handleFileUpload}
                                            />
                                            <Button
                                                size="lg"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={uploading}
                                                className="w-full h-16 rounded-2xl text-lg font-black bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                                            >
                                                {uploading ? (
                                                    <BouncingDots className="w-2 h-2" />
                                                ) : (
                                                    <>
                                                        <Upload className="mr-2 h-5 w-5" /> Upload Resume to Apply
                                                    </>
                                                )}
                                            </Button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Button size="lg" disabled className="w-full h-16 rounded-2xl text-lg font-black bg-green-500/10 text-green-400 border border-green-500/20">
                                    <Check className="h-6 w-6 mr-3" /> Application Sent
                                </Button>
                            )
                        )}

                        {dbUser?.role !== 'recruiter' && (
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 hover:bg-white/5 text-white"><Bookmark className="h-5 w-5" /></Button>
                                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 hover:bg-white/5 text-white"><Share2 className="h-5 w-5" /></Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <span className="flex items-center gap-3"><Calendar className="h-4 w-4 text-brand-400/50" /> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    <span className="size-1 rounded-full bg-white/10"></span>
                    <span className="flex items-center gap-3"><Briefcase className="h-4 w-4 text-brand-400/50" /> 24 Applicants</span>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="bg-zinc-900/40 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl shadow-brand-500/5">
                        <h3 className="text-2xl font-black mb-8 text-white tracking-tight">About the Role</h3>
                        <div className="text-slate-400 leading-[1.8] whitespace-pre-wrap font-medium text-lg tracking-tight">
                            {job.description}
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl shadow-brand-500/5">
                        <h3 className="text-2xl font-black mb-8 text-white tracking-tight">Requirements</h3>
                        <ul className="grid grid-cols-1 gap-5">
                            {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-6 text-slate-400 group/item">
                                    <div className="mt-2.5 h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(var(--brand-rgb),0.5)] group-hover/item:scale-150 transition-transform flex-shrink-0"></div>
                                    <span className="leading-relaxed font-semibold text-lg tracking-tight">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-zinc-900/40 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-all duration-1000"></div>
                        <div className="relative z-10 text-center">
                            <div className="size-24 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-[2rem] flex items-center justify-center p-5 mx-auto mb-8 shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                {job.logo && job.logo !== "" && !logoError ? (
                                    <img
                                        src={job.logo}
                                        alt={job.company}
                                        className="w-full h-full object-contain"
                                        onError={() => setLogoError(true)}
                                    />
                                ) : (
                                    <span className="text-4xl font-black text-brand-400">{job.company?.[0] || '?'}</span>
                                )}
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">About {job.company}</h3>
                            <p className="text-slate-400 text-sm mb-10 leading-relaxed font-semibold">
                                We are a forward-thinking company dedicated to innovation and growth. Join us to build the future of technology and design.
                            </p>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px]">Company Profile</Button>
                        </div>
                    </div>

                    <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <h4 className="text-xl font-black text-white mb-4 relative z-10">Premium Match</h4>
                        <p className="text-slate-300 text-sm mb-8 leading-relaxed font-medium relative z-10">You're a top 10% match for this role based on your profile.</p>
                        <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black rounded-2xl h-14 relative z-10 shadow-lg shadow-brand-500/20">Boost Application</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
