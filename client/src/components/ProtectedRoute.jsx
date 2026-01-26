import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BouncingDots } from './BouncingDots'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const { user, dbUser, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <BouncingDots />
            </div>
        )
    }

    // Not authenticated - redirect to login
    if (!user || !dbUser) {
        return <Navigate to="/auth?mode=login" replace />
    }

    // Check if user's role is allowed
    if (allowedRoles.length > 0 && !allowedRoles.includes(dbUser.role)) {
        // Redirect to dashboard with error indication
        return <Navigate to="/dashboard" replace />
    }

    return children
}
