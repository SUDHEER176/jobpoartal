import { useState } from 'react'
import { MapPin, Briefcase, Clock, DollarSign, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/components/ui'

export default function JobCard({ job }) {
    const [imageError, setImageError] = useState(false)

    return (
        <div className="group w-full max-w-[958px] bg-white dark:bg-zinc-900/60 p-6 rounded-xl shadow-[0px_2px_4px_rgba(48,150,137,0.04)] border border-slate-100 dark:border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-[#309689]/5 flex flex-col gap-4 text-left">
            {/* Top Row: Time Badge and Bookmark/Icon */}
            <div className="flex justify-between items-start w-full">
                <div className="px-2 py-0.5 bg-[#309689]/10 rounded flex items-center justify-center">
                    <span className="font-['Figtree'] text-[#309689] text-xs font-medium whitespace-nowrap">
                        {getTimeAgo(job.createdAt)}
                    </span>
                </div>
                <button className="text-[#6C757D] hover:text-[#309689] transition-colors flex-shrink-0">
                    <Bookmark className="size-5" />
                </button>
            </div>

            {/* Middle Row: Logo and Title Info */}
            <div className="flex items-start gap-4 w-full">
                <div className="size-12 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 flex items-center justify-center p-2 flex-shrink-0 shadow-sm overflow-hidden group-hover:border-[#309689]/50 transition-all duration-300">
                    {job.logo && job.logo !== "" && !imageError ? (
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-full h-full object-contain pointer-events-none"
                            loading="lazy"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br from-[#309689] to-[#257a6f] rounded-lg">
                            {job.company?.[0] || '?'}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0 py-0.5">
                    <h3 className="font-['Figtree'] font-bold text-xl leading-snug text-slate-900 dark:text-white group-hover:text-[#309689] transition-colors line-clamp-1">
                        {job.title}
                    </h3>
                    <p className="font-['Figtree'] text-sm text-[#6C757D] dark:text-slate-400 font-medium tracking-tight">
                        {job.company}
                    </p>
                </div>
            </div>

            {/* Bottom Row: Metadata and Action Button */}
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-x-6 gap-y-4 w-full mt-1">
                <div className="flex flex-wrap items-center gap-4">
                    <MetaItem icon={<Briefcase className="size-4" />} label={job.category || "Developer"} />
                    <MetaItem icon={<Clock className="size-4" />} label={job.type} />
                    <MetaItem icon={<DollarSign className="size-4" />} label={job.salaryRange || "$45k-$50k"} />
                    <MetaItem icon={<MapPin className="size-4" />} label={job.location} />
                </div>

                <Link to={`/jobs/${job._id}`} className="flex-shrink-0">
                    <button className="bg-[#309689] hover:bg-[#288579] text-white px-4 py-1.5 rounded-lg font-['Figtree'] font-semibold text-sm capitalize transition-all shadow-sm active:scale-95">
                        View details
                    </button>
                </Link>
            </div>
        </div>
    )
}

function MetaItem({ icon, label }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[#309689] flex-shrink-0">
                {icon}
            </span>
            <span className="font-['Figtree'] font-medium text-xs text-[#6C757D] dark:text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                {label}
            </span>
        </div>
    )
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " min ago"
    return Math.floor(seconds) + " sec ago"
}
