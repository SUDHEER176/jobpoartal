import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Users, Building2, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = ["HYDERABAD", "BANGALORE", "DELHI", "MUMBAI", "PUNE", "CHENNAI", "REMOTE"];
const CATEGORIES = ["Full-time", "Part-time", "Contract", "Internship"];

export function HeroSearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    const [locOpen, setLocOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (location) params.append('location', location);
        if (category) params.append('type', category);

        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-5xl mx-auto mt-8 px-4 relative z-50">
            {/* Multi-Input Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-zinc-950/40 dark:bg-zinc-900 rounded-2xl md:rounded-full p-2 md:h-20 shadow-2xl shadow-blue-500/20 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 backdrop-blur-xl"
            >
                {/* Job Title / Company */}
                <div className="flex-[1.5] flex items-center px-6 py-4 md:py-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 h-full">
                    <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
                    <input
                        type="text"
                        placeholder="Job Title or Company"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                    />
                </div>

                {/* Location Dropdown */}
                <div className="flex-1 relative border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 h-full">
                    <div
                        onClick={() => { setLocOpen(!locOpen); setCatOpen(false); }}
                        className="flex items-center px-6 py-4 md:py-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group h-full"
                    >
                        <MapPin className="h-5 w-5 text-slate-400 mr-3 shrink-0 group-hover:text-blue-500 transition-colors" />
                        <span className={`flex-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis ${location ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                            {location || "Select Location"}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 ml-2 transition-transform ${locOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                        {locOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 w-max min-w-[200px] mt-1 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-[60]"
                            >
                                {LOCATIONS.map(loc => (
                                    <div
                                        key={loc}
                                        onClick={() => { setLocation(loc); setLocOpen(false); }}
                                        className="px-5 py-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer flex items-center justify-between group transition-colors"
                                    >
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">{loc}</span>
                                        {location === loc && <Check className="h-3 w-3 text-blue-500" />}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Category Dropdown */}
                <div className="flex-1 relative h-full">
                    <div
                        onClick={() => { setCatOpen(!catOpen); setLocOpen(false); }}
                        className="flex items-center px-6 py-4 md:py-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group h-full"
                    >
                        <Briefcase className="h-5 w-5 text-slate-400 mr-3 shrink-0 group-hover:text-blue-500 transition-colors" />
                        <span className={`flex-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis ${category ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                            {category || "Select Category"}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 ml-2 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                        {catOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 w-max min-w-[200px] mt-1 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-[60]"
                            >
                                {CATEGORIES.map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => { setCategory(cat); setCatOpen(false); }}
                                        className="px-5 py-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer flex items-center justify-between group transition-colors"
                                    >
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">{cat}</span>
                                        {category === cat && <Check className="h-3 w-3 text-blue-500" />}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-14 md:h-full rounded-xl md:rounded-full font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Search className="h-5 w-5" />
                    <span>Search Job</span>
                </button>
            </motion.div>

            {/* Feature Stats Below */}
            <div className="mt-12 flex flex-wrap justify-center gap-10 md:gap-20">
                <StatItem
                    icon={Briefcase}
                    count="25,850"
                    label="Jobs"
                    delay={0.4}
                />
                <StatItem
                    icon={Users}
                    count="10,250"
                    label="Candidates"
                    delay={0.5}
                />
                <StatItem
                    icon={Building2}
                    count="18,400"
                    label="Companies"
                    delay={0.6}
                />
            </div>
        </div>
    );
}

function StatItem({ icon: Icon, count, label, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center gap-4 group"
        >
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <Icon className="h-7 w-7" />
            </div>
            <div className="flex flex-col text-left">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{count}</span>
                <span className="text-slate-500 dark:text-slate-500 font-medium">{label}</span>
            </div>
        </motion.div>
    );
}
