import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { Briefcase, User, Building } from 'lucide-react'

const SignUp = () => {
    const [searchParams] = useSearchParams()
    const urlRole = searchParams.get('role') // Get role from URL
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(urlRole === 'recruiter' ? 'recruiter' : 'seeker') // Pre-select from URL
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignUp = async () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { role }
                }
            })
            if (error) throw error

            if (data.user) {
                alert('Check your email for confirmation link!')
                // Optionally navigate to a "check email" page or stay here
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] relative overflow-hidden w-full px-4">
            {/* Centered glass card */}
            <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-r from-[#ffffff10] to-[#121212] backdrop-blur-sm shadow-2xl p-8 flex flex-col items-center border border-white/10">
                {/* Logo */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg text-white">
                    <Briefcase className="w-6 h-6" />
                </div>
                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                    Join JobPortal
                </h2>

                {/* Form */}
                <div className="flex flex-col w-full gap-4">
                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <button
                            onClick={() => setRole('seeker')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'seeker'
                                ? 'bg-white/20 border-white/30 text-white'
                                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <User className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">Job Seeker</span>
                        </button>
                        <button
                            onClick={() => setRole('recruiter')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${role === 'recruiter'
                                ? 'bg-white/20 border-white/30 text-white'
                                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <Building className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">Recruiter</span>
                        </button>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 border border-transparent focus:border-transparent transition-all"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 border border-transparent focus:border-transparent transition-all"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <div className="text-sm text-red-400 text-left px-1">{error}</div>
                        )}
                    </div>

                    <hr className="opacity-10 border-white" />

                    <div>
                        <button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full bg-white/10 text-white font-medium px-5 py-3 rounded-full shadow hover:bg-white/20 transition mb-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        {/* Google Sign In */}
                        <button
                            onClick={async () => {
                                try {
                                    const { error } = await supabase.auth.signInWithOAuth({
                                        provider: 'google',
                                        options: {
                                            redirectTo: `${import.meta.env.VITE_SITE_URL || window.location.origin}/auth/callback`,
                                            data: { role } // Pass selected role to metadata
                                        }
                                    })
                                    if (error) throw error
                                } catch (err) {
                                    setError(err.message)
                                }
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#232526] to-[#2d2e30] rounded-full px-5 py-3 font-medium text-white shadow hover:brightness-110 transition mb-2 text-sm border border-white/5"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>

                        <div className="w-full text-center mt-2">
                            <span className="text-xs text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/auth?mode=login"
                                    className="underline text-white/80 hover:text-white transition-colors"
                                >
                                    Sign in
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* User count and avatars */}
            <div className="relative z-10 mt-12 flex flex-col items-center text-center">
                <p className="text-gray-400 text-sm mb-2">
                    Join <span className="font-medium text-white">thousands</span> of
                    developers who are already using JobPortal.
                </p>
                <div className="flex -space-x-3">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="user"
                        className="w-9 h-9 rounded-full border-2 border-[#121212] object-cover"
                    />
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="user"
                        className="w-9 h-9 rounded-full border-2 border-[#121212] object-cover"
                    />
                    <img
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                        alt="user"
                        className="w-9 h-9 rounded-full border-2 border-[#121212] object-cover"
                    />
                    <img
                        src="https://randomuser.me/api/portraits/women/68.jpg"
                        alt="user"
                        className="w-9 h-9 rounded-full border-2 border-[#121212] object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
