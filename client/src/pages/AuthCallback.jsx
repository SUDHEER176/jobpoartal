import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { BouncingDots } from '../components/BouncingDots'

export default function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        // The Supabase client automatically handles the hash parsing and session restoration.
        // We just need to wait a brief moment or check for the session, then redirect.

        const handleCallback = async () => {
            const { error } = await supabase.auth.getSession()
            if (error) {
                console.error('Error during auth callback:', error)
                navigate('/auth?mode=login')
            } else {
                // Successful login, redirect to dashboard or home
                navigate('/dashboard')
            }
        }

        handleCallback()
    }, [navigate])

    // ... (inside AuthCallback)
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <BouncingDots />
        </div>
    )
}
