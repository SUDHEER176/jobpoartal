import React from 'react';
import { Search, BookOpen, MessageCircle, HelpCircle, User, Briefcase, Settings } from 'lucide-react';

const HelpCenter = () => {
    const categories = [
        {
            icon: <User className="w-8 h-8 text-blue-500" />,
            title: "Account & Profile",
            description: "Manage your account settings, profile visibility, and security."
        },
        {
            icon: <Briefcase className="w-8 h-8 text-indigo-500" />,
            title: "Job Search",
            description: "Tips on finding the best jobs and using our advanced filters."
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
            title: "Applications",
            description: "Track your applications and understand the hiring process."
        },
        {
            icon: <Settings className="w-8 h-8 text-indigo-600" />,
            title: "Recruiter Help",
            description: "Resources for posting jobs and managing candidates."
        }
    ];

    const faqs = [
        {
            question: "How do I upload a new resume?",
            answer: "Go to your Profile settings, click on the 'Resume' tab, and select 'Upload New Resume'. We support PDF and DOCX formats."
        },
        {
            question: "Is my profile visible to all companies?",
            answer: "By default, your profile is semi-anonymous. Only when you apply to a specific job does that company see your full details."
        },
        {
            question: "How can I track my application status?",
            answer: "Navigate to 'My Applications' in your dashboard to see real-time updates on all your active applications."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Search Hero */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 dark:text-white italic">
                        How can we <span className="text-gradient">help?</span>
                    </h1>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for articles, guides..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl glass border-slate-200/50 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {categories.map((cat, index) => (
                        <div key={index} className="glass-card p-8 group cursor-pointer hover:border-blue-500/50">
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white">{cat.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                {cat.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center dark:text-white italic flex items-center justify-center gap-3">
                        <HelpCircle className="text-blue-500" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass p-6 rounded-2xl border-slate-200/30 dark:border-white/5">
                                <h4 className="font-bold mb-2 dark:text-white">{faq.question}</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Section */}
                <div className="glass-card p-12 text-center overflow-hidden relative">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4 dark:text-white italic">Still need help?</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                            Our support team is available 24/7 to assist you with any questions or technical issues.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                                <MessageCircle className="w-5 h-5" /> Chat with Us
                            </button>
                            <button className="flex items-center gap-2 px-8 py-3 glass bg-white/10 dark:text-white rounded-xl font-semibold transition-all">
                                <BookOpen className="w-5 h-5" /> Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
