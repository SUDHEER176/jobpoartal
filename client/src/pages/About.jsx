import React from 'react';
import { Users, Target, Shield, Award } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Active Users', value: '100K+' },
        { label: 'Jobs Posted', value: '50K+' },
        { label: 'Companies', value: '5K+' },
        { label: 'Success Stories', value: '25K+' },
    ];

    const values = [
        {
            icon: <Users className="w-8 h-8 text-blue-500" />,
            title: "Community First",
            description: "We believe in building a supportive ecosystem where talent meets opportunity seamlessly."
        },
        {
            icon: <Target className="w-8 h-8 text-indigo-500" />,
            title: "Goal Oriented",
            description: "Our mission is to bridge the gap between dream jobs and exceptional talent."
        },
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Trust & Safety",
            description: "We prioritize the security and privacy of our users above all else."
        },
        {
            icon: <Award className="w-8 h-8 text-indigo-600" />,
            title: "Excellence",
            description: "We strive for excellence in every feature we build and every connection we facilitate."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient italic">
                        About Our Mission
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        We're on a mission to revolutionize how people find work and how companies build teams.
                        Our platform is designed to make the job search process more transparent, efficient, and human.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="glass-card p-8 text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="glass-card p-8 group">
                                <div className="mb-4 transform transition-transform group-hover:scale-110 duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 dark:text-white">{value.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Story Section */}
                <div className="glass-card p-8 md:p-12 overflow-hidden relative">
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 dark:text-white italic">Our Story</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Founded in 2024, we started with a simple observation: the job market was fragmented and the hiring process was often cold and impersonal.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Today, we serve thousands of users across the globe, helping them find not just any job, but the right job. We combine cutting-edge technology with a human-centric approach to create a platform that truly works for everyone.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 transform -rotate-3"></div>
                            <div className="h-48 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 transform rotate-3 mt-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
