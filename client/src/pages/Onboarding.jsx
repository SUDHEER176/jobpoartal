import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { Button } from '@/components/ui'
import { useRef } from 'react'
import {
    Check,
    User,
    Briefcase,
    Heart,
    FileText,
    ChevronRight,
    ChevronLeft,
    Mail,
    MapPin,
    DollarSign,
    Target,
    X,
    ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
    { id: 1, title: 'Email Verification', icon: Mail },
    { id: 2, title: 'Profile', icon: User },
    { id: 3, title: 'Preferences', icon: Target },
    { id: 4, title: 'Culture', icon: Heart },
    { id: 5, title: 'Resume/CV', icon: FileText },
    { id: 6, title: 'Done', icon: Check }
]

export default function Onboarding() {
    const { user, dbUser, syncUserWithDb, refreshUser } = useAuth()
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(dbUser?.onboardingStep || 1)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)

    const [formData, setFormData] = useState({
        profile: {
            name: dbUser?.profile?.name || '',
            bio: dbUser?.profile?.bio || '',
            title: dbUser?.profile?.title || '',
            location: dbUser?.profile?.location || ''
        },
        preferences: {
            jobTypes: dbUser?.preferences?.jobTypes || [],
            roles: dbUser?.preferences?.roles || [],
            salaryExpectation: dbUser?.preferences?.salaryExpectation || '',
            locations: dbUser?.preferences?.locations || []
        },
        culture: {
            values: dbUser?.culture?.values || [],
            workStyle: dbUser?.culture?.workStyle || 'Remote',
            environment: dbUser?.culture?.environment || 'Fast-paced'
        },
        resume: dbUser?.profile?.resume || ''
    })

    useEffect(() => {
        if (!user) navigate('/auth')
        if (dbUser?.onboardingStatus === 'completed') navigate('/dashboard')
    }, [user, dbUser, navigate])

    const updateStep = async (nextStep) => {
        if (!import.meta.env.VITE_SUPABASE_URL) {
            setError("Supabase configuration missing. Please restart your dev server and ensure .env is set up.")
            return
        }
        setLoading(true)
        try {
            const body = {
                userId: user.id,
                step: nextStep,
                onboardingStatus: nextStep > 6 ? 'completed' : 'pending',
                ...formData
            }
            if (formData.resume) body.resume = formData.resume

            const res = await fetch('/api/auth/onboarding', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                // Refresh local dbUser state in context
                await refreshUser()

                if (nextStep > 6) {
                    navigate('/dashboard')
                } else {
                    setCurrentStep(nextStep)
                }
            }
        } catch (error) {
            console.error('Update Step Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file')
            return
        }

        setUploading(true)
        setError('')

        try {
            const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
            const fileName = `${user.id}/${Date.now()}_${cleanFileName}`

            // Optional: If there's an existing file, we could delete it here, 
            // but we'll stick to a simple replace for now to avoid complexity.

            const { data, error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(fileName)

            setFormData({ ...formData, resume: publicUrl })
        } catch (err) {
            console.error('Detailed Upload Error:', err)
            const msg = err.message || err.error_description || 'Error uploading file'

            if (msg.includes('Unexpected token') || msg.includes('html')) {
                setError("Connection error: It seems like your .env variables aren't being picked up. Please restart your dev server.")
            } else if (msg.includes('Bucket not found')) {
                setError("Storage Error: The 'resumes' bucket does not exist in your Supabase project. Please create it in the Supabase Dashboard under 'Storage' and set it to 'Public'.")
            } else {
                setError(`${msg}. Please ensure the 'resumes' bucket exists and is public with correct RLS policies.`)
            }
        } finally {
            setUploading(false)
        }
    }

    const handleRemoveResume = async () => {
        if (!formData.resume) return

        setError('')
        setUploading(true)
        try {
            // If it's a Supabase storage URL, we can try to delete the file
            if (formData.resume.includes('supabase.co/storage/v1/object/public/resumes/')) {
                const path = formData.resume.split('/resumes/')[1]
                const { error: deleteError } = await supabase.storage
                    .from('resumes')
                    .remove([path])

                if (deleteError) {
                    console.error('Delete Error:', deleteError)
                    // We don't necessarily want to block the UI if delete fails, 
                    // but we should log it.
                }
            }

            setFormData({ ...formData, resume: '' })
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (err) {
            console.error('Remove Error:', err)
            setError('Error removing file. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    const validateStep = () => {
        setError('')
        switch (currentStep) {
            case 2:
                if (!formData.profile.name.trim()) return "Full Name is required"
                if (!formData.profile.title.trim()) return "Professional Title is required"
                if (!formData.profile.bio.trim()) return "Bio is required"
                return true
            case 3:
                if (!formData.preferences.salaryExpectation.trim()) return "Salary expectation is required"
                const activeLocations = formData.preferences.locations.filter(l => l.trim())
                if (activeLocations.length === 0) return "At least one location is required"
                if (formData.preferences.jobTypes.length === 0) return "Please select at least one employment type"
                return true
            case 5:
                if (!formData.resume.trim()) return "Resume URL is required"
                return true
            default:
                return true
        }
    }

    const handleNext = () => {
        const validation = validateStep()
        if (validation !== true) {
            setError(validation)
            return
        }

        if (currentStep < 6) {
            updateStep(currentStep + 1)
        } else {
            updateStep(7) // Complete
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6 text-center py-8">
                        <div className="size-20 bg-brand-500/10 border border-brand-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Mail className="size-10 text-brand-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white">Check your inbox</h2>
                        <p className="text-slate-400 text-lg max-w-sm mx-auto">We've sent a verification link to <span className="text-white font-bold">{user?.email}</span>. Please verify to continue.</p>
                        <div className="pt-8">
                            <Button onClick={handleNext} className="h-14 px-12 rounded-2xl transform active:scale-95 transition-all">My email is verified</Button>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                                    placeholder="Enter your name"
                                    value={formData.profile.name}
                                    onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, name: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Professional Title</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                                    placeholder="e.g. Senior Frontend Developer"
                                    value={formData.profile.title}
                                    onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, title: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Bio</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-brand-500/50 outline-none transition-all h-32 resize-none"
                                placeholder="Tell us about yourself..."
                                value={formData.profile.bio}
                                onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, bio: e.target.value } })}
                            />
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Desired Salary Range</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-brand-400" />
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                                        placeholder="e.g. $100k - $120k"
                                        value={formData.preferences.salaryExpectation}
                                        onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, salaryExpectation: e.target.value } })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Preferred Locations</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-brand-400" />
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-brand-500/50 outline-none transition-all"
                                        placeholder="e.g. London, Remote"
                                        value={formData.preferences.locations.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, locations: e.target.value.split(',').map(s => s.trim()) } })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Employment Type</label>
                            <div className="flex flex-wrap gap-3">
                                {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            const types = formData.preferences.jobTypes.includes(type)
                                                ? formData.preferences.jobTypes.filter(t => t !== type)
                                                : [...formData.preferences.jobTypes, type]
                                            setFormData({ ...formData, preferences: { ...formData.preferences, jobTypes: types } })
                                        }}
                                        className={cn(
                                            "px-6 py-3 rounded-2xl font-bold text-sm transition-all border",
                                            formData.preferences.jobTypes.includes(type)
                                                ? "bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20"
                                                : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-8 text-center">
                        <h2 className="text-2xl font-black text-white">What defines your ideal workspace?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            {[
                                { title: 'Work Style', key: 'workStyle', options: ['Remote', 'Hybrid', 'In-office'] },
                                { title: 'Environment', key: 'environment', options: ['Fast-paced', 'Balanced', 'Structured'] }
                            ].map((group) => (
                                <div key={group.key} className="space-y-4 text-left">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{group.title}</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {group.options.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setFormData({ ...formData, culture: { ...formData.culture, [group.key]: opt } })}
                                                className={cn(
                                                    "w-full px-6 py-4 rounded-2xl font-bold text-left transition-all border",
                                                    formData.culture[group.key] === opt
                                                        ? "bg-brand-500/10 border-brand-500/50 text-white"
                                                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                                                )}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className="space-y-8 text-center py-12">
                        <div className="size-24 bg-brand-500/10 border border-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-500/10">
                            <FileText className="size-12 text-brand-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white">Share your story</h2>
                        <p className="text-slate-400 text-lg max-w-sm mx-auto">Upload your resume to complete your professional profile.</p>
                        <div className="max-w-md mx-auto pt-8">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileUpload}
                            />

                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current.click()}
                                disabled={uploading}
                                className="w-full h-14 rounded-2xl border-dashed border-white/20 mt-4 hover:bg-white/5 text-white"
                            >
                                {uploading ? 'Processing...' : formData.resume ? 'Replace PDF File' : 'Upload PDF File'}
                            </Button>

                            {formData.resume && (
                                <div className="mt-4 flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl w-full group">
                                        <FileText className="size-4 text-brand-400 shrink-0" />
                                        <a
                                            href={formData.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-slate-400 truncate flex-1 text-left hover:text-brand-400 hover:underline transition-all flex items-center gap-2"
                                        >
                                            {formData.resume.split('/').pop().slice(0, 30)}...
                                            <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <button
                                            onClick={handleRemoveResume}
                                            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-red-400 transition-all"
                                            title="Remove Resume"
                                        >
                                            <X className="size-4" />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-green-500 font-bold flex items-center justify-center gap-1">
                                        <Check className="size-3" /> Resume linked successfully
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            case 6:
                return (
                    <div className="space-y-8 text-center py-16">
                        <div className="size-24 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/10">
                            <Check className="size-12 text-green-400" />
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight">You're all set!</h2>
                        <p className="text-slate-400 text-xl max-w-sm mx-auto font-medium">Your profile is optimized and ready to connect with top tech companies.</p>
                        <div className="pt-12">
                            <Button onClick={handleNext} className="h-16 px-16 rounded-[2rem] text-xl font-black bg-brand-500 hover:bg-brand-600 shadow-2xl shadow-brand-500/20">Explore Jobs <ChevronRight className="ml-2 size-6" /></Button>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-8 pb-20 px-4">
            <div className="w-full max-w-5xl mb-12 overflow-x-auto no-scrollbar flex justify-center">
                <div className="bg-zinc-900/40 backdrop-blur-2xl px-10 py-5 rounded-full border border-white/5 shadow-2xl flex items-center gap-6 shrink-0 mx-auto">
                    {STEPS.map((step, idx) => (
                        <div key={step.id} className="flex items-center group shrink-0">
                            <div className="flex items-center gap-2">
                                {currentStep > step.id ? (
                                    <Check className="size-4 text-green-500" />
                                ) : null}
                                <span className={cn(
                                    "text-sm tracking-tight transition-all duration-300 whitespace-nowrap",
                                    currentStep === step.id
                                        ? "text-brand-500 font-bold"
                                        : currentStep > step.id
                                            ? "text-slate-500"
                                            : "text-slate-500 font-medium opacity-60"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                            {idx < STEPS.length - 1 && (
                                <div className="ml-6 w-8 h-px bg-white/5 relative bg-gradient-to-r from-white/10 to-transparent shrink-0"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full max-w-2xl">
                <div className="bg-zinc-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl shadow-brand-500/5 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex-1">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}
                        {renderStepContent()}
                    </div>

                    {currentStep > 1 && currentStep < 6 && (
                        <div className="relative z-10 mt-12 flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-[2rem]">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-slate-500 hover:text-white font-black uppercase tracking-widest text-[10px] px-6 py-4 transition-all"
                            >
                                <ChevronLeft className="size-4" /> Go Back
                            </button>
                            <Button
                                onClick={handleNext}
                                disabled={loading}
                                className="h-14 px-10 rounded-2xl font-black bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/20"
                            >
                                {loading ? 'Saving...' : currentStep === 5 ? 'Finalize Profile' : 'Continue'}
                                {!loading && <ChevronRight className="ml-2 size-5" />}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
