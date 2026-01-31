import React from 'react';
import { FileText, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

const Terms = () => {
    const sections = [
        {
            icon: <FileText className="w-6 h-6 text-blue-500" />,
            title: "1. Agreement to Terms",
            content: "By accessing or using our job portal, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
            title: "2. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
        },
        {
            icon: <Scale className="w-6 h-6 text-blue-600" />,
            title: "3. Acceptable Use",
            content: "You may not use our services for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction."
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-indigo-600" />,
            title: "4. Limitations of Liability",
            content: "We provide our services 'as is'. We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient italic">
                        Terms of Service
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Last updated: January 29, 2026
                    </p>
                </div>

                <div className="space-y-8 mb-12">
                    {sections.map((section, index) => (
                        <div key={index} className="glass-card p-8 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-4">
                                {section.icon}
                                <h2 className="text-xl font-bold dark:text-white">{section.title}</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="glass-card p-8 bg-blue-500/5 border-blue-500/10">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Contact Us</h2>
                    <p className="text-slate-600 dark:text-slate-400 pb-4">
                        If you have any questions about these Terms, please contact our legal team:
                    </p>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold underline cursor-pointer">
                        legal@jobportal.com
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
