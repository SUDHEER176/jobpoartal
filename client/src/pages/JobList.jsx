import { useState, useEffect } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { Button, cn } from '../components/ui'
import { Search, MapPin, Briefcase, DollarSign, Filter, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import JobSidebar from '../components/jobs/JobSidebar.jsx'
import JobCard from '../components/jobs/JobCard.jsx'

export default function JobList() {
    const { dbUser, loading: authLoading } = useAuth()
    const [searchParams] = useSearchParams()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [showSidebar, setShowSidebar] = useState(false)
    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        categories: [],
        experienceLevel: '',
        datePosted: 'All',
        salaryRange: [0, 9999],
        sortBy: 'latest'
    })

    // Redirect seekers to onboarding if pending
    if (dbUser?.role === 'seeker' && dbUser?.onboardingStatus === 'pending') {
        return <Navigate to="/onboarding" replace />
    }

    const fetchJobs = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (filters.keyword) params.append('keyword', filters.keyword)
            if (filters.location) params.append('location', filters.location)
            if (filters.type) params.append('type', filters.type)
            if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel)
            if (filters.datePosted) params.append('datePosted', filters.datePosted)
            if (filters.sortBy) params.append('sortBy', filters.sortBy)

            if (filters.categories && filters.categories.length > 0) {
                filters.categories.forEach(cat => params.append('categories', cat))
            }

            const res = await fetch(`/api/jobs?${params}`)
            const data = await res.json()
            if (data.success) setJobs(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchJobs()
        }, 300)
        return () => clearTimeout(timer)
    }, [filters])

    const handleFilterChange = (field, value) => {
        if (field === 'clear') {
            setFilters({
                keyword: '',
                location: '',
                type: '',
                categories: [],
                experienceLevel: '',
                datePosted: 'All',
                salaryRange: [0, 9999],
                sortBy: 'latest'
            })
            return
        }
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    Find your <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">next role</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">Explore thousands of opportunities and take the next step in your career.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 relative">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setShowSidebar(true)}
                    className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-[#309689] text-white rounded-xl font-bold shadow-lg shadow-[#309689]/20 self-start mb-4"
                >
                    <Filter className="size-5" />
                    Filters
                </button>

                {/* Mobile Overlay */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[30] lg:hidden"
                        onClick={() => setShowSidebar(false)}
                    />
                )}

                {/* Sidebar */}
                <JobSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    className={cn(
                        "flex-shrink-0 transition-transform duration-300",
                        "fixed top-[64px] bottom-0 left-0 z-[40] w-[314px] bg-white dark:bg-zinc-900 translate-x-[-100%] lg:translate-x-0 lg:sticky lg:top-24 lg:h-fit lg:block",
                        showSidebar && "translate-x-0"
                    )}
                    onClose={() => setShowSidebar(false)}
                />

                {/* Results Area */}
                <div className="flex-1 max-w-[958px]">
                    {loading ? (
                        <div className="space-y-6 animate-pulse">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-64 bg-white dark:bg-white/5 rounded-[20px] border border-white/5 shadow-sm"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {/* Results Info Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full px-1">
                                <span className="font-sans font-medium text-base text-[#6C757D] dark:text-slate-400">
                                    Showing {jobs.length}-{jobs.length} of {jobs.length} results
                                </span>
                                <button
                                    onClick={() => handleFilterChange('sortBy', filters.sortBy === 'latest' ? 'oldest' : 'latest')}
                                    className="w-auto h-9 px-4 flex items-center gap-3 border-[1.5px] border-slate-200 dark:border-white/10 rounded-lg text-[#6C757D] dark:text-slate-400 font-sans font-medium text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    Sort by {filters.sortBy === 'latest' ? 'latest' : 'oldest'}
                                    <ChevronDown className={cn("size-4 transition-transform duration-300", filters.sortBy === 'oldest' && "rotate-180")} />
                                </button>
                            </div>

                            {/* Job Cards */}
                            <div className="flex flex-col gap-4">
                                {jobs.length === 0 ? (
                                    <div className="py-24 text-center bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-[20px] border border-slate-200 dark:border-white/5">
                                        <div className="bg-white/5 h-16 w-16 rounded-2xl border border-white/5 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-500/5">
                                            <Search className="h-6 w-6 text-brand-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No jobs matched</h3>
                                        <p className="text-slate-500 text-sm">Try broadening your filters or location.</p>
                                    </div>
                                ) : (
                                    jobs.map(job => (
                                        <JobCard key={job._id} job={job} />
                                    ))
                                )}
                            </div>

                            {/* Pagination Area */}
                            {jobs.length > 0 && (
                                <div className="flex justify-between items-center w-full pt-6">
                                    <div className="flex gap-4">
                                        <button className="size-8 flex items-center justify-center bg-[#309689] text-white rounded-lg font-sans font-semibold text-sm shadow-sm">
                                            1
                                        </button>
                                        <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-white/10 text-[#6C757D] rounded-lg font-sans font-semibold text-sm hover:border-[#309689] hover:text-[#309689] transition-all">
                                            2
                                        </button>
                                    </div>
                                    <button className="h-8 px-4 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 text-[#6C757D] rounded-lg font-sans font-medium text-sm hover:border-[#309689] hover:text-[#309689] transition-all">
                                        Next
                                        <ChevronRight className="size-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
