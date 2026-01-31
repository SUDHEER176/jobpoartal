import React from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const Privacy = () => {
    const policies = [
        {
            icon: <Eye className="w-6 h-6 text-blue-500" />,
            title: "Information We Collect",
            content: "We collect information that you provide directly to us, including profile details, resume files, and communication history to provide a better job seeking experience."
        },
        {
            icon: <Database className="w-6 h-6 text-indigo-500" />,
            title: "How We Use Data",
            content: "Your data is used to match you with relevant jobs, improve our recommendations, and facilitate communication between seekers and recruiters."
        },
        {
            icon: <Lock className="w-6 h-6 text-blue-600" />,
            title: "Data Security",
            content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction."
        },
        {
            icon: <Shield className="w-6 h-6 text-indigo-600" />,
            title: "Your Rights",
            content: "You have the right to access, update, or delete your personal information at any time through your account settings or by contacting our support."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient italic">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Your privacy is our priority. Last updated: January 29, 2026
                    </p>
                </div>

                <div className="space-y-8 mb-12">
                    {policies.map((policy, index) => (
                        <div key={index} className="glass-card p-8 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-4">
                                {policy.icon}
                                <h2 className="text-xl font-bold dark:text-white">{policy.title}</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                                {policy.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="glass-card p-8 border-indigo-500/10">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">GDPR & Protection</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We are fully committed to GDPR compliance and protect the data of all our users regardless of their location. For more information on our data processing practices, please email our Data Protection Officer.
                    </p>
                    <div className="mt-4 text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer">
                        privacy@jobportal.com
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
