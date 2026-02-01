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
    Upload,
    Clock,
    GraduationCap,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Trash2,
    Edit2
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
    // if (!user) {
    //    return <Navigate to={`/auth?mode=login&redirect=/jobs/${id}`} replace />
    // }

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
    const [logoError, setLogoError] = useState(false)

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
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Details</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link> /
                        <Link to="/jobs" className="hover:text-brand-500 transition-colors">Find Job</Link> /
                        <span className="text-slate-900 dark:text-white font-medium">Job Details</span>
                    </div>
                </div>

                {/* Header Banner */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 mb-8 shadow-sm border border-slate-100 dark:border-white/10 relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between relative z-10">
                        <div className="flex gap-6 items-start">
                            {/* Logo */}
                            <div className="size-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center p-2 border border-slate-100 dark:border-white/10 shadow-sm flex-shrink-0">
                                {job.logo ? (
                                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded-full" />
                                ) : (
                                    <Building2 className="w-8 h-8 text-brand-500" />
                                )}
                            </div>

                            {/* Title & Info */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{job.title}</h2>
                                    <span className="bg-red-50 dark:bg-red-500/10 text-red-500 text-xs px-3 py-1 rounded-full font-medium">Featured</span>
                                    <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-500 text-xs px-3 py-1 rounded-full font-medium">{job.type}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    <span className="flex items-center gap-2 hover:text-brand-500 transition-colors cursor-pointer">
                                        <Globe className="w-4 h-4" /> {job.company}
                                    </span>
                                    <span className="flex items-center gap-2 hover:text-brand-500 transition-colors cursor-pointer">
                                        <Phone className="w-4 h-4" /> Contact
                                    </span>
                                    <span className="flex items-center gap-2 hover:text-brand-500 transition-colors cursor-pointer">
                                        <Mail className="w-4 h-4" /> Email
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
                            <div className="flex gap-3 w-full lg:w-auto">
                                <Button variant="outline" className="h-12 w-12 rounded-xl border-slate-200 dark:border-white/10 hover:border-brand-500 hover:text-brand-500 dark:text-white p-0 flex items-center justify-center">
                                    <Bookmark className="w-5 h-5" />
                                </Button>

                                {dbUser?.role === 'recruiter' && dbUser._id === job.recruiterId ? (
                                    <div className="flex gap-2">
                                        <Link to={`/job-applications/${job._id}`}>
                                            <Button className="h-12 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold">
                                                View Applicants
                                            </Button>
                                        </Link>
                                        <Button variant="outline" onClick={() => deleteJob(job._id)} className="h-12 w-12 p-0 rounded-xl border-red-200 text-red-500 hover:bg-red-50">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                ) : (
                                    !hasApplied ? (
                                        dbUser?.profile?.resume ? (
                                            <Button
                                                onClick={handleApply}
                                                disabled={applying}
                                                className="h-12 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-500/20 flex items-center gap-2 flex-1 lg:flex-none justify-center"
                                            >
                                                {applying ? <BouncingDots className="w-1 h-1 bg-white" /> : <>Apply Now <ArrowLeft className="w-4 h-4 rotate-180" /></>}
                                            </Button>
                                        ) : (
                                            <>
                                                <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />
                                                <Button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={uploading}
                                                    className="h-12 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-500/20 flex items-center gap-2 flex-1 lg:flex-none justify-center"
                                                >
                                                    {uploading ? <BouncingDots className="w-1 h-1 bg-white" /> : <>Upload Resume <Upload className="w-4 h-4" /></>}
                                                </Button>
                                            </>
                                        )
                                    ) : (
                                        <Button disabled className="h-12 px-8 rounded-xl bg-green-500/10 text-green-600 font-semibold border border-green-500/20 flex items-center gap-2">
                                            <Check className="w-5 h-5" /> Applied
                                        </Button>
                                    )
                                )}
                            </div>
                            <p className="text-xs text-red-500 font-medium">
                                Job expire in: <span className="text-red-600">June 30, 2021</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h3>
                            <div className="text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Responsibilities</h3>
                            <ul className="space-y-3">
                                {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 flex-shrink-0" />
                                        <span className="leading-relaxed">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-white/10 flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Share this job:</span>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-[#3b5998] hover:bg-[#3b5998]/90 text-white gap-2 rounded px-4 h-9">
                                    <Facebook className="w-4 h-4" /> Facebook
                                </Button>
                                <Button size="sm" className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white gap-2 rounded px-4 h-9">
                                    <Twitter className="w-4 h-4" /> Twitter
                                </Button>
                                <Button size="sm" className="bg-[#bd081c] hover:bg-[#bd081c]/90 text-white gap-2 rounded px-4 h-9">
                                    <Instagram className="w-4 h-4" /> Pinterest
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        {/* Job Overview Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-white/10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Job Overview</h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <div className="space-y-1">
                                    <Calendar className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Job Posted</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">14 June, 2021</p>
                                </div>
                                <div className="space-y-1">
                                    <Clock className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Job Expire In</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">14 July, 2021</p>
                                </div>
                                <div className="space-y-1">
                                    <GraduationCap className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Education</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Graduation</p>
                                </div>
                                <div className="space-y-1">
                                    <DollarSign className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Salary</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{job.salaryRange || 'Not Disclosed'}</p>
                                </div>
                                <div className="space-y-1">
                                    <MapPin className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{job.location}</p>
                                </div>
                                <div className="space-y-1">
                                    <Briefcase className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Job Type</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{job.type}</p>
                                </div>
                                <div className="space-y-1">
                                    <Briefcase className="w-5 h-5 text-brand-500 mb-2" />
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Experience</p>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">10-15 Years</p>
                                </div>
                            </div>
                        </div>

                        {/* Company Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-12 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                                    {job.company?.[0] || 'C'}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.company}</h3>
                                    <p className="text-xs text-slate-500 hover:text-brand-500 cursor-pointer">View Profile</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Founded in:</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">March 21, 2006</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Organization type:</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Private Company</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Company size:</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">120-300 Employees</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Phone:</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">(406) 555-0120</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Email:</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">contact@{job.company.toLowerCase().replace(/\s/g, '')}.com</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Website:</span>
                                    <span className="font-medium text-slate-700 dark:text-slate-300 hover:text-brand-500 cursor-pointer">https://{job.company.toLowerCase().replace(/\s/g, '')}.com</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-6 border-t border-slate-100 dark:border-white/10">
                                <Button size="icon" variant="ghost" className="h-9 w-9 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 rounded-lg">
                                    <Facebook className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-9 w-9 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 rounded-lg">
                                    <Twitter className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-9 w-9 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 rounded-lg">
                                    <Instagram className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-9 w-9 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 rounded-lg">
                                    <Linkedin className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
