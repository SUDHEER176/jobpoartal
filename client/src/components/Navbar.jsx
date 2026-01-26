import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui'
import { Briefcase, LogOut, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './Logo'

export default function Navbar() {
    const { user, dbUser, signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    const isHome = location.pathname === '/'

    // Transparent on Home, White/Glass on others
    const navClass = isHome
        ? 'fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 bg-black/20 backdrop-blur-sm'
        : 'sticky top-0 z-50 glass border-b border-slate-200/50'

    const textClass = isHome ? 'text-white hover:text-brand-300' : 'text-slate-600 hover:text-brand-600'
    const brandClass = isHome ? 'text-white group-hover:text-brand-300' : 'text-slate-900 group-hover:text-brand-600'

    return (
        <nav className={navClass}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-2 group p-2 rounded-xl transition-all">
                        <Logo />
                    </Link>


                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link to="/jobs" className={`px-4 py-2 rounded-lg font-medium transition-colors ${isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : isActive('/jobs')}`}>Find Jobs</Link>

                        {user ? (
                            <>
                                {dbUser?.role === 'recruiter' && (
                                    <Link to="/post-job" className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/post-job')}`}>Post Job</Link>
                                )}
                                <Link to="/dashboard" className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>

                                <div className="flex items-center gap-3 pl-4 ml-2 border-l border-slate-200">
                                    <div className="text-right hidden lg:block">
                                        <div className="font-semibold text-slate-900 text-sm leading-tight">{dbUser?.profile?.name || 'User'}</div>
                                        <div className="text-brand-600 text-xs font-bold uppercase tracking-wider">{dbUser?.role}</div>
                                    </div>
                                    <div className="h-10 w-10 bg-gradient-to-br from-brand-100 to-indigo-100 rounded-full flex items-center justify-center text-brand-700 font-bold border border-white shadow-sm ring-2 ring-transparent hover:ring-brand-200 transition-all">
                                        {dbUser?.profile?.name?.[0] || <User className="h-5 w-5" />}
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-400 hover:text-red-500">
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 ml-4">
                                <Link to="/auth?mode=login">
                                    <Button variant={isHome ? "ghost" : "ghost"} className={isHome ? "text-white hover:bg-white/10 hover:text-white" : ""}>Login</Button>
                                </Link>
                                <Link to="/auth?mode=signup">
                                    <Button className="shadow-lg shadow-brand-500/30">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-brand-600 p-2">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-2 animate-fade-in">
                    <Link to="/jobs" onClick={() => setIsOpen(false)} className="p-3 hover:bg-slate-50 rounded-lg font-medium text-slate-700">Find Jobs</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="p-3 hover:bg-slate-50 rounded-lg font-medium text-slate-700">Dashboard</Link>
                            {dbUser?.role === 'recruiter' && (
                                <Link to="/post-job" onClick={() => setIsOpen(false)} className="p-3 hover:bg-slate-50 rounded-lg font-medium text-slate-700">Post Job</Link>
                            )}
                            <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="p-3 text-left hover:bg-red-50 text-red-600 rounded-lg font-medium">Sign Out</button>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <Link to="/auth?mode=login" onClick={() => setIsOpen(false)}><Button variant="secondary" className="w-full">Login</Button></Link>
                            <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}><Button className="w-full">Sign Up</Button></Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
