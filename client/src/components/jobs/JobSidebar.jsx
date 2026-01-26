import { Search, MapPin, ChevronDown, Check, X, Filter } from 'lucide-react'
import { cn } from '@/components/ui'

export default function JobSidebar({ filters, onFilterChange, className, onClose }) {
    return (
        <aside className={cn(
            "w-[314px] flex flex-col gap-4 transition-all duration-300",
            "overflow-y-auto lg:overflow-y-visible max-h-[100dvh] lg:max-h-none",
            "bg-white dark:bg-zinc-900",
            className
        )}>
            {/* Main Filters Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-sm p-6 flex flex-col gap-5 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-center gap-2 mb-2 relative">
                    <div className="flex items-center gap-2 text-[#444] dark:text-white font-medium text-lg">
                        <Filter className="size-5 text-[#00A5EC]" />
                        Filters
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden absolute right-0 p-1"
                    >
                        <X className="size-5 text-slate-400" />
                    </button>
                </div>

                {/* Preferences Checkbox */}
                <CheckboxItem
                    label={<>As per my <span className="text-[#00A5EC]">preferences</span></>}
                    checked={filters.usePreferences}
                    onChange={() => onFilterChange('usePreferences', !filters.usePreferences)}
                />

                {/* Profile Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">Profile</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. Marketing"
                            className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded focus:border-[#00A5EC] focus:ring-1 focus:ring-[#00A5EC] outline-none text-sm transition-all"
                            value={filters.keyword || ''}
                            onChange={(e) => onFilterChange('keyword', e.target.value)}
                        />
                    </div>
                </div>

                {/* Location Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">Location</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. Delhi"
                            className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded focus:border-[#00A5EC] focus:ring-1 focus:ring-[#00A5EC] outline-none text-sm transition-all"
                            value={filters.location || ''}
                            onChange={(e) => onFilterChange('location', e.target.value)}
                        />
                    </div>
                </div>

                {/* Checkbox Options */}
                <div className="flex flex-col gap-3">
                    <CheckboxItem
                        label="Internships in my city"
                        checked={filters.nearMe}
                        onChange={() => onFilterChange('nearMe', !filters.nearMe)}
                    />
                    <CheckboxItem
                        label="Work from home"
                        checked={filters.type === 'Remote'}
                        onChange={() => onFilterChange('type', filters.type === 'Remote' ? '' : 'Remote')}
                    />
                    <CheckboxItem
                        label="Part-time"
                        checked={filters.type === 'Part-time'}
                        onChange={() => onFilterChange('type', filters.type === 'Part-time' ? '' : 'Part-time')}
                    />
                </div>

                {/* Stipend Slider */}
                <div className="flex flex-col gap-4 mt-2">
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        Desired minimum monthly stipend (₹)
                    </label>
                    <div className="px-1">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="2000"
                            className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-[#00A5EC]"
                            value={filters.minStipend || 0}
                            onChange={(e) => onFilterChange('minStipend', parseInt(e.target.value))}
                        />
                        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                            <span>0</span>
                            <span>2K</span>
                            <span>4K</span>
                            <span>6K</span>
                            <span>8K</span>
                            <span>10K</span>
                        </div>
                    </div>
                </div>

                {/* View More filters */}
                <button className="flex items-center gap-1 text-[#00A5EC] text-sm font-medium mt-2 hover:underline">
                    View more filters
                    <ChevronDown className="size-4" />
                </button>

                {/* Clear All */}
                <button
                    onClick={() => onFilterChange('clear', true)}
                    className="self-end text-[#00A5EC] text-sm font-medium hover:underline"
                >
                    Clear all
                </button>
            </div>

            {/* Keyword Search Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-sm p-6 flex flex-col gap-4 shadow-sm">
                <h3 className="text-center text-slate-900 dark:text-white font-bold text-base">Keyword Search</h3>
                <form
                    onSubmit={(e) => { e.preventDefault(); onFilterChange('keyword', filters.keyword) }}
                    className="flex items-center"
                >
                    <input
                        type="text"
                        placeholder="e.g. Design, Mumbai, Infosys"
                        className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-r-0 rounded-l outline-none text-sm focus:border-[#00A5EC] transition-all"
                        value={filters.keyword || ''}
                        onChange={(e) => onFilterChange('keyword', e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-[#00A5EC] hover:bg-[#0094d4] text-white p-2.5 rounded-r transition-colors"
                    >
                        <Search className="size-4 stroke-[3px]" />
                    </button>
                </form>
            </div>
        </aside>
    )
}

function CheckboxItem({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
                "size-4 border border-slate-300 rounded flex items-center justify-center transition-all",
                checked ? "bg-[#00A5EC] border-[#00A5EC]" : "bg-white dark:bg-transparent"
            )}>
                {checked && <Check className="size-3 text-white stroke-[4px]" />}
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium group-hover:text-black dark:group-hover:text-white transition-colors">
                {label}
            </span>
        </label>
    )
}
