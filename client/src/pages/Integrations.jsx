import React from 'react';
import { Plug, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const Integrations = () => {
    const integrations = [
        {
            name: "Slack",
            description: "Receive real-time notifications for new applications and interview requests.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
            category: "Communication",
            status: "Connected"
        },
        {
            name: "Google Calendar",
            description: "Sync interviews directly to your team's calendar with automatic link generation.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
            category: "Productivity",
            status: "Available"
        },
        {
            name: "Zoom",
            description: "Automatically create meeting links for remote interviews through our dashboard.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/9/94/Zoom_logo.svg",
            category: "Video Conferencing",
            status: "Available"
        },
        {
            name: "LinkedIn",
            description: "Post jobs directly to LinkedIn and sync candidate profiles instantly.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
            category: "Social",
            status: "Connected"
        },
        {
            name: "HubSpot",
            description: "Funnel candidate data into your CRM for long-term talent relationship management.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg",
            category: "CRM",
            status: "Available"
        },
        {
            name: "GitHub",
            description: "Import candidate repositories and contribution history for technical roles.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
            category: "Development",
            status: "Available"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient italic">
                        Integrations
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Connect your favorite tools to automate your recruitment workflow. Save time by syncing data across your favorite platforms.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {integrations.map((app, index) => (
                        <div key={index} className="glass-card p-8 group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-md border border-slate-100 dark:border-white/5 flex items-center justify-center">
                                    <img src={app.icon} alt={app.name} className="w-full h-full object-contain" />
                                </div>
                                {app.status === 'Connected' ? (
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">
                                        <CheckCircle2 className="w-3 h-3" /> {app.status}
                                    </span>
                                ) : (
                                    <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-colors">
                                        Connect
                                    </button>
                                )}
                            </div>

                            <div className="mb-4">
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{app.category}</span>
                                <h3 className="text-xl font-bold dark:text-white mt-1">{app.name}</h3>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                                {app.description}
                            </p>

                            <div className="pt-6 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between group-hover:text-blue-500 transition-colors">
                                <span className="text-sm font-semibold">View documentation</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="glass-card p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 dark:text-white italic">Build custom integrations</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Need something specific? Use our robust API to build custom integrations that fit your company's unique needs. Detailed documentation and SDKs available.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-brand-500/20">
                                    <Zap className="w-4 h-4" /> API Docs
                                </button>
                                <button className="px-8 py-3 glass bg-white/5 dark:text-white rounded-xl font-semibold">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center justify-center p-8 bg-slate-900/5 dark:bg-white/5 rounded-3xl border border-white/10">
                            <div className="grid grid-cols-3 gap-6 opacity-30">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                    <div key={i} className="w-16 h-16 bg-white/10 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                                ))}
                            </div>
                            <Plug className="w-24 h-24 text-blue-500 absolute animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Integrations;
