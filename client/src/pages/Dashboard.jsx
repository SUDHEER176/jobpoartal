import { useAuth } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '../components/ui'
import SeekerDashboard from './SeekerDashboard'
import RecruiterDashboard from './RecruiterDashboard'
import { BouncingDots } from '../components/BouncingDots'

export default function Dashboard() {
    const { dbUser, loading } = useAuth()

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <BouncingDots />
        </div>
    )

    if (!dbUser) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-black transition-colors duration-300">
                <div className="max-w-md w-full bg-white dark:bg-zinc-900/50 backdrop-blur-2xl p-12 rounded-[3rem] border border-slate-200 dark:border-white/5 text-center shadow-2xl shadow-brand-500/5">
                    <div className="h-24 w-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-red-500/20 border border-red-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Access Denied</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-bold">Please sign in to access your personal dashboard and manage your career journey.</p>
                    <Link to="/auth?mode=login">
                        <Button className="w-full h-14 rounded-2xl font-black bg-brand-500 hover:bg-brand-600 text-white shadow-xl shadow-brand-500/20 text-lg">Sign In to Continue</Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Redirect seekers to onboarding if pending
    if (dbUser.role === 'seeker' && dbUser.onboardingStatus === 'pending') {
        return <Navigate to="/onboarding" replace />
    }

    // Role-based rendering
    if (dbUser.role === 'recruiter') {
        return <RecruiterDashboard dbUser={dbUser} />
    }

    // Default to Seeker or Admin (Admin could have its own page but we cater for 'seeker' mostly here)
    return <SeekerDashboard dbUser={dbUser} />
}
