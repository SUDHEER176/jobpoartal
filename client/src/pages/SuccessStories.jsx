import React from 'react';
import { Quote, Briefcase, TrendingUp, MapPin } from 'lucide-react';

const SuccessStories = () => {
    const stories = [
        {
            name: "Sarah Jenkins",
            role: "Senior Product Designer",
            company: "TechFlow Systems",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            content: "Found my dream role within two weeks of joining. The platform's matching algorithm is incredibly accurate and saved me hours of searching.",
            impact: "Increased salary by 40%",
            location: "San Francisco, CA"
        },
        {
            name: "Marcus Chen",
            role: "Full Stack Developer",
            company: "Innovative AI",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            content: "As a junior developer, the onboarding process and resume tips were game-changers. I felt supported throughout my entire job hunt.",
            impact: "Hired by Fortune 500",
            location: "Remote"
        },
        {
            name: "Elena Rodriguez",
            role: "Marketing Director",
            company: "Global Reach Media",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
            content: "The recruiter dashboard is the best I've used. We found our last three key hires through this portal. The quality of candidates is exceptional.",
            impact: "Reduced hiring time by 50%",
            location: "New York, NY"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient italic">
                        Success Stories
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Real people. Real careers. Real success. See how our platform has helped thousands of professionals find their path.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {stories.map((story, index) => (
                        <div key={index} className="glass-card p-8 flex flex-col h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="mb-6 flex items-center gap-4">
                                <img
                                    src={story.image}
                                    alt={story.name}
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/20"
                                />
                                <div>
                                    <h3 className="font-bold text-lg dark:text-white">{story.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{story.role}</p>
                                </div>
                            </div>

                            <div className="relative mb-6">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/10" />
                                <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed relative z-10">
                                    "{story.content}"
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-white/10 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    {story.impact}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <Briefcase className="w-4 h-4" />
                                    {story.company}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <MapPin className="w-4 h-4" />
                                    {story.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="glass-card p-12 text-center bg-gradient-to-br from-blue-600/5 to-indigo-600/5 border-blue-500/20">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white italic">Ready to write your own story?</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                        Join thousands of professionals who have already accelerated their careers using our platform.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105">
                            Find a Job
                        </button>
                        <button className="px-8 py-3 glass bg-white/10 dark:text-white rounded-xl font-semibold transition-all transform hover:scale-105">
                            Post a Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
