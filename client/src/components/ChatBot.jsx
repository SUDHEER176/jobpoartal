import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your JobPortal assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { user, dbUser } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickReplies = [
        { text: "How do I apply for a job?", value: "apply" },
        { text: "Update my profile", value: "profile" },
        { text: "Track applications", value: "track" },
        { text: "Contact support", value: "support" }
    ];

    const botResponses = {
        apply: "To apply for a job:\n1. Browse jobs in the 'Find Jobs' section\n2. Click on a job that interests you\n3. Make sure you have uploaded your resume\n4. Click 'Submit Application'\n\nNeed help with anything else?",
        profile: user
            ? `You can update your profile by going to ${dbUser?.role === 'seeker' ? 'the Onboarding page' : 'your Dashboard'}. There you can update your resume, skills, and personal information.`
            : "Please sign in first to update your profile. Click 'Sign In' in the top right corner.",
        track: user
            ? "You can track all your applications by visiting 'My Applications' in the navigation menu. There you'll see the status of each application."
            : "Please sign in to track your applications.",
        support: "You can reach our support team at:\n📧 support@jobportal.com\n💬 Live chat (9 AM - 6 PM)\n📞 +1 (555) 123-4567\n\nOr visit our Help Center for FAQs.",
        resume: "Tips for a great resume:\n• Keep it concise (1-2 pages)\n• Use action verbs\n• Quantify achievements\n• Tailor it to each job\n• Proofread carefully\n\nUpload your resume in PDF format for best results!",
        recruiter: user && dbUser?.role === 'recruiter'
            ? "As a recruiter, you can:\n• Post new jobs\n• View applicants\n• Manage your job listings\n• Track hiring metrics\n\nVisit your Dashboard to get started!"
            : "Interested in recruiting? Sign up as a recruiter to:\n• Post unlimited jobs\n• Access our talent pool\n• Use advanced filters\n• Track applications",
        jobs: "Looking for jobs? Here's how:\n1. Use filters (location, type, salary)\n2. Save jobs you like\n3. Set up job alerts\n4. Apply with one click\n\nCheck out our 'Success Stories' for inspiration!",
        salary: "Salary information:\n• Most jobs show salary ranges\n• Use filters to find jobs in your range\n• Research market rates for your role\n• Don't be afraid to negotiate!\n\nRemember: salary is just one part of compensation.",
        interview: "Interview tips:\n• Research the company\n• Prepare STAR method examples\n• Dress professionally\n• Ask thoughtful questions\n• Follow up with a thank you note\n\nGood luck! 🍀",
        default: "I'm here to help! You can ask me about:\n• Applying for jobs\n• Updating your profile\n• Tracking applications\n• Resume tips\n• Interview preparation\n• Getting support\n\nWhat would you like to know?"
    };

    const getSmartResponse = (text) => {
        const lowerText = text.toLowerCase();

        // Check for greetings
        if (lowerText.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
            return `Hello${user ? ` ${dbUser?.profile?.name || ''}` : ''}! 👋 How can I assist you today?`;
        }

        // Check for thanks
        if (lowerText.match(/(thank|thanks|appreciate)/)) {
            return "You're welcome! Feel free to ask if you need anything else. Have a great day! 😊";
        }

        // Check for specific keywords
        if (lowerText.includes('resume') || lowerText.includes('cv')) return botResponses.resume;
        if (lowerText.includes('recruiter') || lowerText.includes('hiring')) return botResponses.recruiter;
        if (lowerText.includes('job') && !lowerText.includes('apply')) return botResponses.jobs;
        if (lowerText.includes('salary') || lowerText.includes('pay')) return botResponses.salary;
        if (lowerText.includes('interview')) return botResponses.interview;
        if (lowerText.includes('apply')) return botResponses.apply;
        if (lowerText.includes('profile') || lowerText.includes('update')) return botResponses.profile;
        if (lowerText.includes('track') || lowerText.includes('application')) return botResponses.track;
        if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('contact')) return botResponses.support;

        return botResponses.default;
    };

    const handleSendMessage = async (text = inputValue) => {
        if (!text.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot thinking
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                text: getSmartResponse(text),
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleQuickReply = (value) => {
        const quickReply = quickReplies.find(r => r.value === value);
        if (quickReply) {
            handleSendMessage(quickReply.text);
        }
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group"
                >
                    <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] rounded-2xl overflow-hidden p-[2px]">
                    {/* Animated Outer Border */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-white/20"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner Card */}
                    <div className="relative flex flex-col w-full h-full rounded-xl border border-white/10 overflow-hidden bg-black/90 backdrop-blur-xl">
                        {/* Inner Animated Background */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900 z-0"
                            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 200%" }}
                        />

                        {/* Floating Particles */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-white/10 z-0"
                                animate={{
                                    y: ["0%", "-140%"],
                                    x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeInOut",
                                }}
                                style={{ left: `${Math.random() * 100}%`, bottom: "-10%" }}
                            />
                        ))}

                        {/* Header */}
                        <div className="px-4 py-4 border-b border-white/20 relative z-50 flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-black/20">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/90 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                                    <Bot className="w-6 h-6 text-white drop-shadow-md" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white drop-shadow-sm leading-tight">JobPortal Bot</h2>
                                    <p className="text-xs text-white/90 font-medium">Your virtual assistant</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-sm flex flex-col relative z-20 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5 hover:scrollbar-thumb-white/30">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'bot'
                                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                                        : 'bg-white/20'
                                        }`}>
                                        {message.sender === 'bot' ? (
                                            <Bot className="w-5 h-5 text-white" />
                                        ) : (
                                            <User className="w-5 h-5 text-white" />
                                        )}
                                    </div>
                                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                        <div className={`px-4 py-3 rounded-2xl shadow-md backdrop-blur-md ${message.sender === 'bot'
                                            ? 'bg-white/10 text-white rounded-tl-none'
                                            : 'bg-white/30 text-white font-semibold rounded-tr-none'
                                            }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                        </div>
                                        <span className="text-[10px] text-white/40 px-2">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* AI Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <motion.div
                                        className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-none bg-white/10"
                                        animate={{ opacity: [0.6, 1, 0.6] }}
                                        transition={{ repeat: Infinity, duration: 1.2 }}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '200ms' }}></span>
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '400ms' }}></span>
                                    </motion.div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-3 border-t border-white/10 relative z-20 bg-black/40 backdrop-blur-sm">
                                <p className="text-xs text-white/60 mb-2 font-medium">Quick actions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.map((reply) => (
                                        <button
                                            key={reply.value}
                                            onClick={() => handleQuickReply(reply.value)}
                                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium text-white transition-colors"
                                        >
                                            {reply.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="flex items-center gap-2 p-2 border-t border-white/10 relative z-20 bg-black/40 backdrop-blur-sm">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 bg-black/50 rounded-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim()}
                                className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
